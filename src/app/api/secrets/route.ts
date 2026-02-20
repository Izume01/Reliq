import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/primsa";
import redis from "@/lib/db/redis";
import { auth } from "@/lib/auth/auth";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const slugs = await prisma.slug.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      slug: true,
      createdAt: true,
      passwordRequired: true,
      maxFailedAttempts: true,
      failedAttempts: true,
      maxViews: true,
      viewCount: true,
      lastViewedAt: true,
    },
  });

  const withTtl = await Promise.all(
    slugs.map(async (item) => {
      const ttl = await redis.ttl(`secret:${item.slug}`);
      return {
        ...item,
        ttlSeconds: ttl > 0 ? ttl : 0,
        expired: ttl <= 0,
      };
    })
  );

  return NextResponse.json({ secrets: withTtl }, { status: 200 });
}
