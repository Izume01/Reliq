-- Add configurable view limits and retrieval analytics for slugs
ALTER TABLE "Slug"
ADD COLUMN "maxViews" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN "viewCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "lastViewedAt" TIMESTAMP(3);
