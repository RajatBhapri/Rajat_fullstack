import app from "./server.js";
import "./workers/reportWorker.js";

const server = app.listen(3000, () => {
  console.log("Server running on port 3000");
});

process.on("SIGTERM", async () => {
  console.log("Shutting down");
  server.close();
});
