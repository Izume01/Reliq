import { NextRequest } from "next/server"

export async function GET(request : NextRequest) {
    return new Response("Hello from the test route!", {
        status: 200,
        headers: {
            "Content-Type": "text/plain",
        },
    });
}