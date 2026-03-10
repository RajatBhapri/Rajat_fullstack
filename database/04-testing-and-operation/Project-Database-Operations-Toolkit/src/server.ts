import express from "express";
import { pool } from "./db.js";
import { getMetrics } from "./metrics.js";
import { poolStats } from "./db.js";

const app = express();

app.get("/health/db", async (req, res) => {
  await pool.query("SELECT 1");

  res.json({
    status: "ok",
    pool: poolStats(),
    metrics: getMetrics(),
  });
});

app.get("/admin/db-status", async (req, res) => {
  const size = await pool.query(
    "SELECT pg_database_size(current_database()) as size",
  );

  res.json({
    pool: poolStats(),
    metrics: getMetrics(),
    dbSize: size.rows[0],
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
