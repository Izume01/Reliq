/*
  Warnings:

  - Added the required column `iv` to the `Slug` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `Slug` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Slug" ADD COLUMN     "iv" TEXT NOT NULL,
ADD COLUMN     "tag" TEXT NOT NULL;
