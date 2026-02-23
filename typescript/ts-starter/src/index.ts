// function greet(name: string) {
//  return `Hello, ${name}!`;
// }

// console.log(greet("TypeScript"));

// ---------------------------------------------------------------------------------------------------

// import type { User } from "./validate";

// const user: User = {
//   id: "1234567890",
//   email: "rajat@gmail.com",
// };

// function greetUser(user: User): string {
//  return `Hello, ${user.email}! id = ${user.id}`;
// }

// console.log(greetUser(user));

// ----------------------------------------------------------------------------------------------------

// console.log("Start");
// setTimeout(() => {
//   console.log("Inside timeout");
// }, 1000);

// -----------------------------------------------------------------------------------------------------

import "dotenv/config";

console.log(process.env.API_KEY); // output :- 123abc
