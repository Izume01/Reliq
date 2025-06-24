-- CreateTable
CREATE TABLE "Slug" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "passwordHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "viewedAt" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Slug_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Slug_slug_key" ON "Slug"("slug");
