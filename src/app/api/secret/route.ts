import prisma from "@/lib/db/primsa";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  const result = await prisma.slug.findUnique({
    where: { slug },
    select: { passwordRequired: true },
  });

  if (!result) {
    return NextResponse.json({ error: "Slug not found" }, { status: 404 });
  }

  return NextResponse.json({ passwordRequired: result.passwordRequired });
}
