import { readFileSync, writeFileSync } from "fs";

const filePath = "./.vercel/project.json";

const newProjectId = process.env.VERCEL_PROJECT;
const newOrgId = process.env.VERCEL_TEAM;

const data = readFileSync(filePath, "utf8");
const json = JSON.parse(data);

json.projectId = newProjectId;
json.orgId = newOrgId;
json.settings.createdAt = new Date();

writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n");

console.log("Vercel config has been updated!");
