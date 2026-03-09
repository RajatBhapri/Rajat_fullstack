import { Router } from "express";
import { z } from "zod";
import type { AuthService } from "../auth/service.js";

export function createAuthRouter(auth: AuthService): Router {
  const router = Router();

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  router.post("/register", async (req, res) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json(result.error);
    }

    const user = await auth.register(result.data.email, result.data.password);

    res.json(user);
  });

  router.post("/login", async (req, res) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json(result.error);
    }

    try {
      const token = await auth.login(result.data.email, result.data.password);

      res.json({ token });
    } catch {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  return router;
}
