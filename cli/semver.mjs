import { readFileSync, writeFileSync } from "fs";
import { inc } from "semver";

// Load and parse package.json
const packageJsonPath = "./package.json";
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

// Choose the type of version bump: 'patch', 'minor', 'major', etc.
const newVersion = inc(packageJson.version, "patch");

// Update and write back to package.json
packageJson.version = newVersion;
writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`Version bumped to ${newVersion}`);
