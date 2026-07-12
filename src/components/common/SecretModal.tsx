"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, TerminalSquare, X } from "lucide-react";
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
    toast.success("LINK COPIED");
  };

  const formatExpiryTime = (seconds: number) => {
    if (seconds < 60) return `${seconds} SECONDS`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} MINUTES`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} HOURS`;
    return `${Math.floor(seconds / 86400)} DAYS`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
      <div
        ref={modalRef}
        className="w-full max-w-xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-2xl font-mono uppercase"
      >
        <div className="flex justify-between items-center bg-[var(--color-ink)] px-6 py-4">
          <div className="flex items-center gap-3 text-white">
            <TerminalSquare className="h-5 w-5" />
            <h3 className="font-sans text-sm font-black tracking-widest mt-[2px]">
              SECRET GENERATED
            </h3>
          </div>
          <button
            onClick={() => setModel(false)}
            className="text-[var(--color-muted)] transition-colors hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-8 space-y-4">
            <p className="text-[10px] tracking-[0.2em] text-[var(--color-accent)]">
              /// SECRET LINK ACTIVE. EXPIRATION: {formatExpiryTime(expiresIn)}
            </p>

            <div className="flex items-stretch border border-[var(--color-line)] bg-[var(--color-surface)]">
              <div className="flex-1 overflow-x-auto whitespace-nowrap p-4 text-xs font-mono text-[var(--color-ink)] scrollbar-hide">
                {fullLink}
              </div>
              <button
                onClick={copyToClipboard}
                className="group flex items-center justify-center border-l border-[var(--color-line)] bg-[var(--color-paper)] px-5 transition-colors hover:bg-[var(--color-ink)]"
                title="COPY SECURE LINK"
              >
                <Copy size={16} className="text-[var(--color-ink)] group-hover:text-white" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setModel(false)}
              className="w-full border border-[var(--color-line)] px-6 py-4 font-sans text-xs font-black uppercase tracking-widest text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] sm:w-auto"
            >
              DISMISS
            </button>
            <Link
              href="/dashboard"
              onClick={() => setModel(false)}
              className="group flex w-full items-center justify-center gap-2 border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 py-4 font-sans text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-[var(--color-accent-strong)] sm:w-auto flex-1"
            >
              TRACK IN DASHBOARD
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-8 border-t border-[var(--color-line)] pt-6 text-[10px] tracking-widest text-[var(--color-muted)]">
            <p>SHARE THE LINK ONCE. THE SECRET BURNS AFTER A SUCCESSFUL READ.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretModal;
