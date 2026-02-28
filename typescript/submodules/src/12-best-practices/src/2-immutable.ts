type User = {
  readonly id: string;
  readonly name: string;
};

// mutating version
function addUserBad(users: User[], user: User) {
  users.push(user);
  return users;
}

// immutable version
function addUser(
  users: readonly User[],
  user: User
): readonly User[] {
  return [...users, user];
}

const list: readonly User[] = [
  { id: "1", name: "Alice" }
];

const updated = addUser(list, { id: "2", name: "Bob" });

console.log(list);
console.log(updated);

// list.push(...) // compile error