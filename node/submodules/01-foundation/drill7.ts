import http from "http";

const server = http.createServer((req, res) => {
  res.end("Server is running...");
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

process.on("SIGINT", () => {
  console.log("SIGINT");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  process.exit(0);
});

process.on("exit", () => {
  console.log("Goodbye");
});
