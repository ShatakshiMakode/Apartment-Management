/*
  Warnings:

  - The `status` column on the `visitors` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "VisitorStatus" AS ENUM ('PENDING', 'CHECKED_IN', 'CHECKED_OUT');

-- AlterTable
ALTER TABLE "visitors" DROP COLUMN "status",
ADD COLUMN     "status" "VisitorStatus" NOT NULL DEFAULT 'PENDING';
