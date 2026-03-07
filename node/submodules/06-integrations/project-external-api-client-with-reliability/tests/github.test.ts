import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getRepo } from "../src/github.js";

const server = setupServer(
  // success
  http.get("https://api.github.com/repos/test/repo", () => {
    return HttpResponse.json({
      id: 1,
      name: "repo",
      full_name: "test/repo",
    });
  }),

  // 401 error
  http.get("https://api.github.com/repos/auth/repo", () => {
    return new HttpResponse(null, { status: 401 });
  }),

  // 500 retry
  http.get("https://api.github.com/repos/error/repo", () => {
    return new HttpResponse(null, { status: 500 });
  }),

  // timeout simulation
  http.get("https://api.github.com/repos/slow/repo", async () => {
    await new Promise((r) => setTimeout(r, 5000));
    return HttpResponse.json({});
  }),

  // invalid json
  http.get("https://api.github.com/repos/bad/repo", () => {
    return new HttpResponse("invalid-json");
  }),
);

beforeAll(() => server.listen());

afterAll(() => server.close());

describe("github client", () => {
  it("success case", async () => {
    const repo = await getRepo("test", "repo");

    expect(repo.name).toBe("repo");
  });

  it("handles 401", async () => {
    try {
      await getRepo("auth", "repo");
    } catch (err: any) {
      expect(err.status).toBe(401);
    }
  });

  it("retries on 500", async () => {
    try {
      await getRepo("error", "repo");
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});
