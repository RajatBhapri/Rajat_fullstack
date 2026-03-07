import express from "express";

import { Worker } from "worker_threads";
import path from "path";

const app = express();
const PORT = 3000;

app.get("/fib-worker/:n", (req, res) => {
  const n = parseInt(req.params.n);

  const start = Date.now();

  const worker = new Worker(new URL("./fibWorker.js", import.meta.url), {
    workerData: n,
  });

  worker.on("message", (result) => {
    const duration = Date.now() - start;

    res.json({
      result,
      duration,
      pid: process.pid,
    });
  });

  worker.on("error", (err) => {
    res.status(500).json({ error: (err as any).message });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} PID: ${process.pid}`);
});
