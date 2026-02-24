type calculator = (a: number, b: number) => number;
type validator = (input: string) => boolean;

const add: calculator = (a, b) => a + b;
const validity: validator = (input) => input.length < 5;

console.log(add(2, 4)); // 6
console.log(validity("rajat bhapri")); // false
console.log(validity("raj")); // true

const calculate = (a: number, b: number, addition: calculator) => {
  return addition(a, b);
};

console.log(calculate(4, 5, add));
