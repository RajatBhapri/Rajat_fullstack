import type { Request, Response, NextFunction } from "express";
import type { AuthService } from "./service.js";

export function authMiddleware(auth: AuthService) {
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ error: "Missing token" });
    }

    const token = header.split(" ")[1];

    try {
      const payload = auth.verifyToken(token);

      (req as any).user = payload;

      next();
    } catch {
      res.status(401).json({ error: "Invalid token" });
    }
  };
}
