// src/routes/auth.ts
import { Router } from "express";
import { AuthService } from "../auth/service.js";

const service = new AuthService();
export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  await service.register(req.body.email, req.body.password);
  res.json({ message: "User created" });
});

authRouter.post("/login", async (req, res) => {
  const token = await service.login(req.body.email, req.body.password);
  res.json({ token });
});
