/*
  Warnings:

  - You are about to drop the column `variables` on the `PromptTemplate` table. All the data in the column will be lost.
  - You are about to drop the `TempaltesOnServices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TempaltesOnServices" DROP CONSTRAINT "TempaltesOnServices_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "TempaltesOnServices" DROP CONSTRAINT "TempaltesOnServices_templateId_fkey";

-- AlterTable
ALTER TABLE "PromptInput" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "PromptTemplate" DROP COLUMN "variables",
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "TempaltesOnServices";

-- CreateTable
CREATE TABLE "PromptVariable" (
    "id" TEXT NOT NULL,
    "input" JSONB NOT NULL DEFAULT '{}',
    "templateId" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromptVariable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplatesOnServices" (
    "templateId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "TemplatesOnServices_pkey" PRIMARY KEY ("templateId","serviceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "PromptVariable_templateId_key" ON "PromptVariable"("templateId");

-- AddForeignKey
ALTER TABLE "PromptVariable" ADD CONSTRAINT "PromptVariable_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "PromptTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplatesOnServices" ADD CONSTRAINT "TemplatesOnServices_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "PromptTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplatesOnServices" ADD CONSTRAINT "TemplatesOnServices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
