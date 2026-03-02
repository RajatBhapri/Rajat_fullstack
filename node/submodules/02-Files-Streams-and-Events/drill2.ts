import { writeFile,readFile } from "fs/promises";

async function writeJSON() {
  const user = {
    id: 1,
    name: "Rajat",
    role: "Developer"
  };

  const jsonString = JSON.stringify(user);

  await writeFile("data.json", jsonString);
}

writeJSON();

async function readJSON() {
  try{
  const data = await readFile("data.json", "utf-8");
  const parsed = JSON.parse(data);

  console.log(parsed);
  }catch (error) {
    console.error("Invalid JSON or file error:", (error as Error).message);
  }
}

readJSON();

async function loadJSON<T>(file: string, defaultValue: T): Promise<T> {
  try {
    const data = await readFile(file, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.warn("Using default value due to error.");
    return defaultValue;
  }
}

console.log(loadJSON("data.json",{id: 2,
    name: "Raj",
    role: "Developer"}));


async function prettyWrite() {
  const settings = {
    theme: "dark",
    version: "1.0.0",
    features: ["login", "dashboard", "reports"]
  };

  const formatted = JSON.stringify(settings, null, 2);

  await writeFile("pretty.json", formatted);
 

}

prettyWrite();

 console.log(await readFile("pretty.json", "utf-8"));