import { pool, getPoolStats } from "./db.js";
import { getMetrics } from "./metrics.js";

export async function healthCheck() {
  await pool.query("SELECT 1");

  const poolStats = getPoolStats();
  const metrics = getMetrics();

  return {
    status: "ok",
    pool: poolStats,
    metrics,
  };
}
