import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import request from "supertest";
import { http, HttpResponse, delay } from "msw";
import { app } from "./app";

import { setupServer } from "msw/node";

const server = setupServer();

const API_URL = "https://api.weather.com/data";

// start MSW
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("External API with MSW", () => {
  // Drill 1
  it("200 OK returns parsed weather", async () => {
    server.use(
      http.get(API_URL, () => {
        return HttpResponse.json({
          city: "Delhi",
          temp: 30,
        });
      }),
    );

    const res = await request(app).get("/weather");

    expect(res.status).toBe(200);
    expect(res.body.city).toBe("Delhi");
  });

  // Drill 2
  it("401 from upstream returns 502", async () => {
    server.use(
      http.get(API_URL, () => {
        return new HttpResponse(null, { status: 401 });
      }),
    );

    const res = await request(app).get("/weather");

    expect(res.status).toBe(502);
  });

  // Drill 3
  it("500 upstream triggers retry logic", async () => {
    let calls = 0;

    server.use(
      http.get(API_URL, () => {
        calls++;
        return new HttpResponse(null, { status: 500 });
      }),
    );

    const res = await request(app).get("/weather");

    expect(calls).toBeGreaterThan(0);
    expect(res.status).toBe(502);
  });

  // Drill 4
  it("delayed response triggers timeout", async () => {
    server.use(
      http.get(API_URL, async () => {
        await delay(5000);

        return HttpResponse.json({
          city: "Delhi",
          temp: 31,
        });
      }),
    );

    const res = await request(app).get("/weather");

    expect(res.status).toBe(502);
  });
});
