const square = (x: number): number => {
  return x * x;
};

const number = [1, 2, 3, 4, 5, 5];

const squared = number.map((n) => {
  return n * n;
});
const filtered = number.filter((n) => n % 2 === 0);
const reduced = number.reduce((acc, cur) => acc + cur, 0);

console.log(number); // output :- [ 1, 2, 3, 4, 5, 5 ]
console.log(squared); // output :- [ 1, 4, 9, 16, 25, 25 ]
console.log(filtered); // output :- [ 2, 4 ]
console.log(reduced); // output :- 20
