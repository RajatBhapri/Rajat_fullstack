import { db } from "./db";

export function getTasks(user: any) {
  if (user.role === "admin") {
    return db.prepare("SELECT * FROM tasks").all();
  }

  return db.prepare("SELECT * FROM tasks WHERE user_id=?").all(user.id);
}
