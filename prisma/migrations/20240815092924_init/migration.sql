/*
  Warnings:

  - A unique constraint covering the columns `[jobApplicationId]` on the table `Interview` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `JobApplication` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Interview_jobApplicationId_key" ON "Interview"("jobApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "JobApplication_id_key" ON "JobApplication"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
