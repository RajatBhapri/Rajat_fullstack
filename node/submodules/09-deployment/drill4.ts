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
  const pid = process.pid;

  req.log.info(`Handled by worker PID: ${pid}`);

  res.json({
    message: "API running",
    worker: pid,
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} with PID ${process.pid}`);
});
