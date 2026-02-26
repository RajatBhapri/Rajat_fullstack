class Logger {
  info(message: string): void {
    console.log(`[INFO]: ${message}`);
  }

  warn(message: string): void {
    console.warn(`[WARN]: ${message}`);
  }

  error(message: string): void {
    console.error(`[ERROR]: ${message}`);
  }
}

class SimpleCache<K, V> {
  private store: Map<K, V>;
  private maxSize: number;

  constructor(maxSize: number) {
    this.store = new Map();
    this.maxSize = maxSize;
  }

  set(key: K, value: V): void {
    if (this.store.size >= this.maxSize) {
      const firstKey = this.store.keys().next().value;
      if (firstKey !== undefined) {
        this.store.delete(firstKey);
      }
    }

    this.store.set(key, value);
  }

  get(key: K): V | undefined {
    return this.store.get(key);
  }

  has(key: K): boolean {
    return this.store.has(key);
  }

  clear(): void {
    this.store.clear();
  }
}

class Timer {
  private startTime: number | null = null;
  private elapsed: number = 0;

  start(): void {
    if (this.startTime === null) {
      this.startTime = Date.now();
    }
  }

  stop(): void {
    if (this.startTime !== null) {
      this.elapsed += Date.now() - this.startTime;
      this.startTime = null;
    }
  }

  reset(): void {
    this.startTime = null;
    this.elapsed = 0;
  }

  getElapsedTime(): number {
    if (this.startTime !== null) {
      return this.elapsed + (Date.now() - this.startTime);
    }
    return this.elapsed;
  }
}

class ValidationResult {
  public isValid: boolean;
  public errors: string[];

  constructor() {
    this.isValid = true;
    this.errors = [];
  }

  addError(message: string): void {
    this.isValid = false;
    this.errors.push(message);
  }

  getErrors(): string[] {
    return this.errors;
  }
}
