/*
  Warnings:

  - You are about to drop the `PromptVariable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PromptVariable" DROP CONSTRAINT "PromptVariable_templateId_fkey";

-- DropTable
DROP TABLE "PromptVariable";
