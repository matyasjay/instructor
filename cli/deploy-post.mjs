import { readFileSync, writeFileSync } from "fs";

const filePath = "./.vercel/project.json";

const data = readFileSync(filePath, "utf8");
const json = JSON.parse(data);

json.projectId = "vercel-project";
json.orgId = "vercel-org";
json.settings.createdAt = "timestamp";

writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n");

console.log("Vercel config has been reset!");
