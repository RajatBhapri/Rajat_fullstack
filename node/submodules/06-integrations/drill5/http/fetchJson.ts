export async function fetchJson(url: string) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    const res = await fetch(url, { signal: controller.signal });

    console.log("Request:", url, "Status:", res.status);

    if (!res.ok) {
      return { error: true, status: res.status, message: "Request failed" };
    }

    try {
      const data = await res.json();
      return data;
    } catch {
      return { error: true, message: "Invalid JSON response" };
    }
  } catch (err) {
    return { error: true, message: "Request timeout or network error" };
  } finally {
    clearTimeout(timeout);
  }
}
