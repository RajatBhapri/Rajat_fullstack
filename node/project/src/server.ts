import express from "express";
import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import cors from "cors";
import { taskRouter } from "./routes/tasks.js";
import { authRouter } from "./routes/auth.js";
import { authMiddleware } from "./middleware/auth.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./logger.js";
import type { AppConfig } from "./config.js";

export class TaskServer {
  private app: Express;
  private server?: Server;

  constructor(private config: AppConfig) {
    this.app = express();
    this.setupApp();
  }

  private setupApp(): void {
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: "*",
      }),
    );

    // this.app.options("/{*splat}", cors());

    this.app.use(express.json());
    this.app.use((req, _res, next) => {
      console.log("SERVER HIT:", req.method, req.url);
      next();
    });
    this.app.use((req: Request, _res: Response, next: NextFunction) => {
      logger.info(`${req.method} ${req.url}`);
      next();
    });

    this.app.get("/health", (_req, res) => {
      res.json({
        status: "ok",
        environment: this.config.env,
      });
    });

    this.app.use("/api/auth", authRouter);

    // Protect task routes
    // this.app.use("/api/tasks", authMiddleware, taskRouter);
    this.app.use("/api/tasks", taskRouter);

    this.app.use((req: Request, res: Response) => {
      res.status(404).json({
        error: "Route not found",
        path: req.originalUrl,
      });
    });

    this.app.use(errorHandler);
  }

  async start(): Promise<void> {
    this.server = createServer(this.app);

    await new Promise<void>((resolve) => {
      this.server!.listen(this.config.port, () => {
        logger.info(`Server started on port ${this.config.port}`);
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    if (!this.server) return;

    await new Promise<void>((resolve, reject) => {
      this.server!.close((err) => {
        if (err) return reject(err);
        logger.info("Server stopped");
        resolve();
      });
    });
  }
}
