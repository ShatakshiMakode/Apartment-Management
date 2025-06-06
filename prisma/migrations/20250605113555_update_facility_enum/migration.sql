/*
  Warnings:

  - Changed the type of `name` on the `facilities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FacilityType" AS ENUM ('GYM', 'SWIMMING_POOL', 'CLUBHOUSE', 'BANQUET_HALL');

-- AlterTable
ALTER TABLE "facilities" DROP COLUMN "name",
ADD COLUMN     "name" "FacilityType" NOT NULL;
