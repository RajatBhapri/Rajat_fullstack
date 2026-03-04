import express from "express";
import type { Request, Response, NextFunction } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const PORT = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {

  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `duration: ${duration}ms`
    );
  });

  next();
});


app.use(express.static(path.join(__dirname, "../public")));

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
  });
});

app.get("/api/info", (_req: Request, res: Response) => {
  res.json({
    name: "noteserver",
    version: "1.0.0",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    node: process.version,
  });
});

app.post("/api/echo", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    received: req.body,
  });
});



app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    const isDev = process.env.NODE_ENV === "development";

    res.status(500).json({
      success: false,
      message: err.message,
      ...(isDev && { stack: err.stack }),
    });
  }
);


const server = app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  console.log(" SIGINT received. Shutting down gracefully...");

  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});