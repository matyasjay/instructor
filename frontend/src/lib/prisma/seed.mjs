const { PrismaClient } = await import("./generated/prisma/client.js");

const LOGIN = {
  LAYOUT: {
    id: "layout-login",
    template: "<div>Login Layout</div>",
    description: "Layout - Login",
    name: "layout-login",
  },
  INPUT: {
    templateId: "layout-login",
    id: "input-login",
  },
  VARIABLES: {
    templateId: "layout-login",
    id: "variables-login",
  },
};

const prisma = new PrismaClient();

await prisma.promptTemplate
  .createMany({
    data: LOGIN.LAYOUT,
    skipDuplicates: true,
  })
  .catch(console.error);

await prisma.promptInput
  .createMany({
    data: LOGIN.INPUT,
    skipDuplicates: true,
  })
  .catch(console.error);

await prisma.promptVariable
  .createMany({
    data: LOGIN.VARIABLES,
    skipDuplicates: true,
  })
  .catch(console.error);

await prisma.$disconnect();
