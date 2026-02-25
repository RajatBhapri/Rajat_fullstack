type Readonly<T> = { readonly [K in keyof T]: T[K] };

interface User {
  id: string;
  age: number;
}

type ReadonlyUser = Readonly<User>; // readonly id | readonly age in ReadonlyUser

const user: ReadonlyUser = {
  id: "abc123",
  age: 30,
};

user.id = "raj"; //cannot assign to id bcoz it is a readomlyproperty

type Partial<T> = {
  [K in keyof T]?: T[K];
};

type PartialUser = Partial<User>; // id?:string | age?:number

const user1: PartialUser = {};
const user2: PartialUser = { id: "abc123" };
const user3: PartialUser = { age: 25 };

console.log(user1);

console.log(user2);

console.log(user3);
