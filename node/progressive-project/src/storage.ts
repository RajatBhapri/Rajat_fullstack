import { promises as fs } from "fs";
import { watch } from "fs";

export class FileStorage {
  constructor(private dataPath: string) {}

  async saveNotes(notes: any[]): Promise<void> {
    await fs.writeFile(this.dataPath, JSON.stringify(notes, null, 2));
  }

  async loadNotes(): Promise<any[]> {
    try {
      const data = await fs.readFile(this.dataPath, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  watchChanges(callback: () => void): void {
    watch(this.dataPath, () => {
      callback();
    });
  }
}
