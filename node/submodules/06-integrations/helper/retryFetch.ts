// retryFetch.ts
import { fetchJson } from "./fetchJson";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function fetchWithRetry(url: string, maxRetries = 3) {
  let attempt = 0;

  while (attempt <= maxRetries) {
    const result: any = await fetchJson(url);

    if (!result.error) {
      return result;
    }

    const status = result.status;

    const retryable =
      status === 502 || status === 503 || status === 504 || status === 429;

    const clientError = status >= 400 && status < 500 && status !== 429;

    if (clientError) {
      return result;
    }

    if (!retryable || attempt === maxRetries) {
      return result;
    }

    let delay = Math.pow(2, attempt) * 500;
    const jitter = Math.random() * 200;
    delay += jitter;

    console.log(`Retry ${attempt + 1} after ${delay.toFixed(0)}ms`);

    await sleep(delay);

    attempt++;
  }
}
