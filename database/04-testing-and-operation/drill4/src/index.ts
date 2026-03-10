import { timedQuery, createUser, getUsers } from "./repo.js";

async function main() {
  await timedQuery(`
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      email TEXT
    )
  `);

  console.log("Inserting users...");

  for (let i = 0; i < 1000; i++) {
    await createUser(`user${i}@test.com`);
  }

  console.log("Reading users...");
  await getUsers();

  process.exit(0);
}

main();
