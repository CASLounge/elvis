/*
  Warnings:

  - The `branch` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Branch" AS ENUM ('BAIS', 'SIATON', 'BAYAWAN', 'PAMPLONA', 'MC1', 'MC2');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "branch",
ADD COLUMN     "branch" "Branch";
