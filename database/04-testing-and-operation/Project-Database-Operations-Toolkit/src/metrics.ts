let count = 0;
let total = 0;

export function recordQuery(time: number) {
  count++;
  total += time;
}

export function getMetrics() {
  return {
    queries: count,
    avgQueryTime: count ? total / count : 0,
  };
}
