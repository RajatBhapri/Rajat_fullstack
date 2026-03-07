import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../drill1";

describe("GET /ping", () => {
  it("should return ok true", async () => {
    const res = await request(app).get("/ping");

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      ok: true,
    });
  });
});
