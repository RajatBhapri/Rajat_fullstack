import sqlite3 from "sqlite3";
import { createDb } from "../src/db";
import { runMigrations } from "../src/migrate";
import { createUser, getUsers } from "../src/userRepo";
import { userFactory } from "../src/factory";

describe("User Repository", () => {
  let db: sqlite3.Database;

  beforeEach(() => {
    db = createDb(true);
    runMigrations(db);
  });

  afterEach(() => {
    db.close();
  });

  test("should create user", async () => {
    const user = userFactory();

    await createUser(db, user.email);

    const users: any = await getUsers(db);

    expect(users.length).toBe(1);
    expect(users[0].email).toBe(user.email);
  });
});
