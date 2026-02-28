import fs from "fs/promises";
import YAML from "yaml";

export async function roundTripYaml(path: string) {
  const originalYaml = await fs.readFile(path, "utf-8");

  const parsed = YAML.parse(originalYaml);
  const json = JSON.stringify(parsed, null, 2);

  const backToYaml = YAML.stringify(JSON.parse(json));

  return {
    json,
    backToYaml,
    equal:
      JSON.stringify(YAML.parse(originalYaml)) ===
      JSON.stringify(YAML.parse(backToYaml)),
  };
}