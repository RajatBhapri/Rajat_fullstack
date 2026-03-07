import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import type { Request, Response } from "express";
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { Pool } from "pg";

let container: any;
let pool: any;
let app: any;

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
      name TEXT,
      email TEXT UNIQUE
    )
  `);

  await pool.query(`
    INSERT INTO users(name,email)
    VALUES
    ('Alice','alice@test.com'),
    ('Bob','bob@test.com'),
    ('Charlie','charlie@test.com')
  `);

  app = express();
  app.use(express.json());

  app.post("/users", async (req: Request, res: Response) => {
    const { name, email } = req.body;

    const result = await pool.query(
      "INSERT INTO users(name,email) VALUES($1,$2) RETURNING *",
      [name, email],
    );

    res.status(201).json(result.rows[0]);
  });

  app.get("/users/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await pool.query("SELECT * FROM users WHERE id=$1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "not found" });
    }

    res.json(result.rows[0]);
  });

  app.get("/users", async (req: Request, res: Response) => {
    const limit = Number(req.query.limit || 2);
    const offset = Number(req.query.offset || 0);

    const result = await pool.query(
      "SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2",
      [limit, offset],
    );

    res.json(result.rows);
  });
}, 100000);

afterAll(async () => {
  await pool.end();
  await container.stop();
});

describe("Users API + DB integration", () => {
  //  1
  it("POST /users creates user", async () => {
    const res = await request(app).post("/users").send({
      name: "Rajat",
      email: "rajat@test.com",
    });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Rajat");
  });

  //  2
  it("GET /users/:id returns seeded user", async () => {
    const res = await request(app).get("/users/1");

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Alice");
  });

  //  3
  it("GET /users/:id returns 404 if missing", async () => {
    const res = await request(app).get("/users/999");

    expect(res.status).toBe(404);
  });

  //  4
  it("pagination works", async () => {
    const res = await request(app).get("/users?limit=2&offset=1");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);

    expect(res.body[0].name).toBe("Bob");
  });
});
