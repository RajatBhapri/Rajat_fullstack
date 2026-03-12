export class MetricsCollector {
  private requests = 0;

  recordRequest() {
    this.requests++;
  }

  getMetrics() {
    return {
      totalRequests: this.requests,
    };
  }
}
