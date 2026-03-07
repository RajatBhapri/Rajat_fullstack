import express from "express";
import pino from "pino";
import pinoHttp from "pino-http";
import { randomUUID } from "crypto";

const app = express();
app.use(express.json());

const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
});

app.use(
  pinoHttp({
    logger,
    genReqId: () => randomUUID(),
  }),
);

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

const PORT = 3000;

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

function shutdown(signal: string) {
  logger.info(`Received ${signal}`);
  logger.info("Shutting down gracefully...");

  server.close(() => {
    logger.info("Closed all connections");
    process.exit(0);
  });

  setTimeout(() => {
    logger.error("Forcing shutdown");
    process.exit(1);
  }, 10000);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
