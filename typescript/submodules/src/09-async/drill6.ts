function sleep(ms: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function withTimeoutSignal(ms: number) {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, ms);

  return {
    signal: controller.signal,
    clear: () => clearTimeout(timer),
  };
}

function mockFetch(signal?: AbortSignal): Promise<string> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      resolve("Data loaded");
    }, 2000);

    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new Error("Aborted"));
      });
    }
  });
}

async function retry<T>(
  op: () => Promise<T>,
  attempts = 2,
  delay = 300,
): Promise<T> {
  for (let i = 0; i <= attempts; i++) {
    try {
      return await op();
    } catch (err: any) {
      if (err.message === "Aborted") {
        throw err;
      }

      if (!err.retryable || i === attempts) {
        throw err;
      }

      await sleep(delay);
      
    }
  }

  throw new Error("Unexpected error");
}

const { signal } = withTimeoutSignal(2500);

retry(() => mockFetch(signal), 2, 300)
  .then((data) => console.log("Success:", data))
  .catch((err) => console.log("Error:", err.message));
