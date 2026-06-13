/*
  Warnings:

  - You are about to drop the column `accessToken` on the `EmailAccount` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `EmailAccount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmailAccount" DROP COLUMN "accessToken",
DROP COLUMN "refreshToken";
