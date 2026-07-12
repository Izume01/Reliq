"use client";
import React, { useCallback } from "react";
import useSecret from "@/lib/store/secret";
import SecretButton from "@/components/common/SecretButton";
import {
  MAX_FAILED_ATTEMPT_OPTIONS,
  MAX_VIEW_OPTIONS,
  TTL_OPTIONS,
} from "@/lib/security/options";

const OptionSecret = () => {
  const {
    timetolive,
    setTimetolive,
    password,
    setPassword,
    maxFailedAttempts,
    setMaxFailedAttempts,
    maxViews,
    setMaxViews,
  } = useSecret();

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  const handleTTLChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTimetolive(Number(e.target.value));
    },
    [setTimetolive]
  );

  const handleMaxFailedAttempts = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setMaxFailedAttempts(Number(e.target.value));
    },
    [setMaxFailedAttempts]
  );

  const handleMaxViews = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setMaxViews(Number(e.target.value));
    },
    [setMaxViews]
  );

  const selectClassName =
    "w-full appearance-none rounded-none border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none transition-colors";

  return (
    <section className="w-full space-y-8 flex flex-col h-full">
      <div className="grid gap-6">
        <div className="space-y-3">
          <label htmlFor="password" className="block text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-ink)]">
            /// PASSWORD (OPTIONAL)
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="ADD EXTRA ENCRYPTION LAYER"
            className="w-full rounded-none border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 font-mono text-xs tracking-widest text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/50 focus:border-[var(--color-accent)] focus:outline-none transition-colors"
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="ttl" className="block text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-ink)]">
            /// TIME TO LIVE (TTL)
          </label>
          <select
            id="ttl"
            value={timetolive}
            onChange={handleTTLChange}
            className={selectClassName}
            aria-label="Select expiration time"
          >
            {TTL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <label
            htmlFor="max-failed-attempts"
            className="block text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-ink)]"
          >
            /// MAX FAILED ATTEMPTS
          </label>
          <select
            id="max-failed-attempts"
            value={maxFailedAttempts}
            onChange={handleMaxFailedAttempts}
            className={selectClassName}
            aria-label="Select max failed password attempts"
          >
            {MAX_FAILED_ATTEMPT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option} ATTEMPTS
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <label htmlFor="max-views" className="block text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-ink)]">
            /// MAX VIEWS
          </label>
          <select
            id="max-views"
            value={maxViews}
            onChange={handleMaxViews}
            className={selectClassName}
            aria-label="Select max successful views"
          >
            {MAX_VIEW_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option} {option === 1 ? "VIEW" : "VIEWS"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-auto border-t border-[var(--color-line)] pt-8">
        <SecretButton />
      </div>
    </section>
  );
};

export default React.memo(OptionSecret);
