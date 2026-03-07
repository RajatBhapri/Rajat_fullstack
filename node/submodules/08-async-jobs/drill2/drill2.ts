import express from "express";
import { runWorker } from "./workerClient";

const app = express();

function fib(n: number): number {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

app.get("/fib-blocking/:n", (req, res) => {
  const n = Number(req.params.n);

  const start = Date.now();

  const result = fib(n);

  const latency = Date.now() - start;

  res.json({ result, latency });
});

app.get("/fib/:n", async (req, res) => {
  const n = Number(req.params.n);

  const start = Date.now();

  try {
    const result = await runWorker(n);

    const latency = Date.now() - start;

    res.json({
      result,
      latency,
    });
  } catch (err) {
    res.status(500).json({
      error: (err as Error).message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
