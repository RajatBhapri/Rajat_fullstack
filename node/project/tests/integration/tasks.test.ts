import request from "supertest";
import { describe, it, expect } from "vitest";
import express from "express";
import { taskRouter } from "../../src/routes/tasks.js";

const app = express();
app.use(express.json());
app.use("/api/tasks", taskRouter);

describe("Tasks API", () => {
  it("creates task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Test task" });

    expect(res.status).toBe(201);
  });
});
