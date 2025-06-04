/*
  Warnings:

  - A unique constraint covering the columns `[qrCodeToken]` on the table `visitors` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "visitors" ADD COLUMN     "qrCodeToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "visitors_qrCodeToken_key" ON "visitors"("qrCodeToken");
