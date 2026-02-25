function lengthof<T extends { length: number }>(x: T): number {
  return x.length;
}

console.log(lengthof("rajat"));
console.log(lengthof(34)); // Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
console.log(lengthof([1, 2, 3, 4]));
console.log(lengthof({ length: 20 }));

interface hasid {
  id: number;
}

interface hasname {
  name: string;
}

function has<T extends hasid & hasname>(x: T): string {
  return `${x.name} and ${x.id}`;
}

console.log(has({ name: "rajat", id: 23 }));
