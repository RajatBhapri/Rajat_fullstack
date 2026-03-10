import { dbMonitor } from "./db";

let totalQueries = 0;
let slowQueries = 0;

dbMonitor.on("query", ({ sql, duration, useReplica }) => {
  totalQueries++;
  if (duration > 100) slowQueries++;
  console.log(
    `[DB MONITOR] ${useReplica ? "REPLICA" : "MAIN"} | ${duration}ms | SQL=${sql}`,
  );
});

export function getMetrics() {
  return {
    totalQueries,
    slowQueries,
  };
}
