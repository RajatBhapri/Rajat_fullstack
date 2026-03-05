import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();

app.use(helmet());

app.disable("x-powered-by");

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use(express.json({ limit: "1mb" }));

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: { error: "Too many login attempts, try again later" },
});

app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

app.post("/login", loginLimiter, (req, res) => {
  res.json({ message: "Login attempt (dummy response)" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
