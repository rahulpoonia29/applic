/*
  Warnings:

  - You are about to drop the `Interview` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Interview" DROP CONSTRAINT "Interview_jobApplicationId_fkey";

-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "emailSentDate" TIMESTAMP(3),
ADD COLUMN     "interview" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "interviewDate" TIMESTAMP(3),
ADD COLUMN     "interviewerEmail" TEXT,
ADD COLUMN     "notes" TEXT;

-- DropTable
DROP TABLE "Interview";
