import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { logger } from "./logger.js";
import { requestLogger } from "./requestLogger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFile = fs.createWriteStream(path.join(__dirname, "logs.json"), {
  flags: "a",
});

const app = express();

app.use(requestLogger);

app.get("/", (req, res) => {
  req.log.info("Home route accessed");
  res.send("Hello World!");
});

const PORT = 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
