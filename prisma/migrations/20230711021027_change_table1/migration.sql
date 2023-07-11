/*
  Warnings:

  - Added the required column `userID` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "userID" INTEGER NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
