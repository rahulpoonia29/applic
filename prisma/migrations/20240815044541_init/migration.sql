-- AlterEnum
ALTER TYPE "JobStatus" ADD VALUE 'selected';

-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "interviewDate" TIMESTAMP(3);
