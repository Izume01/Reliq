"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
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
      toast.error("SIGN IN TO CREATE A SECRET");
      return;
    }

    if (!notes.trim()) {
      toast.error("ENTER SECRET CONTENT");
      return;
    }

    if (timetolive === 0) {
      toast.error("CHOOSE A TTL OPTION");
      return;
    }

    if (!isSupportedTTL(timetolive)) {
      toast.error("UNSUPPORTED TTL OPTION");
      return;
    }

    if (!isSupportedMaxFailedAttempts(maxFailedAttempts)) {
      toast.error("UNSUPPORTED SECURITY OPTION");
      return;
    }

    if (!isSupportedMaxViews(maxViews)) {
      toast.error("UNSUPPORTED MAX VIEWS OPTION");
      return;
    }

    if (password && password.length < PASSWORD_MIN_LENGTH) {
      toast.error(`PASSWORD MUST BE AT LEAST ${PASSWORD_MIN_LENGTH} CHARACTERS`);
      return;
    }

    if (!aesKey) {
      toast.error("MISSING ENCRYPTION KEY");
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
        toast.error(errorPayload.error || "FAILED TO CREATE SECRET");
        return;
      }

      const payload = (await response.json()) as CreateSecretResponse;
      setData(payload);
      setModel(true);
      setIsSuccess(true);
      setPassword("");
      toast.success("PAYLOAD SECURED");

      setTimeout(() => {
        setIsSuccess(false);
      }, 1800);
    } catch {
      toast.error("FAILED TO ENCRYPT AND SUBMIT");
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
      className={`group flex w-full items-center justify-between border p-5 font-sans text-sm font-black uppercase tracking-widest transition-all ${
        isSuccess
          ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
          : "border-[var(--color-accent)] bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-strong)]"
      } ${disabled && !isSuccess ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <span className="flex items-center gap-3">
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            ENCRYPTING PAYLOAD...
          </>
        ) : sessionPending ? (
          "CHECKING SESSION..."
        ) : !isAuthenticated ? (
          "SIGN IN REQUIRED"
        ) : isSuccess ? (
          <>
            <CheckCircle2 className="h-4 w-4" />
            SECURE LINK READY
          </>
        ) : (
          "GENERATE SECURE LINK"
        )}
      </span>
      {!(isLoading || isSuccess || sessionPending || !isAuthenticated) && (
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      )}
    </button>
  );
};

export default SecretButton;
