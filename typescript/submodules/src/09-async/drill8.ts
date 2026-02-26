type Result<T> ={ ok: true; value: T } | { ok: false; error: string };

async function safeAwait<T>(promise: Promise<T>): Promise<Result<T>> {
  try {
    const value = await promise;
    return { ok: true, value };
  } catch (err: any) {
    // Convert error to string safely
    const error = err instanceof Error ? err.message : String(err);
    return { ok: false, error };
  }
}

async function fetchUser(id: number): Promise<{ name: string }> {
  if (id === 0) throw new Error("User not found");
  return { name: "Alice" };
}

async function run() {
  const result = await safeAwait(fetchUser(0));

  if (result.ok) {
    console.log("User:", result.value);
  } else {
    console.error("Failed to fetch user:", result.error);
  }
}

run();