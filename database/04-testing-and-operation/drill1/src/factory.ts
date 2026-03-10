export function userFactory() {
  const id = Math.floor(Math.random() * 10000);
  return {
    email: `user${id}@test.com`,
  };
}
