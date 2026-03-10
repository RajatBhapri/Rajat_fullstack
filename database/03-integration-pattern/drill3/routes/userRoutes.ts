import { Router } from "express";
import { UserRepository } from "../repositories/UserRepository.js";

export function createUserRoutes(userRepo: UserRepository) {
  const router = Router();

  router.get("/:id", async (req, res) => {
    try {
      const user = await userRepo.findById(Number(req.params.id));
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });

  router.post("/", async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email)
      return res.status(400).json({ error: "name and email required" });

    try {
      const user = await userRepo.create(name, email);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });

  return router;
}
