import express from "express";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const SECRET = "mysecret";

interface JwtPayload {
  id: number;
  role: string;
}

function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    (req as any).user = jwt.verify(token, SECRET) as JwtPayload;
    next();
  } catch (err: any) {
    return res.status(401).json({ error: err.message });
  }
}

app.get("/", (req, res) => {
  res.json({ message: "Public route, no auth required" });
});

app.get("/profile", auth, (req, res) => {
  res.json({
    message: "This is your profile",
    user: (req as any).user,
  });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
