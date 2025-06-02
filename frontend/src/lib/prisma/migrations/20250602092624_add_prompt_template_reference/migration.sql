/*
  Warnings:

  - You are about to drop the column `templateId` on the `PromptTemplate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PromptTemplate" DROP COLUMN "templateId";

-- AddForeignKey
ALTER TABLE "PromptInput" ADD CONSTRAINT "PromptInput_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "PromptTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
