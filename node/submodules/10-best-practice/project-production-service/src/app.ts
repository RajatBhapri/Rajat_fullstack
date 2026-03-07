import express from "express";
import dotenv from "dotenv";
import pino from "pino";
import pinoHttp from "pino-http";
import {
  collectDefaultMetrics,
  register,
  Counter,
  Histogram,
} from "prom-client";
import usersRouter from "./routes/users.js";
import jobsRouter from "./routes/jobs.js";
import { httpLogger, assignRequestId } from "./middleware/requestLogger.js";

dotenv.config();
const REQUIRED_ENVS = ["DB_URL", "API_KEY"];
REQUIRED_ENVS.forEach((key) => {
  if (!process.env[key])
    throw new Error(` Required env var ${key} is missing!`);
});

const app = express();
const port = 3000;

const logger = pino({ level: "info" });
app.use(httpLogger);
app.use(assignRequestId);

collectDefaultMetrics();
const requestCounter = new Counter({
  name: "http_requests_total",
  help: "Total requests",
});
const requestLatency = new Histogram({
  name: "http_request_duration_seconds",
  help: "Request latency",
  buckets: [0.1, 0.5, 1, 2, 5],
});

app.use((req, res, next) => {
  const end = requestLatency.startTimer();
  res.on("finish", () => {
    requestCounter.inc();
    end();
  });
  next();
});

app.get("/healthz", (req, res) => res.send("OK"));
app.get("/readyz", async (req, res) => {
  const dbOk = true;
  if (dbOk) res.send("OK");
  else res.status(503).send("Service Unavailable");
});
app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.use("/users", usersRouter);
app.use("/jobs", jobsRouter);

const server = app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});

const shutdown = async () => {
  logger.info("Shutting down gracefully...");
  server.close(() => {
    logger.info("HTTP server closed");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
