/*
  Warnings:

  - A unique constraint covering the columns `[templateId]` on the table `PromptInput` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PromptInput" ALTER COLUMN "templateId" SET DEFAULT '';

-- CreateTable
CREATE TABLE "TempaltesOnServices" (
    "templateId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "TempaltesOnServices_pkey" PRIMARY KEY ("templateId","serviceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "PromptInput_templateId_key" ON "PromptInput"("templateId");

-- AddForeignKey
ALTER TABLE "TempaltesOnServices" ADD CONSTRAINT "TempaltesOnServices_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "PromptTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TempaltesOnServices" ADD CONSTRAINT "TempaltesOnServices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
