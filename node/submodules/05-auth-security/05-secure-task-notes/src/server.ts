import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { closeDb } from "./db";

dotenv.config();

const app = express();
console.log("Starting server...");

app.use(express.json()); // needed for request body

function sendError(res: any, status: number, message: string) {
  res.status(status).json({
    status,
    error: message,
    time: new Date().toISOString(),
  });
}

const SECRET = process.env.JWT_SECRET as string;

export function auth(req: any, res: any, next: any) {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) {
    return sendError(res, 401, "Missing token");
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    return sendError(res, 401, "Invalid token");
  }
}

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
});

app.use(limiter);

app.get("/", (req, res) => {
  console.log("Starting server...");
  res.json({ message: "Server running" });
});

const server = app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

process.on("SIGINT", () => {
  console.log("Shutting down...");
  closeDb();
  process.exit();
});
