import axios from "axios";

export async function fetchExternal() {
  try {
    const res = await axios.get("https://api.example.com/data");

    // invalid json
    if (typeof res.data !== "object") {
      throw new Error("Invalid JSON");
    }

    return res.data;
  } catch (err: any) {
    // DNS failure
    if (err.code === "ENOTFOUND") {
      throw new Error("DNS failure");
    }

    // rate limit retry
    if (err.response?.status === 429) {
      const retryAfter = err.response.headers["retry-after"] || 1;

      await new Promise((r) => setTimeout(r, retryAfter * 1000));

      return fetchExternal();
    }

    throw err;
  }
}
