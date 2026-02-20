"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, ShieldCheck, X } from "lucide-react";
import toast from "react-hot-toast";
import useSecret from "@/lib/store/secret";

interface SecretModalProps {
  slug: string;
  expiresIn: number;
}

const SecretModal = ({ slug, expiresIn }: SecretModalProps) => {
  const { setModel } = useSecret();
  const modalRef = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState("");
  const fullLink = `${origin || ""}/s/${slug}`;

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setModel(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setModel]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullLink);
    toast.success("Secret link copied");
  };

  const formatExpiryTime = (seconds: number) => {
    if (seconds < 60) return `${seconds} seconds`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
    return `${Math.floor(seconds / 86400)} days`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="w-full max-w-lg rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-[var(--color-accent)]">
            <ShieldCheck className="h-4 w-4" />
            <h3 className="text-lg font-semibold text-[var(--color-ink)]">
              Secret link generated
            </h3>
          </div>
          <button
            onClick={() => setModel(false)}
            className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6 space-y-3">
          <p className="text-sm text-[var(--color-muted)]">
            Your secret will expire in {formatExpiryTime(expiresIn)}
          </p>

          <div className="flex items-center justify-between rounded-lg border border-[var(--color-line)] bg-white/80 p-3">
            <div className="truncate text-sm font-mono text-[var(--color-ink)]">
              {fullLink}
            </div>
            <button
              onClick={copyToClipboard}
              className="ml-2 rounded-md p-1.5 transition-colors hover:bg-[var(--color-paper)]"
            >
              <Copy size={16} className="text-[var(--color-muted)] hover:text-[var(--color-accent-strong)]" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setModel(false)}
            className="w-full rounded-lg border border-[var(--color-line)] px-4 py-2 text-sm text-[var(--color-ink)] hover:bg-[var(--color-paper)] sm:w-auto"
          >
            Create another
          </button>
          <Link
            href="/dashboard"
            onClick={() => setModel(false)}
            className="inline-flex w-full items-center justify-center gap-1 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-accent-strong)] sm:w-auto"
          >
            Manage in dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-4 text-xs text-[var(--color-muted)]">
          <p>Share the link once. The secret burns after a successful read.</p>
        </div>
      </div>
    </div>
  );
};

export default SecretModal;
