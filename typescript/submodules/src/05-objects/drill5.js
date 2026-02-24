var person1 = {
    name: "rajat"
};
var person2 = {
    name: "rajat", // name doesnot exist in type Pick<person, "age">
    age: 23
};
var person3 = {
    name: "rajat",
    weight: 34,
    age: 25 //age doesnot exist in type omit
};
console.log(person1);
console.log(person2);
console.log(person3);
