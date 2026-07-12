import React from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";

interface AuthAsideProps {
  title: string;
  subtitle: string;
}

export default function AuthAside({ title, subtitle }: AuthAsideProps) {
  return (
    <section className="relative flex flex-col h-full justify-between rounded-none">
      
      <div>
        <div className="flex justify-between items-center border-b border-[var(--color-line)] pb-4 mb-8">
          <span className="text-xs font-mono text-[var(--color-muted)] tracking-widest uppercase">[ AUTH_PROTOCOL ]</span>
        </div>
        <h1 className="font-sans font-black uppercase tracking-tighter text-4xl leading-[0.9] text-[var(--color-ink)] sm:text-6xl mb-6">
          {title}
        </h1>
        <p className="mt-4 max-w-md font-mono text-xs uppercase tracking-widest leading-relaxed text-[var(--color-muted)]">
          {subtitle}
        </p>
      </div>

      <div className="mt-16 flex flex-col gap-1 border-t border-l border-[var(--color-line)] bg-[var(--color-line)] p-[1px]">
        
        <div className="flex gap-4 items-start bg-[var(--color-surface)] p-6 group hover:bg-[var(--color-paper)] transition-colors">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center text-[var(--color-accent)]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="font-sans font-bold text-lg uppercase tracking-tight text-[var(--color-ink)]">ACCOUNT OWNERSHIP</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest leading-relaxed text-[var(--color-muted)]">SECRETS REMAIN TIED TO YOUR CREATOR IDENTITY. ZERO LEAKS.</p>
          </div>
        </div>
        
        <div className="flex gap-4 items-start bg-[var(--color-surface)] p-6 group hover:bg-[var(--color-paper)] transition-colors">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center text-[var(--color-accent)]">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <div>
            <p className="font-sans font-bold text-lg uppercase tracking-tight text-[var(--color-ink)]">STRONG PROTECTION</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest leading-relaxed text-[var(--color-muted)]">PASSWORD GATES AND STRICT ACCESS CONTROLS ENFORCED.</p>
          </div>
        </div>
        
      </div>
    </section>
  );
}
