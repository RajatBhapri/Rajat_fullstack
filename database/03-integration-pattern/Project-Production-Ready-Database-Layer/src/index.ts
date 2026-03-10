import { userRepository } from "./repositories/userRepository.js";
import { dbHealth } from "./health.js";

async function main() {
  console.log(await dbHealth());

  const user = await userRepository.create("hello@example.com");
  console.log(user);

  const users = await userRepository.findAll();
  console.log(users);
}

main();
