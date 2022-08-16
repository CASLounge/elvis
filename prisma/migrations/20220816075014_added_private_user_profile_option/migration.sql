/*
  Warnings:

  - You are about to drop the column `private` on the `SocialCredentials` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SocialCredentials" DROP COLUMN "private";

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT false;
