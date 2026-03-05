import express from "express";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const SECRET = process.env.JWT_SECRET || "defaultsecret";

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  handler: (req: Request, res: Response) => {
    console.log(`Rate limit exceeded from IP: ${req.ip}`);
    res.status(429).json({
      status: 429,
      error: "Too Many Requests",
      message: "Too many login attempts, try again later",
      timestamp: new Date().toISOString(),
    });
  },
});

function sendError(res: Response, status: number, message: string) {
  return res.status(status).json({
    status,
    error: status >= 500 ? "Server Error" : "Unauthorized",
    message,
    timestamp: new Date().toISOString(),
  });
}

type User = { id: number; email: string; password_hash: string; role: string };
const users: User[] = [
  { id: 1, email: "bob@example.com", password_hash: "hashed", role: "user" },
  { id: 2, email: "admin@example.com", password_hash: "hashed", role: "admin" },
];

function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return sendError(res, 401, "Token missing");

  try {
    (req as any).user = jwt.verify(token, SECRET) as {
      id: number;
      role: string;
    };
    next();
  } catch (err: any) {
    console.log(`Failed auth attempt from IP: ${req.ip}`);
    return sendError(res, 401, err.message);
  }
}

app.post("/login", loginLimiter, (req, res) => {
  const { email } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user) {
    console.log(`Failed login from IP: ${req.ip}`);
    return sendError(res, 401, "Invalid credentials");
  }

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, {
    expiresIn: "1h",
  });
  res.json({ message: "Login success", token });
});

app.get("/protected", auth, (req, res) => {
  res.json({ message: "Access granted", user: (req as any).user });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
