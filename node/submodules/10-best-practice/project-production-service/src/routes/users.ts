import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
});

router.get("/:id", (req, res) => {
  const userId = Number(req.params.id);
  res.json({ id: userId, name: `User ${userId}` });
});

export default router;
