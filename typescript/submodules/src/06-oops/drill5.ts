class Counter {
  #value: number;
  #step = 1;

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
}

// ---------------------------------------------------inheritance-------------------------------------------------
class BoundedCounter extends Counter {
  constructor(initial: number, private max: number) {
    super(initial);
  }

  override inc(): this {
    super.inc();
    if (this.value() > this.max) {
      // cannot directly access #value (it's private!)
      while (this.value() > this.max) {
        super.dec();
      }
    }
    return this;
  }

  override dec(): this {
    super.dec();
    if (this.value() < 0) {
      while (this.value() < 0) {
        super.inc();
      }
    }
    return this;
  }
}

// -------------------------------------------------------------composition---------------------------------------------------------------- 

// class BoundedCounter {
//   constructor(
//     private inner: Counter,
//     private max: number
//   ) {}

//   inc(): this {
//     this.inner.inc();
//     this.clamp();
//     return this;
//   }

//   dec(): this {
//     this.inner.dec();
//     this.clamp();
//     return this;
//   }

//   value(): number {
//     return this.inner.value();
//   }

//   private clamp() {
//     if (this.inner.value() > this.max) {
//       while (this.inner.value() > this.max) {
//         this.inner.dec();
//       }
//     }
//     if (this.inner.value() < 0) {
//       while (this.inner.value() < 0) {
//         this.inner.inc();
//       }
//     }
//   }
// }

