import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = new Redis({
    url : process.env.UPSTASH_REDIS_REST_URL!,
    token : process.env.UPSTASH_REDIS_REST_TOKEN!
})


const ratelimit = new Ratelimit({
    redis : redis, 
    limiter: Ratelimit.slidingWindow(10, "60 s"), 
    analytics: true,
})

export default async function middleware(req: NextRequest) {
    const ip = req.headers.get('x-forwarded-for') ?? "anonymous";
    console.log(`Request from IP: ${ip}`);

    const result = await ratelimit.limit(ip);

    if(!result.success) {
        return new NextResponse(JSON.stringify({
            error: "Rate limit exceeded. Please try again later."
        }), {
            status: 429,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store"
            }
        });
    }

    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", result.limit.toString());
    response.headers.set("X-RateLimit-Remaining", result.limit.toString());

    return response;
}

export const config  = {
    matcher : '/api/:path*',
}