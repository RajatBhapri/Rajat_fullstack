import axios from "axios";
import { ApiError } from "./errors.js";

export async function request(url: string, options: any = {}) {
  const requestId = crypto.randomUUID();
  const start = Date.now();

  try {
    const res = await axios({
      url,
      timeout: 3000,
      method: options.method || "GET",
      data: options.data,
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN || ""}`,
        "X-Request-ID": requestId,
        ...options.headers,
      },
    });

    const latency = Date.now() - start;
    console.log("request", { url, requestId, latency });

    if (typeof res.data !== "object") {
      throw new Error("Invalid JSON");
    }

    return res.data;
  } catch (err: any) {
    if (err.code === "ECONNABORTED") {
      throw new ApiError("Request timeout", undefined, requestId);
    }

    if (err.response?.status >= 500 && !options.retry) {
      return request(url, { ...options, retry: true });
    }

    throw new ApiError(err.message, err.response?.status, requestId);
  }
}
