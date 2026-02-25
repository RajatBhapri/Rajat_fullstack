class Counter {
  #value: number;
  #step: number = 1;

  constructor(initial = 0) {
    this.#value = initial;
  }

  inc(): this {
    this.#value += this.#step;
    return this;
  }

  dec(): this {
    this.#value -= this.#step;
    return this;
  }

  value(): number {
    return this.#value;
  }

  get isZero(): boolean {
    return this.#value === 0;
  }

  set step(n: number) {
    if (n < 0) {
      throw new Error("Step cannot be negative");
    }
    this.#step = n;
  }
}

const demo = new Counter();

console.log(demo.isZero); //true if not given any value to Counter()
demo.step = 4;
demo.inc();
console.log(demo.value()); // 4
