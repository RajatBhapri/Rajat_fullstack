import request from "supertest";
import app from "../src/app.js";
import { disconnectDb, connectDb } from "../src/db.js";

describe("Health Check Endpoints", () => {
  it("GET /healthz should return 200", async () => {
    const res = await request(app).get("/healthz");
    expect(res.status).toBe(200);
  });

  it("GET /readyz should return 200 when DB is up", async () => {
    connectDb();
    const res = await request(app).get("/readyz");
    expect(res.status).toBe(200);
  });

  it("GET /readyz should return 503 when DB is down", async () => {
    disconnectDb();
    const res = await request(app).get("/readyz");
    expect(res.status).toBe(503);
  });
});
