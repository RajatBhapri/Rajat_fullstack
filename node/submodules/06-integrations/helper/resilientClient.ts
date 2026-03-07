import crypto from "crypto";

let failureCount = 0;
let circuitOpenUntil = 0;

const statusHistogram = {
  "2xx": 0,
  "4xx": 0,
  "5xx": 0,
};

export async function callApi(url: string) {
  const requestId = crypto.randomUUID();

  if (Date.now() < circuitOpenUntil) {
    throw new Error(`Circuit open. requestId=${requestId}`);
  }

  const start = Date.now();

  try {
    const res = await fetch(url, {
      headers: {
        "x-request-id": requestId,
      },
    });

    const latency = Date.now() - start;

    console.log(`[${requestId}] ${url} -> ${res.status} (${latency}ms)`);

    if (latency > 500) {
      console.warn(`[${requestId}] Slow request: ${latency}ms`);
    }

    if (res.status >= 200 && res.status < 300) statusHistogram["2xx"]++;
    else if (res.status >= 400 && res.status < 500) statusHistogram["4xx"]++;
    else if (res.status >= 500) statusHistogram["5xx"]++;

    if (!res.ok) {
      failureCount++;
      if (failureCount >= 3) {
        circuitOpenUntil = Date.now() + 10000;
        console.warn("Circuit opened for 10s");
      }

      throw new Error(
        `HTTP error ${res.status} requestId=${requestId} url=${url}`,
      );
    }

    failureCount = 0;

    return await res.json();
  } catch (err: any) {
    throw new Error(
      `Request failed url=${url} requestId=${requestId} message=${err.message}`,
    );
  }
}
