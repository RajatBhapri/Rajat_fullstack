type Person = {
  name: string;
  age: number;
  readonly id: string;
};

const person1: Person = {
  name: "rajat",
  age: 45,
  id: "gh23",
};

person1.age = 78;
person1.id = "kjggf"; // cannot assign to "id" because it is a readonly property

console.log(person1.name);
console.log(person1.age);
console.log(person1.id);
