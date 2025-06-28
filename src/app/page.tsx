"use client";
import React from "react";
import NoteInput from "@/components/common/NoteInput";
import OptionSecret from "@/components/common/OptionSecret";
import { Fingerprint, Timer, Box, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white font-sans px-6 pt-28 pb-28 flex flex-col items-center relative">
      {/* Floating Header */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-6">
        <div className="w-full flex items-center justify-between bg-[#121212] border border-[#2a2a2a] shadow-sm rounded-xl px-4 py-2.5">
          <span className="font-semibold text-white tracking-tight">SecureContent</span>
          <span className="text-xs text-neutral-500 font-mono">zero-trace · open</span>
        </div>
      </div>

      {/* Hero Section */}
      <header className="text-center max-w-2xl mt-6 mb-20">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-sm text-neutral-400 mb-6">
          {[
            { icon: Fingerprint, label: "Password Protected" },
            { icon: Timer, label: "Self-Destruct" },
            { icon: Box, label: "Encrypted Storage" },
            { icon: ShieldCheck, label: "No Logs" },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="bg-[#141414] px-3 py-1.5 rounded-full border border-[#2a2a2a] flex items-center gap-2"
            >
              <Icon className="w-4 h-4" />
              {label}
            </span>
          ))}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight">
          Share notes. Burn after reading.
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base max-w-md mx-auto">
          A minimalist note-sharing tool with built-in privacy. Encrypt, expire, and vanish like a ninja.
        </p>
      </header>

      <section className="w-full max-w-2xl space-y-2">
        <NoteInput />
        <OptionSecret />
      </section>

      <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-3xl rounded-lg bg-[#121212] text-neutral-500 text-xs px-2 sm:px-4 py-2 sm:py-3 border border-[#2a2a2a] shadow-sm font-mono tracking-tight mt-12">
        © 2025 SecureContent · Public delivery
      </footer>
    </main>
  );
}
