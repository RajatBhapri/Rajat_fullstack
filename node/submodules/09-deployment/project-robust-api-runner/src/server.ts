import express from "express";
import pino from "pino";
import pinoHttp from "pino-http";
import { randomUUID } from "crypto";
import { pool, closeDb } from "./db.js";

const app = express();
app.use(express.json());

const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
});

app.use(
  pinoHttp.default({
    logger,
    genReqId: () => randomUUID(),
  }),
);

app.get("/", (req, res) => {
  req.log.info({ pid: process.pid }, "Handling request");
  res.json({ message: "Hello from Robust API Runner", pid: process.pid });
});

const server = app.listen(3000, () => {
  logger.info("Server running on port 3000");
});

const shutdown = async () => {
  logger.info("Shutting down gracefully...");
  server.close(async () => {
    await closeDb();
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// npm run build
// npm start

// npm run build
// pm2 start ecosystem.config.cjs
// pm2 logs

// docker build -t robust-api-runner .
// docker run -p 3000:3000 robust-api-runner
