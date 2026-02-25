interface User {
  id: string;
  age: number;
}

const usersById: Record<string, User> = {
  u1: { id: "u1", age: 25 },
  u2: { id: "u2", age: 30 },
};


type UserIdOnly = Pick<User, "id">;
const userId: UserIdOnly = { id: "abc123" };

type UserWithoutAge = Omit<User, "age">;

function pluck<T, K extends keyof T>(
  objs: T[],
  key: K
): T[K][] {
  return objs.map(obj => obj[key]);
}

const users: User[] = [
  { id: "a1", age: 20 },
  { id: "b2", age: 30 }
];

const ids = pluck(users, "id");   // type: string[]
const ages = pluck(users, "age");     // type: number[]

console.log(ids);
console.log(ages);