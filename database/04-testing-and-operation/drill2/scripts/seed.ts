import { createDb } from "../src/db";
import { minimalUsers } from "../seeds/minimal";
import { realisticUsers } from "../seeds/realistic";
import { performanceUsers } from "../seeds/performance";

const type = process.argv[2] || "minimal";

const seeds: any = {
  minimal: minimalUsers,
  realistic: realisticUsers,
  performance: performanceUsers,
};

async function seed() {
  const db: any = createDb();
  const users = seeds[type];

  for (const u of users) {
    if (process.env.DB_TYPE === "sqlite") {
      db.run("INSERT INTO users(email) VALUES(?)", [u.email]);
    } else {
      await db.query("INSERT INTO users(email) VALUES($1)", [u.email]);
    }
  }

  console.log(`Seeded ${users.length} users (${type})`);
}

seed();
