import { execSync } from "child_process";

const file = process.argv[2];

execSync(`psql $DATABASE_URL < ${file}`, { stdio: "inherit" });

console.log("Restore complete");
