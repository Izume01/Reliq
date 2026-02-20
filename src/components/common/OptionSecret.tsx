"use client";
import React, { useCallback } from "react";
import useSecret from "@/lib/store/secret";
import { Input } from "@/components/base/Input";
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
    "w-full appearance-none rounded-xl border border-[var(--color-line)] bg-white px-3.5 py-2.5 text-sm text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20";

  return (
    <section className="w-full space-y-5">
      <p className="text-sm leading-relaxed text-[var(--color-muted)]">
        Define expiration and lockout behavior before creating the link.
      </p>

      <div className="grid gap-4">
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-semibold text-[var(--color-ink)]">
            Password (optional)
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Add extra protection"
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="ttl" className="text-sm font-semibold text-[var(--color-ink)]">
            Time to live
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

        <div className="space-y-2">
          <label
            htmlFor="max-failed-attempts"
            className="text-sm font-semibold text-[var(--color-ink)]"
          >
            Max failed password attempts
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
                {option} attempts
              </option>
            ))}
          </select>
          <p className="text-sm text-[var(--color-muted)]">
            Lockout applies only when a password is set.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="max-views" className="text-sm font-semibold text-[var(--color-ink)]">
            Delete after X successful views
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
                {option} {option === 1 ? "view" : "views"}
              </option>
            ))}
          </select>
          <p className="text-sm text-[var(--color-muted)]">
            Secret will be destroyed after this number of successful decryptions.
          </p>
        </div>
      </div>

      <SecretButton />
    </section>
  );
};

export default React.memo(OptionSecret);
