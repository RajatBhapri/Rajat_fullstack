//const printnum = (num: string) => {
//console.log(num);
//};

//printnum("false");

//let s: string = "null";
//console.log(s);

// --------------------------------------------------------------------------------------------------------------------------

// let x = 42;
// x = "hello"
// console.log(x);

// let y;
// y = 43;
// y = "helly"
// console.log(y);

// let z: number = 42;
// z = "hellz"
// console.log(z);

// --------------------------------------------------------------------------------------------------------------------------

// let value: unknown = "hello";
// console.log((value as number).length);
// console.log((value as string).length);

// -------------------------------------------------------------------------------------------------------------------------

// const func = (something: string | number) => {
//   if (typeof something === "string") {
//     something as string;
//     console.log("string");
//   } else {
//     something as number;
//     console.log("number");
//   }
// };

// const func = (something: string | number | Date | number[]) => {
//   if (typeof something === "string") {
//     something as string;
//     console.log("string");
//   }else if(something instanceof Date){
//     console.log("Date");
//   } else if(something === null){
//     console.log("null");
//   }else if(Array.isArray(something)){
//     console.log("array");
//   }
//   else {
//     something as number;
//     console.log("number");
//   }
// };

// func([1,2,3])

//----------------------------------------------------------------------------------------------------------------------------

// let age: number;
// console.log(age);

//----------------------------------------------------------------------------------------------------------------------------

//const add = (a: number, b: number): string => {
// return a + b;
//};
//console.log(add(2, 3));

// ----------------------------------------------------------------------------------------------------------------------------

// function processId(id: string | number | boolean): string {
//   if (typeof id === "string") {
//     return "got string as " + id;
//   } else if (typeof id === "boolean") {
//     return "got boolean as " + id;
//   } else {
//     return "got number as " + id;
//   }
// }
// console.log(processId(true));

//----------------------------------------------------------------------------------------------------------------------------------

// let numbers: number[] = [1,2,3,5,4];
// let names: string[] = ["raj","art","yaart"];
// let mixed: (string | number)[] = [1,2,"raj",5,"taar"]
// console.log(mixed);

// const handleUndefined = (index: number, num: (string | number)[]) => {
//   if (index >= 0 && index < num.length) {
//     return num[index];
//  } else {
//     return undefined;
//   }
// };

// let mixed: (string | number)[] = [1, 2, "raj", 5, "taar"];

// console.log(handleUndefined(5, mixed));

//----------------------------------------------------------------------------------------------------------------------------------

// const user: { name: string; age: number; active: boolean } = {
//   name: 2,           //Error :-  type "number" is not assignable to type "string"
//   age: "r",          //Error :-  type "string" is not assignable to type number"
//   active: 1          //Error :-  type "number" is not assignable to type "boolean"
// };
// console.log(user);

const student: { name: string; roolnum?: number; attendence: boolean } = {
  name: "rjat",
  attendence: true,
};

console.log(student);

