import express from "express";
import pinoHttp from "pino-http";
import pino from "pino";
import { randomUUID } from "crypto";
const app = express();
app.use(express.json());
const logger = pino({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
});
app.use(pinoHttp.default({
    logger,
    genReqId: () => randomUUID(),
}));
const env = process.env.NODE_ENV || "development";
logger.info(`Running in ${env} mode`);
app.get("/", (req, res) => {
    res.json({ message: "Task Notes API running" });
});
app.listen(3000, () => {
    logger.info("Server running on port 3000");
});
//# sourceMappingURL=drill6.js.map