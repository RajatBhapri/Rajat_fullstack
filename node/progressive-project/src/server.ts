import express, { type Express } from "express";
import { Server } from "http";
import Database from "better-sqlite3";

import { log } from "./logger.js";
import type { AppConfig } from "./config.js";

import { taskRouter } from "./routes/tasks.js";

import { UserDatabase } from "./database.js";
import { AuthService } from "./auth/service.js";
import { createAuthRouter } from "./routes/auth.js";

export class TaskServer {

  private app: Express;
  private server?: Server;

  constructor(private config: AppConfig) {
    this.app = express();
    this.setupApp();
  }

  private setupApp(): void {

    this.app.use(express.json());

    this.app.use((req, res, next) => {
      log("info", `${req.method} ${req.url}`);
      next();
    });

    this.app.get("/health", (req, res) => {
      res.json({ status: "ok" });
    });

    this.app.use("/api/tasks", taskRouter);

    const db = new Database("app.db");

    const userDb = new UserDatabase(db);

    const authService = new AuthService(userDb);

    this.app.use("/api/auth", createAuthRouter(authService));
  }

  async start(): Promise<void> {
    this.server = this.app.listen(this.config.port);

    this.server.on("listening", () => {
      log("info", `HTTP server running on port ${this.config.port}`);
    });
  }

  async stop(): Promise<void> {

    if (!this.server) return;

    return new Promise((resolve, reject) => {

      this.server!.close((err) => {

        if (err) return reject(err);

        log("info", "HTTP server stopped");

        resolve();

      });

    });

  }

}