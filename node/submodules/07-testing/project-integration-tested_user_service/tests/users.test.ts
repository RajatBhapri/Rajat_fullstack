import request from "supertest";
import { app } from "../src/app";
import { describe, it, expect } from "vitest";
import { server } from "./msw";

server.listen();

describe("users api", () => {
  it("get users", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
  });

  it("create user", async () => {
    const res = await request(app).post("/users").send({ name: "rajat" });

    expect(res.status).toBe(201);
  });

  it("validation error", async () => {
    const res = await request(app).post("/users").send({});

    expect(res.status).toBe(400);
  });

  it("mock external api", async () => {
    const res = await request(app).get("/external");
    expect(res.body.ok).toBe(true);
  });
});
