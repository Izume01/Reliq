"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Lock, Zap, Server, Shield, Database, ShieldAlert, KeyRound, Globe } from "lucide-react";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Scrubbing Text Reveal
      gsap.to(".reveal-text", {
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".reveal-section",
          start: "top 70%",
          end: "top 30%",
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-x-hidden font-mono uppercase w-full bg-[var(--color-surface)] text-[var(--color-ink)] selection:bg-[var(--color-accent)] selection:text-white">
      <main className="w-full max-w-full">
        {/* HERO: Cinematic Center / Industrial Blueprint */}
        <section className="relative px-6 pt-32 pb-12 md:pt-48 md:pb-24 border-b border-[var(--color-line)] min-h-[90vh] flex flex-col justify-center">
          <div className="mx-auto max-w-7xl w-full">
            {/* ASCII Framing */}
            <div className="flex justify-between items-center border-b border-[var(--color-line)] pb-4 mb-12">
              <span className="text-xs text-[var(--color-muted)] tracking-widest">[ SYS_INIT ]</span>
              <span className="text-xs text-[var(--color-accent)] tracking-widest">&gt;&gt; ENCRYPTION PROTOCOL ONLINE</span>
            </div>
            
            {/* Massive Typography - clamp(4rem, 10vw, 12rem) */}
            <h1 className="font-sans font-black tracking-[-0.05em] leading-[0.85] text-[clamp(3rem,8vw,9rem)] text-[var(--color-ink)] max-w-6xl uppercase">
              EPHEMERAL<br />
              <span className="text-[var(--color-muted)]">ENCRYPTION.</span>
            </h1>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
              <div className="text-sm text-[var(--color-muted)] max-w-md tracking-widest leading-relaxed border-l-2 border-[var(--color-accent)] pl-6">
                RELIQ ENCRYPTS PAYLOADS CLIENT-SIDE, ISSUES A SINGLE-USE ACCESS HASH, AND PERMANENTLY WIPES CIPHERTEXT UPON RETRIEVAL. ZERO-KNOWLEDGE PRESERVED.
              </div>
              <div className="flex justify-end gap-4">
                <Link
                  href="/create"
                  className="inline-flex items-center justify-center gap-2 rounded-none bg-[var(--color-accent)] px-8 py-5 text-sm font-bold text-white hover:bg-[var(--color-accent-strong)] hover:-translate-y-[1px] active:scale-[0.98] transition-all"
                >
                  [ INITIATE PAYLOAD ]
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* GSAP REVEAL SECTION */}
        <section className="reveal-section border-b border-[var(--color-line)] py-32 md:py-48 px-6 bg-[var(--color-surface)]">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-sans font-black text-3xl md:text-5xl lg:text-7xl leading-[0.9] tracking-tighter">
              {/* Scrubbing Text */}
              {["ZERO", "KNOWLEDGE.", "NO", "BACKDOORS.", "NO", "PLAINTEXT."].map((word, i) => (
                <span key={i} className="reveal-text opacity-10 inline-block mr-4 mb-2">{word}</span>
              ))}
            </h2>
          </div>
        </section>

        {/* BENTO GRID: Interest / High Density Data */}
        <section className="py-32 md:py-48 px-6 border-b border-[var(--color-line)]">
          <div className="mx-auto max-w-7xl">
            <div className="border-b border-[var(--color-line)] pb-4 mb-8 flex items-center justify-between">
              <span className="text-xs text-[var(--color-muted)] tracking-widest uppercase">/// TACTICAL TELEMETRY // SPECS</span>
              <span className="text-xs text-[var(--color-muted)] tracking-widest uppercase">REV 2.6</span>
            </div>
            
            {/* Gapless, mathematically strict 1px grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-dense gap-[1px] bg-[var(--color-line)] border border-[var(--color-line)] p-[1px]">
              {/* Box 1 */}
              <div className="bg-[var(--color-surface)] p-10 md:col-span-2 group hover:bg-[var(--color-paper)] transition-colors">
                <div className="flex justify-between items-start mb-12">
                  <ShieldAlert className="w-8 h-8 text-[var(--color-accent)]" />
                  <span className="text-[10px] tracking-[0.2em] text-[var(--color-muted)]">AES-256-GCM</span>
                </div>
                <h3 className="font-sans font-bold text-2xl md:text-4xl tracking-tighter mb-4 text-[var(--color-ink)]">CLIENT-SIDE ONLY</h3>
                <p className="text-xs text-[var(--color-muted)] tracking-widest leading-relaxed max-w-md">
                  ENCRYPTION PERFORMED IN-BROWSER. THE KEY RESIDES IN THE URL FRAGMENT AND NEVER TOUCHES OUR SERVERS.
                </p>
              </div>
              
              {/* Box 2 */}
              <div className="bg-[var(--color-surface)] p-10 group hover:bg-[var(--color-paper)] transition-colors">
                <div className="mb-12">
                  <Zap className="w-8 h-8 text-[var(--color-ink)]" />
                </div>
                <h3 className="font-sans font-bold text-xl tracking-tighter mb-4 text-[var(--color-ink)]">BURN AFTER READING</h3>
                <p className="text-xs text-[var(--color-muted)] tracking-widest leading-relaxed">
                  CIPHERTEXT IS PURGED THE MICROSECOND IT IS RETRIEVED.
                </p>
              </div>

              {/* Box 3 */}
              <div className="bg-[var(--color-surface)] p-10 group hover:bg-[var(--color-paper)] transition-colors">
                <div className="mb-12">
                  <KeyRound className="w-8 h-8 text-[var(--color-ink)]" />
                </div>
                <h3 className="font-sans font-bold text-xl tracking-tighter mb-4 text-[var(--color-ink)]">ACCESS PROTOCOLS</h3>
                <p className="text-xs text-[var(--color-muted)] tracking-widest leading-relaxed">
                  PASSWORD LOCKOUT. CONFIGURABLE TTL FROM 60s TO 168h.
                </p>
              </div>
              
              {/* Box 4 */}
              <div className="bg-[var(--color-surface)] p-10 md:col-span-2 group hover:bg-[var(--color-paper)] transition-colors">
                <div className="flex justify-between items-start mb-12">
                  <Database className="w-8 h-8 text-[var(--color-accent)]" />
                  <span className="text-[10px] tracking-[0.2em] text-[var(--color-muted)]">RESTRICTED DB</span>
                </div>
                <h3 className="font-sans font-bold text-2xl md:text-4xl tracking-tighter mb-4 text-[var(--color-ink)]">ZERO-KNOWLEDGE AT REST</h3>
                <p className="text-xs text-[var(--color-muted)] tracking-widest leading-relaxed max-w-md">
                  SERVERS STORE OPAQUE BLOBS. WITHOUT THE HASH, THE DATA IS INDISTINGUISHABLE FROM RANDOM NOISE.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-32 md:py-48 px-6 border-b border-[var(--color-line)] bg-[var(--color-surface)]">
          <div className="mx-auto max-w-5xl">
            <div className="border-b border-[var(--color-line)] pb-4 mb-16 flex items-center justify-between">
              <span className="text-xs text-[var(--color-muted)] tracking-widest uppercase">/// FREQUENTLY ASKED QUESTIONS</span>
            </div>
            
            <div className="border-t border-[var(--color-line)]">
              {[
                {
                  q: "HOW DOES RELIQ SECURE MY DATA?",
                  a: "RELIQ USES AES-256-GCM ENCRYPTION. THE ENCRYPTION AND DECRYPTION PROCESS HAPPENS ENTIRELY IN YOUR BROWSER. THE DECRYPTION KEY IS INCLUDED IN THE LINK FRAGMENT (AFTER THE '#') WHICH IS NEVER SENT TO OUR SERVERS."
                },
                {
                  q: "CAN YOU READ MY SECRETS?",
                  a: "NO. WE ONLY STORE THE ENCRYPTED PAYLOAD. WITHOUT THE DECRYPTION KEY (WHICH YOU HOLD IN THE LINK), THE STORED DATA IS MATHEMATICALLY IMPOSSIBLE TO READ."
                },
                {
                  q: "WHAT HAPPENS WHEN A SECRET EXPIRES?",
                  a: "ONCE A SECRET REACHES ITS VIEW LIMIT OR EXPIRATION TIME, IT IS PERMANENTLY AND IRREVERSIBLY DELETED FROM OUR DATABASE."
                },
                {
                  q: "CAN I REVOKE A SECRET AFTER SHARING?",
                  a: "YES. IF YOU CREATE AN ACCOUNT, YOU CAN VIEW ALL YOUR ACTIVE SECRETS ON YOUR DASHBOARD AND MANUALLY REVOKE THEM AT ANY TIME."
                }
              ].map((faq, i) => (
                <details key={i} className="group border-b border-[var(--color-line)] bg-[var(--color-surface)]">
                  <summary className="flex cursor-pointer items-center justify-between py-8 px-4 sm:px-6 hover:bg-[var(--color-paper)] transition-colors">
                    <h3 className="font-sans font-bold text-lg sm:text-xl tracking-tighter text-[var(--color-ink)] uppercase">{faq.q}</h3>
                    <span className="font-mono text-xl text-[var(--color-accent)] group-open:rotate-45 transition-transform duration-300 ease-in-out">+</span>
                  </summary>
                  <div className="px-4 sm:px-6 pb-8 text-xs font-mono tracking-widest leading-relaxed text-[var(--color-muted)] uppercase">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
