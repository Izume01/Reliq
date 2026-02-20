"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import useSecret from "@/lib/store/secret";
import { authClient } from "@/lib/auth/client";
import {
  PASSWORD_MIN_LENGTH,
  isSupportedMaxFailedAttempts,
  isSupportedMaxViews,
  isSupportedTTL,
} from "@/lib/security/options";
import {
  encryptPasswordForTransport,
  encryptTextPayload,
} from "@/lib/security/clientCrypto";

interface CreateSecretResponse {
  slug: string;
  expiresIn: number;
}

interface ErrorPayload {
  error?: string;
}

const SecretButton = () => {
  const {
    notes,
    timetolive,
    password,
    maxFailedAttempts,
    maxViews,
    setModel,
    setData,
    setPassword,
  } = useSecret();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { data: sessionData, isPending: sessionPending } = authClient.useSession();
  const isAuthenticated = Boolean(sessionData?.user);
  const aesKey = process.env.NEXT_PUBLIC_AES_HEX;

  const handleCreateSecret = async () => {
    if (!isAuthenticated) {
      toast.error("Sign in to create a secret");
      return;
    }

    if (!notes.trim()) {
      toast.error("Enter secret content");
      return;
    }

    if (timetolive === 0) {
      toast.error("Choose a TTL option");
      return;
    }

    if (!isSupportedTTL(timetolive)) {
      toast.error("Unsupported TTL option");
      return;
    }

    if (!isSupportedMaxFailedAttempts(maxFailedAttempts)) {
      toast.error("Unsupported security option");
      return;
    }

    if (!isSupportedMaxViews(maxViews)) {
      toast.error("Unsupported max views option");
      return;
    }

    if (password && password.length < PASSWORD_MIN_LENGTH) {
      toast.error(`Password must be at least ${PASSWORD_MIN_LENGTH} characters`);
      return;
    }

    if (!aesKey) {
      toast.error("Missing encryption key");
      return;
    }

    setIsLoading(true);
    try {
      const encrypted = await encryptTextPayload(notes, aesKey);
      const encryptedPassword =
        password.trim().length > 0
          ? await encryptPasswordForTransport(password, aesKey)
          : "";

      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: encrypted.content,
          iv: encrypted.iv,
          tag: encrypted.tag,
          timetolive,
          maxFailedAttempts,
          maxViews,
          password: encryptedPassword,
        }),
      });

      if (!response.ok) {
        const errorPayload = (await response
          .json()
          .catch(() => ({}))) as ErrorPayload;
        toast.error(errorPayload.error || "Failed to create secret");
        return;
      }

      const payload = (await response.json()) as CreateSecretResponse;
      setData(payload);
      setModel(true);
      setIsSuccess(true);
      setPassword("");
      toast.success("Secret created");

      setTimeout(() => {
        setIsSuccess(false);
      }, 1800);
    } catch {
      toast.error("Failed to encrypt and submit secret");
    } finally {
      setIsLoading(false);
    }
  };

  const disabled = isLoading || isSuccess || sessionPending || !isAuthenticated;

  return (
    <button
      type="button"
      onClick={handleCreateSecret}
      disabled={disabled}
      className={`mt-1 w-full rounded-xl px-5 py-3 text-sm font-semibold transition ${
        isSuccess
          ? "bg-emerald-600 text-white"
          : "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-strong)]"
      } ${disabled ? "cursor-not-allowed opacity-65" : ""}`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Creating secure link...
        </span>
      ) : sessionPending ? (
        "Checking session..."
      ) : !isAuthenticated ? (
        "Sign in to create secret"
      ) : isSuccess ? (
        <span className="flex items-center justify-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Link ready
        </span>
      ) : (
        "Generate secret link"
      )}
    </button>
  );
};

export default SecretButton;
