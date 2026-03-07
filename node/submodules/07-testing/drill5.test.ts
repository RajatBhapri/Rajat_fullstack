import { describe, it, expect, beforeAll, afterAll } from "vitest";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { Pool } from "pg";
import request from "supertest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

let container: any;
let pool: Pool;
let app: any;
let logs: string[] = [];

const API_URL = "http://external.test/data";

const server = setupServer();

beforeAll(async () => {
  container = await new PostgreSqlContainer("postgres:16").start();

  pool = new Pool({
    host: container.getHost(),
    port: container.getPort(),
    user: container.getUsername(),
    password: container.getPassword(),
    database: container.getDatabase(),
  });

  await pool.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      email TEXT
    )
  `);

  app = express();

  app.use((req: Request, res: Response, next: NextFunction) => {
    const requestId = Math.random().toString(36).slice(2);
    (req as any).requestId = requestId;
    res.setHeader("X-Request-Id", requestId);
    next();
  });

  app.get("/db-check", async (req: Request, res: Response) => {
    try {
      await pool.query("SELECT 1");
      res.json({ ok: true });
    } catch {
      res.status(503).json({
        type: "about:blank",
        title: "Service Unavailable",
        status: 503,
        detail: "database unavailable",
      });
    }
  });

  app.get("/external", async (req: Request, res: Response) => {
    try {
      const r = await fetch(API_URL);
      const data = await r.json();
      res.json(data);
    } catch {
      res.status(500).json({
        type: "about:blank",
        title: "Bad Gateway",
        status: 500,
        detail: "invalid upstream response",
      });
    }
  });

  app.post("/tx", async (req: Request, res: Response) => {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      await client.query("INSERT INTO users(email) VALUES ('rollback@test')");
      throw new Error("force rollback");
    } catch {
      await client.query("ROLLBACK");
      res.status(500).json({ rolledBack: true });
    } finally {
      client.release();
    }
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    logs.push(`error requestId=${(req as any).requestId}`);

    res.status(500).json({
      type: "about:blank",
      title: "Internal Server Error",
      status: 500,
      detail: err.message,
    });
  });

  server.listen();
}, 60000);

afterAll(async () => {
  server.close();
  await pool.end();
  await container.stop();
});

describe("Drill 5 — Error & Edge Cases", () => {
  it("DB down returns 503", async () => {
    await container.stop();

    const res = await request(app).get("/db-check");

    expect(res.status).toBe(503);
  });

  it("invalid JSON from external service", async () => {
    server.use(
      http.get(API_URL, () => {
        return new HttpResponse("not-json", { status: 200 });
      }),
    );

    const res = await request(app).get("/external");

    expect(res.status).toBe(500);
  });

  it("transaction rollback prevents persistence", async () => {
    await request(app).post("/tx");

    const r = await pool.query(
      "SELECT * FROM users WHERE email='rollback@test'",
    );

    expect(r.rows.length).toBe(0);
  });

  it("error matches RFC 7807 format", async () => {
    const res = await request(app).get("/external");

    expect(res.body).toHaveProperty("type");
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("detail");
  });

  it("logs contain requestId", () => {
    const found = logs.some((l) => l.includes("requestId"));
    expect(found).toBe(true);
  });
});
