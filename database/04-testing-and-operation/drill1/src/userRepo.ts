import sqlite3 from "sqlite3";

export function createUser(db: sqlite3.Database, email: string) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users(email) VALUES(?)",
      [email],
      function (this: sqlite3.RunResult, err: Error | null) {
        if (err) reject(err);
        else resolve({ id: this.lastID, email });
      },
    );
  });
}

export function getUsers(db: sqlite3.Database) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users", (err: Error | null, rows: any[]) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}
