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
    <section className="w-full flex flex-col h-full border border-[var(--color-line)] bg-[var(--color-paper)] p-[1px]">
      <div className="flex items-center justify-between bg-[var(--color-surface)] px-4 py-2 text-[10px] uppercase font-mono tracking-widest text-[var(--color-muted)] border-b border-[var(--color-line)]">
        <label htmlFor="note" className="text-[var(--color-ink)] font-bold">
          /// SECRET_CONTENT
        </label>
        <span>{notes.length} CHARS</span>
      </div>
      <textarea
        id="note"
        value={notes}
        onChange={handleChange}
        placeholder="PASTE API KEYS, CREDENTIALS, OR ANY SENSITIVE TEXT."
        className="h-64 w-full resize-none rounded-none bg-[var(--color-surface)] px-6 py-6 font-mono text-sm tracking-widest text-[var(--color-ink)] shadow-none placeholder:text-[var(--color-muted)]/50 focus:outline-none transition-colors"
        rows={10}
        spellCheck={false}
        aria-label="Secret note input"
      />
      <div className="bg-[var(--color-surface)] px-4 py-3 border-t border-[var(--color-line)]">
        <p className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-muted)]">
          &gt; SECRET IS ENCRYPTED BEFORE LEAVING THE BROWSER.
        </p>
      </div>
    </section>
  );
};

export default React.memo(NoteInput);
