import express from "express";
import dotenv from "dotenv";
import { createPool, connectWithRetry, closePool } from "./db.js";
import { healthCheck } from "./health.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

createPool();

async function startServer() {
  try {
    await connectWithRetry();

    app.get("/health", healthCheck);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();

async function shutdown() {
  console.log("Shutting down server...");

  await closePool();

  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
