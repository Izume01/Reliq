import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import * as bcrypt from "bcrypt-ts";
import crypto from "crypto";
import prisma from "@/lib/db/primsa";
import redis from "@/lib/db/redis";
import { auth } from "@/lib/auth/auth";
import {
  DEFAULT_MAX_FAILED_ATTEMPTS,
  DEFAULT_TTL,
  DEFAULT_MAX_VIEWS,
  isSupportedMaxFailedAttempts,
  isSupportedMaxViews,
  isSupportedTTL,
} from "@/lib/security/options";

interface CreateSecretPayload {
  content: string;
  iv: string;
  tag: string;
  timetolive?: number;
  maxFailedAttempts?: number;
  maxViews?: number;
  password?: string;
}

const HEX_REGEX = /^[0-9a-f]+$/i;

const isHexString = (value: string, length?: number): boolean => {
  if (length !== undefined && value.length !== length) {
    return false;
  }
  return HEX_REGEX.test(value);
};

const parsePayload = (value: unknown): CreateSecretPayload | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const payload = value as Record<string, unknown>;
  if (
    typeof payload.content !== "string" ||
    typeof payload.iv !== "string" ||
    typeof payload.tag !== "string"
  ) {
    return null;
  }

  return {
    content: payload.content,
    iv: payload.iv,
    tag: payload.tag,
    timetolive:
      typeof payload.timetolive === "number" ? payload.timetolive : undefined,
    maxFailedAttempts:
      typeof payload.maxFailedAttempts === "number"
        ? payload.maxFailedAttempts
        : undefined,
    maxViews:
      typeof payload.maxViews === "number" ? payload.maxViews : undefined,
    password: typeof payload.password === "string" ? payload.password : undefined,
  };
};

const decryptPassword = async (encryptedPassword: string): Promise<string> => {
  const [passwordIv, cipherText, passwordTag] = encryptedPassword.split(":");
  if (!passwordIv || !cipherText || !passwordTag) {
    throw new Error("Invalid encrypted password format");
  }

  const keyHex = process.env.NEXT_PUBLIC_AES_HEX;
  if (!keyHex || keyHex.length !== 64 || !isHexString(keyHex)) {
    throw new Error("Encryption key is invalid");
  }

  if (
    !isHexString(passwordIv, 32) ||
    !isHexString(passwordTag, 32) ||
    !isHexString(cipherText)
  ) {
    throw new Error("Invalid encrypted password payload");
  }

  const key = Buffer.from(keyHex, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(passwordIv, "hex")
  );

  decipher.setAuthTag(Buffer.from(passwordTag, "hex"));
  let decryptedPassword = decipher.update(cipherText, "hex", "utf8");
  decryptedPassword += decipher.final("utf8");
  return decryptedPassword;
};

const generateUniqueSlug = async (): Promise<string> => {
  const maxAttempts = 10;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const slug = nanoid(8);
    attempts += 1;
    const existing = await prisma.slug.findUnique({ where: { slug } });
    if (!existing) {
      return slug;
    }
  }

  throw new Error("Unable to generate unique slug");
};

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const payload = parsePayload(await request.json());
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const content = payload.content.trim();
    if (!content || !isHexString(content)) {
      return NextResponse.json(
        { error: "Encrypted content is required" },
        { status: 400 }
      );
    }

    if (!isHexString(payload.iv, 32)) {
      return NextResponse.json({ error: "Invalid IV" }, { status: 400 });
    }

    if (!isHexString(payload.tag, 32)) {
      return NextResponse.json({ error: "Invalid tag" }, { status: 400 });
    }

    const ttl = Math.floor(payload.timetolive ?? DEFAULT_TTL);
    if (!isSupportedTTL(ttl)) {
      return NextResponse.json(
        { error: "Unsupported expiry option" },
        { status: 400 }
      );
    }

    const maxFailedAttempts = Math.floor(
      payload.maxFailedAttempts ?? DEFAULT_MAX_FAILED_ATTEMPTS
    );
    if (!isSupportedMaxFailedAttempts(maxFailedAttempts)) {
      return NextResponse.json(
        { error: "Unsupported security option" },
        { status: 400 }
      );
    }

    const maxViews = Math.floor(payload.maxViews ?? DEFAULT_MAX_VIEWS);
    if (!isSupportedMaxViews(maxViews)) {
      return NextResponse.json(
        { error: "Unsupported max views option" },
        { status: 400 }
      );
    }

    let passwordHash: string | null = null;
    if (payload.password && payload.password.trim()) {
      try {
        const decryptedPassword = await decryptPassword(payload.password);
        passwordHash = await bcrypt.hash(decryptedPassword, 12);
      } catch (error) {
        console.error("Password decryption error:", error);
        return NextResponse.json(
          { error: "Invalid password encryption" },
          { status: 400 }
        );
      }
    }

    const slug = await generateUniqueSlug();

    await prisma.slug.create({
      data: {
        slug,
        passwordHash,
        iv: payload.iv,
        tag: payload.tag,
        passwordRequired: Boolean(passwordHash),
        maxFailedAttempts,
        maxViews,
        userId: session.user.id,
      },
    });

    const redisKey = `secret:${slug}`;
    await redis.set(redisKey, content, { ex: ttl });

    return NextResponse.json(
      {
        slug,
        expiresIn: ttl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating secret:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
