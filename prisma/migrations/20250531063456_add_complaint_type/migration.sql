-- CreateEnum
CREATE TYPE "ComplaintType" AS ENUM ('PLUMBING', 'ELECTRICAL', 'CLEANING', 'SECURITY', 'OTHER');

-- AlterTable
ALTER TABLE "complaints" ADD COLUMN     "type" "ComplaintType" NOT NULL DEFAULT 'OTHER';
