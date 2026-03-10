let queryCount = 0;
let totalTime = 0;

export function recordQuery(duration: number) {
  queryCount++;
  totalTime += duration;
}

export function getMetrics() {
  return {
    queries: queryCount,
    avgQueryTime: queryCount ? totalTime / queryCount : 0,
  };
}
