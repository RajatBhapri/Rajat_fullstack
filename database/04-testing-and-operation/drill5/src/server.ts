import express from "express";
import { healthCheck } from "./health.js";
import { getDbSize } from "./repo.js";

const app = express();

app.get("/health/db", async (req, res) => {
  const health = await healthCheck();
  res.json(health);
});

app.get("/metrics/db", async (req, res) => {
  const size = await getDbSize();
  res.json(size);
});

app.listen(3000, () => {
  console.log("Monitoring server running on port 3000");
});
