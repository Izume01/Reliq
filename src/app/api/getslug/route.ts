import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt-ts";
import crypto from "crypto";
import prisma from "@/lib/db/primsa";
import redis from "@/lib/db/redis";

interface GetSlugPayload {
  slug: string;
  password?: string;
}

interface SlugReadMeta {
  viewCount: number;
  maxViews: number;
  viewsRemaining: number;
  exhausted: boolean;
}

const parsePayload = (value: unknown): GetSlugPayload | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const payload = value as Record<string, unknown>;
  if (typeof payload.slug !== "string") {
    return null;
  }

  return {
    slug: payload.slug,
    password: typeof payload.password === "string" ? payload.password : undefined,
  };
};

const deleteSecretArtifacts = async (slug: string) => {
  const redisKey = `secret:${slug}`;
  await redis.del(redisKey);
  await prisma.slug.delete({ where: { slug } }).catch(() => null);
};

export async function POST(request: NextRequest) {
  const payload = parsePayload(await request.json());

  if (!payload) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }

  const slug = payload.slug.trim();
  if (!slug) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const slugRecord = await prisma.slug.findUnique({
    where: { slug },
  });

  if (!slugRecord) {
    return NextResponse.json({ error: "Slug does not exist" }, { status: 404 });
  }

  if (slugRecord.viewCount >= slugRecord.maxViews) {
    await deleteSecretArtifacts(slug);
    return NextResponse.json(
      { error: "View limit reached. Secret has been destroyed." },
      { status: 410 }
    );
  }

  if (slugRecord.passwordHash) {
    if (!payload.password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    const isPasswordCorrect = await bcrypt.compare(
      payload.password,
      slugRecord.passwordHash
    );

    if (!isPasswordCorrect) {
      const attemptsRecord = await prisma.slug.update({
        where: { slug },
        data: {
          failedAttempts: {
            increment: 1,
          },
        },
        select: {
          failedAttempts: true,
          maxFailedAttempts: true,
        },
      });

      const attemptsLeft =
        attemptsRecord.maxFailedAttempts - attemptsRecord.failedAttempts;

      if (attemptsLeft <= 0) {
        await deleteSecretArtifacts(slug);
        return NextResponse.json(
          { error: "Too many failed attempts. Secret has been destroyed." },
          { status: 423 }
        );
      }

      return NextResponse.json(
        { error: `Invalid password. ${attemptsLeft} attempts remaining.` },
        { status: 401 }
      );
    }
  }

  const reserveView = await prisma.slug.updateMany({
    where: {
      slug,
      viewCount: {
        lt: slugRecord.maxViews,
      },
    },
    data: {
      viewCount: {
        increment: 1,
      },
      lastViewedAt: new Date(),
    },
  });

  if (reserveView.count === 0) {
    await deleteSecretArtifacts(slug);
    return NextResponse.json(
      { error: "View limit reached. Secret has been destroyed." },
      { status: 410 }
    );
  }

  const redisKey = `secret:${slug}`;
  const encryptedContent = (await redis.get(redisKey)) as string | null;

  if (!encryptedContent) {
    await prisma.slug.delete({ where: { slug } }).catch(() => null);
    return NextResponse.json({ error: "Slug has expired" }, { status: 410 });
  }

  const keyHex = process.env.NEXT_PUBLIC_AES_HEX;
  if (!keyHex || keyHex.length !== 64) {
    return NextResponse.json(
      { error: "Encryption key is not configured" },
      { status: 500 }
    );
  }

  try {
    const key = Buffer.from(keyHex, "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      key,
      Buffer.from(slugRecord.iv, "hex")
    );
    decipher.setAuthTag(Buffer.from(slugRecord.tag, "hex"));

    let decrypted = decipher.update(encryptedContent, "hex", "utf8");
    decrypted += decipher.final("utf8");

    const updated = await prisma.slug.findUnique({
      where: { slug },
      select: {
        viewCount: true,
        maxViews: true,
      },
    });

    if (!updated) {
      return NextResponse.json({ content: decrypted }, { status: 200 });
    }

    const exhausted = updated.viewCount >= updated.maxViews;
    const viewsRemaining = Math.max(updated.maxViews - updated.viewCount, 0);

    if (exhausted) {
      await deleteSecretArtifacts(slug);
    }

    const meta: SlugReadMeta = {
      viewCount: updated.viewCount,
      maxViews: updated.maxViews,
      viewsRemaining,
      exhausted,
    };

    return NextResponse.json({ content: decrypted, meta }, { status: 200 });
  } catch (error) {
    console.error("Decryption failed:", error);
    return NextResponse.json({ error: "Decryption failed" }, { status: 500 });
  }
}
