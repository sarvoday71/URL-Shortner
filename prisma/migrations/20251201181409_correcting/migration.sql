/*
  Warnings:

  - You are about to drop the column `shroturl` on the `UrlDB` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shorturl]` on the table `UrlDB` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UrlDB_shroturl_key";

-- AlterTable
ALTER TABLE "UrlDB" DROP COLUMN "shroturl",
ADD COLUMN     "shorturl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UrlDB_shorturl_key" ON "UrlDB"("shorturl");
