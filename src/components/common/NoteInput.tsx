"use client";
import React, { useCallback } from "react";
import useSecret from "@/lib/store/secret";

const NoteInput: React.FC = () => {
  const { notes, setNote } = useSecret();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNote(e.target.value);
    },
    [setNote]
  );

  return (
    <section className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm text-[var(--color-muted)]">
        <label htmlFor="note" className="font-medium text-[var(--color-ink)]">
          Secret content
        </label>
        <span>{notes.length} chars</span>
      </div>
      <textarea
        id="note"
        value={notes}
        onChange={handleChange}
        placeholder="Paste API keys, credentials, or any sensitive text."
        className="h-56 w-full resize-none rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 text-base leading-relaxed text-[var(--color-ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] placeholder:text-[var(--color-muted)]/75 focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20"
        rows={8}
        spellCheck={false}
        aria-label="Secret note input"
      />
      <p className="text-sm text-[var(--color-muted)]">
        The message is encrypted before it leaves your browser.
      </p>
    </section>
  );
};

export default React.memo(NoteInput);
