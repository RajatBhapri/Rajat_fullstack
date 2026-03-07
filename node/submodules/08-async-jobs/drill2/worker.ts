import { parentPort } from "worker_threads";

function fib(n: number): number {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

parentPort?.on("message", (n: number) => {
  try {
    const result = fib(n);

    parentPort?.postMessage({
      result,
    });
  } catch (err) {
    parentPort?.postMessage({
      error: (err as Error).message,
    });
  }
});
