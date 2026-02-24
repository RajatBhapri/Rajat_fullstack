

function applyTwice(fn: (x: number) => number, val: number){

}

function applyTwice2<T>(fn: (x: T) => T, val: T) {
  return fn(val);
}

console.log(applyTwice((n) => n + 2, 10));
console.log(applyTwice2((n) => n + 2, "raj"));
