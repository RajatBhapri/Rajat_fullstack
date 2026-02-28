import { sum, capitalize, now, createId } from "@shared/index.js";
import { add } from "./esm-example.js";

console.log("sum:", sum(2, 3));
console.log("add:", add(5, 5));
console.log("capitalize:", capitalize("hello"));
console.log("time:", now());
console.log("uuid:", createId());