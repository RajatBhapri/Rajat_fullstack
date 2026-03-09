import express from "express";
import { json } from "body-parser";
import { taskRouter } from "./routes/tasks";
import { loadConfig } from "./config";
import { logger } from "./logger";

const config = loadConfig();
export const app = express();
app.use(json());
app.use("/api/tasks", taskRouter);
app.get("/health", (req, res) => res.json({ status: "ok" }));

export async function startServer() {
  return app.listen(config.port, () =>
    logger.info(`Server running on port ${config.port}`),
  );
}
