import express from "express";
import { requestLogger } from "./requestLogger.js";
import { logger } from "./logger.js";
import { checkDbConnection } from "./db.js";

const app = express();

app.use(requestLogger);

app.get("/healthz", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: Date.now() });
});

app.get("/readyz", async (_req, res) => {
  try {
    await checkDbConnection();
    res.status(200).json({ status: "ready" });
  } catch (err: any) {
    logger.error("Readiness check failed: %s", err.message);
    res.status(503).json({ status: "not ready", error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  logger.info(`Health Check server running on port ${PORT}`),
);

export default app;
