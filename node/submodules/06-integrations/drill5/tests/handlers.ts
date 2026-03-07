import { http, HttpResponse, delay } from "msw";

export const handlers = [
  // happy path
  http.get("https://api.test.com/user", () => {
    return HttpResponse.json({ id: 1, name: "Rajat" });
  }),

  // unauthorized
  http.get("https://api.test.com/unauthorized", () => {
    return new HttpResponse(null, { status: 401 });
  }),

  // server error
  http.get("https://api.test.com/server-error", () => {
    return new HttpResponse(null, { status: 500 });
  }),

  // delayed response
  http.get("https://api.test.com/slow", async () => {
    await delay(6000);
    return HttpResponse.json({ ok: true });
  }),
];
