import fs from "fs/promises";

export interface Storage<T> {
  save(key: string, data: T): Promise<void>;
  load(key: string): Promise<T | null>;
  list(): Promise<string[]>;
}

export class FileStorage<T> implements Storage<T> {
  constructor(private basePath: string) {}

  async save(key: string, data: T) {
    await fs.writeFile(`${this.basePath}/${key}.json`, JSON.stringify(data));
  }

  async load(key: string): Promise<T | null> {
    try {
      const data = await fs.readFile(`${this.basePath}/${key}.json`, "utf8");
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  async list(): Promise<string[]> {
    return fs.readdir(this.basePath);
  }
}
