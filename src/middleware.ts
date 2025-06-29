import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(10, "60 s"),
  analytics: false,
  prefix: "@upstash/ratelimit",
});

export default async function middleware(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "anonymous";

  const result = await ratelimit.limit(ip);

  const redisKey = `@upstash/ratelimit:${ip}`;
  await redis.expire(redisKey, 60);

  // Expire analytics key if TTL not already set
  const analyticsKey = `@upstash/ratelimit:events:${Math.floor(
    Date.now() / (24 * 60 * 60 * 1000)
  )}`;

  const ttl = await redis.ttl(analyticsKey);
  if (ttl === -1) {
    await redis.expire(analyticsKey, 24 * 60 * 60); // Expire in 24h
  }

  if (!result.success) {
    return new NextResponse(
      JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*",
          "Retry-After": "60",
        },
      }
    );
  }

  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Limit", result.limit.toString());
  response.headers.set("X-RateLimit-Remaining", result.remaining.toString());

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
