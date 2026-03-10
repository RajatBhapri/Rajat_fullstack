type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";

export class CircuitBreaker {
  private state: CircuitState = "CLOSED";
  private failureCount = 0;
  private readonly failureThreshold = 3;
  private readonly resetTimeout = 5000;

  async exec(fn: () => Promise<any>) {
    if (this.state === "OPEN") {
      throw new Error("Circuit is OPEN. Skipping DB call.");
    }

    try {
      const result = await fn();
      this.success();
      return result;
    } catch (err) {
      this.failure();
      throw err;
    }
  }

  private success() {
    this.failureCount = 0;
    if (this.state === "HALF_OPEN") this.state = "CLOSED";
  }

  private failure() {
    this.failureCount += 1;
    if (this.failureCount >= this.failureThreshold) {
      this.state = "OPEN";
      setTimeout(() => (this.state = "HALF_OPEN"), this.resetTimeout);
    }
  }
}
