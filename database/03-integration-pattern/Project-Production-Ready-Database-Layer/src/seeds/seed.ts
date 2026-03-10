import { userRepository } from "../repositories/userRepository.js";

async function seed() {
  await userRepository.create("rajat12@example.com");
  await userRepository.create("test@example.com");

  console.log("seed complete");
}

seed();
