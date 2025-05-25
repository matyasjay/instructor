import { readFileSync, writeFileSync } from "fs";
import { inc } from "semver";

const packageJsonPath = "./package.json";
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
const newVersion = inc(packageJson.version, "patch");
packageJson.version = newVersion;
writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`Version bumped to ${newVersion}`);
