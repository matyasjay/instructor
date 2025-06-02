import { PrismaClient } from "./generated/prisma";

const singleton = () => new PrismaClient();

declare global {
  var prisma: undefined | ReturnType<typeof singleton>;
}

const prismaClient = globalThis.prisma ?? singleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismaClient;

export default prismaClient;
