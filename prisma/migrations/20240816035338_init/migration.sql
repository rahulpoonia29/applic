/*
  Warnings:

  - The `emailSentDate` column on the `JobApplication` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `interviewDate` column on the `JobApplication` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "emailSentDate",
ADD COLUMN     "emailSentDate" TIMESTAMP(3),
DROP COLUMN "interviewDate",
ADD COLUMN     "interviewDate" TIMESTAMP(3);
