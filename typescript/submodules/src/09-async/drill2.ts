type User = {
  id: number;
  name: string;
};

async function fetchUser(id: number): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id,
        name: "rajat",
      });
    }, 500);
  });
}

async function print() {
  const user = await fetchUser(123);
  console.log(user);
}

print();

// without await output :- Promise { <pending> }
