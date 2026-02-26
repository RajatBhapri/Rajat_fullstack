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

//slowest

async function print(id1: number, id2: number) {
  const x = await fetchUser(id1);
  const y = await fetchUser(id2);

  console.log(x, y);
}

print(67, 89);

//fastest

async function printboth(id1: number, id2: number) {
  const [a, b] = await Promise.all([fetchUser(id1), fetchUser(id2)]);
  console.log(a, b);
}

printboth(34, 56);

//medium speed

async function printsingle(id1: number, id2: number) {
  const x = await Promise.allSettled([fetchUser(id1), fetchUser(id2)]);
  console.log(x);
}

printsingle(1, 2);
