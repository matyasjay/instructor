/*
  Warnings:

  - You are about to drop the column `input` on the `PromptVariable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PromptVariable" DROP COLUMN "input",
ADD COLUMN     "variable" JSONB NOT NULL DEFAULT '{}',
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
