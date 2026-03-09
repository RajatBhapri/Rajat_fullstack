import fs from "fs/promises";
import path from "path";
import type { Task } from "./models/task";

export class FileStorage {
  constructor(private dataPath = path.join(__dirname, "../data/tasks.json")) {}

  async saveNotes(notes: Task[]) {
    await fs.mkdir(path.dirname(this.dataPath), { recursive: true });
    await fs.writeFile(this.dataPath, JSON.stringify(notes, null, 2), "utf-8");
  }

  async loadNotes(): Promise<Task[]> {
    try {
      const data = await fs.readFile(this.dataPath, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
}
