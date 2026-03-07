import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json([
    { id: 1, title: "Engineer" },
    { id: 2, title: "Designer" },
  ]);
});

router.get("/:id", (req, res) => {
  const jobId = Number(req.params.id);
  res.json({ id: jobId, title: `Job ${jobId}` });
});

export default router;
