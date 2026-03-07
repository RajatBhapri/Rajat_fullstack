import { fetchExternal } from "../src/api";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

const server = setupServer(
  http.get("https://api.example.com/data", () => {
    return HttpResponse.json({ ok: true });
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("external api", () => {
  it("returns mocked data", async () => {
    const data = await fetchExternal();
    expect(data.ok).toBe(true);
  });
});
