class Counter {
  static created = 0;

  static fromjson(json: string): Counter {
    let x = JSON.parse(json);
    if (typeof x.value !== "string") {
      return new Counter(x.value);
    } else {
      throw new Error("need json in string");
    }
  }

  #value: number;
  #step: number = 1;

  constructor(initial = 0) {
    this.#value = initial;
    Counter.created++;
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
const b = new Counter(0);
const a = new Counter(5);
const z = Counter.fromjson('{"value":3}')

console.log(Counter.created);


function makeCounter(initial = 0) {
  let value = initial;
  let step = 1;

  return {
    inc() {
      value += step;
      return this;
    },
    dec() {
      value -= step;
      return this;
    },
    value() {
      return value;
    }
  };
}

const c = makeCounter(5);
c.inc().inc();
console.log(c.value());