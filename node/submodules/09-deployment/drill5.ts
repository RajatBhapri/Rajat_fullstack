import express from "express";

const app = express();
const PORT = 3000;

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

app.get("/", (req, res) => {
  res.json({ message: "API running", pid: process.pid });
});

app.get("/fib/:n", (req, res) => {
  const n = parseInt(req.params.n);

  const start = Date.now();
  const result = fibonacci(n);
  const duration = Date.now() - start;

  res.json({
    result,
    duration,
    pid: process.pid,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} PID: ${process.pid}`);
});
