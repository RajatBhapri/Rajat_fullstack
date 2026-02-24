function format(input: string | number | boolean) {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else if (typeof input === "boolean") {
    return input;
  } else {
    return input.toFixed(2);
  }
}

console.log(format("rajat")); // output :- RAJAT
console.log(format(34)); // output :- 34.00
console.log(format(true));
