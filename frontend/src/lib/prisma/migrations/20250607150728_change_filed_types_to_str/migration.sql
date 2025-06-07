-- AlterTable
ALTER TABLE "PromptInput" ALTER COLUMN "input" SET DEFAULT '',
ALTER COLUMN "input" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PromptVariable" ALTER COLUMN "variable" SET DEFAULT '',
ALTER COLUMN "variable" SET DATA TYPE TEXT;
