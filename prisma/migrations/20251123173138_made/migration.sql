/*
  Warnings:

  - Made the column `longurl` on table `UrlDB` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UrlDB" ALTER COLUMN "shroturl" DROP NOT NULL,
ALTER COLUMN "longurl" SET NOT NULL;
