import { readFileSync } from "node:fs";

export function readLocalFile(path: string) {
  return readFileSync(path, "utf-8");
}
