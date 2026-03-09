import request from "supertest";
import { app } from "../src/server";

describe("Tasks API", () => {
  let createdTaskId: string;

  it("GET /api/tasks - initially empty", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("POST /api/tasks - create a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Test Task", priority: "medium" });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test Task");
    createdTaskId = res.body.id;
  });

  it("GET /api/tasks - returns created task", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("PUT /api/tasks/:id - update task", async () => {
    const res = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .send({ completed: true });
    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it("DELETE /api/tasks/:id - delete task", async () => {
    const res = await request(app).delete(`/api/tasks/${createdTaskId}`);
    expect(res.status).toBe(204);
  });
});
