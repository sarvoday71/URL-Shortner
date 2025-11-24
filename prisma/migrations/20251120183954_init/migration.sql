-- CreateTable
CREATE TABLE "UrlDB" (
    "id" SERIAL NOT NULL,
    "shroturl" TEXT NOT NULL,
    "longurl" TEXT NOT NULL,

    CONSTRAINT "UrlDB_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UrlDB_shroturl_key" ON "UrlDB"("shroturl");

-- CreateIndex
CREATE UNIQUE INDEX "UrlDB_longurl_key" ON "UrlDB"("longurl");
