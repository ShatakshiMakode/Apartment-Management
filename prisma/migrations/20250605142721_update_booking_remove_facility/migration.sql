/*
  Warnings:

  - You are about to drop the `facilities` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `facility` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_facilityId_fkey";

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "facility" "FacilityType" NOT NULL;

-- DropTable
DROP TABLE "facilities";
