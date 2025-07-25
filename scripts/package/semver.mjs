import { readFileSync, writeFileSync } from "fs";
import { inc } from "semver";

let version = "";

const jsons = [
  "./package.json",
  "./database/package.json",
  "./docker/package.json",
  "./frontend/package.json",
  "./http/package.json",
  "./scripts/package.json",
];

const packages = jsons.map((json) => {
  const file = JSON.parse(readFileSync(json, "utf8"));
  version = inc(file.version, "patch");
  file.version = version;
  return file;
});

jsons.forEach((json, index) =>
  writeFileSync(json, JSON.stringify(packages[index], null, 2)),
);

console.log(`INFO\tVersion bumped to ${version}`);

process.exit(0);
