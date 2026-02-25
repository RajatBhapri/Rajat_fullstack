type Keys<T> = keyof T;

interface user {
  id: string;
  age: number;
}

type userKeys = Keys<user>;
// type userkey = keysof user

function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  // properties of key K inside T
  return obj[key];
}

const user1: user = {
  id: "abc123",
  age: 30,
};

const idValue = getProp(user1, "id");

const ageValue = getProp(user1, "age");

console.log(idValue);
console.log(ageValue);
console.log(getProp(user1,"missing"));        //argument of type "missing" is not assignable to parameter of type'keyof user'