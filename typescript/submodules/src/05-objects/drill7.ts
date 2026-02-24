type person = {
  name: string;
  age: number;
};

function accept(p: person) {
  console.log(p.name + " " + p.age);
}

const person1: person = {
  name: "raj",
  age: 23,
};

accept(person1);
accept({
  name: "raj",
  age: 23,
  weight: 34, // weigth doesnit exist in type person
});
