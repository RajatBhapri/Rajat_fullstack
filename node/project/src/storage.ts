import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import type { Task } from "./models/task.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class FileStorage {
  private file = path.join(__dirname, "../data/tasks.json");

  async loadNotes(): Promise<Task[]> {
    try {
      const data = await fs.readFile(this.file, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async saveNotes(tasks: Task[]) {
    await fs.mkdir(path.dirname(this.file), { recursive: true });
    await fs.writeFile(this.file, JSON.stringify(tasks, null, 2));
  }
}
