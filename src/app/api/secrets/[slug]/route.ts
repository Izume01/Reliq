import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/primsa";
import redis from "@/lib/db/redis";
import { auth } from "@/lib/auth/auth";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const { slug } = await context.params;

  const record = await prisma.slug.findUnique({
    where: { slug },
    select: {
      userId: true,
    },
  });

  if (!record) {
    return NextResponse.json({ error: "Secret not found" }, { status: 404 });
  }

  if (record.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await redis.del(`secret:${slug}`);
  await prisma.slug.delete({ where: { slug } });

  return NextResponse.json({ success: true }, { status: 200 });
}
