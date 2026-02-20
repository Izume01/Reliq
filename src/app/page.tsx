import Link from "next/link";
import {
  ArrowRight,
  Clock4,
  Eye,
  EyeOff,
  Flame,
  KeyRound,
  Link2,
  LockKeyhole,
  Plus,
  Shield,
  ShieldCheck,
  Sparkles,
  Timer,
  Trash2,
  ChevronDown,
  Zap,
  Globe,
  Server,
} from "lucide-react";

/* ── data ── */

const features = [
  {
    icon: LockKeyhole,
    title: "End-to-end encryption",
    desc: "Content is encrypted in your browser before it ever leaves your device. We never see your plaintext.",
  },
  {
    icon: Flame,
    title: "Burn after reading",
    desc: "Secrets self-destruct immediately after they're viewed. No copies, no traces, no recovery.",
  },
  {
    icon: Timer,
    title: "Configurable TTL",
    desc: "Set precise expiration windows from 1 minute to 7 days. Expired secrets are purged automatically.",
  },
  {
    icon: KeyRound,
    title: "Password protection",
    desc: "Add a passphrase that the recipient must enter. Failed attempts trigger automatic lockout.",
  },
  {
    icon: Shield,
    title: "Account-bound ownership",
    desc: "Every secret is tied to your account. Revoke any link instantly from your dashboard.",
  },
  {
    icon: EyeOff,
    title: "Zero-knowledge architecture",
    desc: "The server stores only encrypted blobs. Even with database access, secrets remain unreadable.",
  },
];

const steps = [
  {
    num: "01",
    icon: Plus,
    title: "Compose your secret",
    desc: "Write your sensitive content and configure expiry, password, and attempt limits.",
  },
  {
    num: "02",
    icon: Link2,
    title: "Share the link",
    desc: "A unique one-time URL is generated. Send it through any channel you trust.",
  },
  {
    num: "03",
    icon: Flame,
    title: "It vanishes",
    desc: "Once read, the secret is permanently destroyed. No one — including you — can retrieve it.",
  },
];

const faqs = [
  {
    q: "How is my secret encrypted?",
    a: "All encryption happens client-side using AES-256-GCM via the Web Crypto API. The encryption key is derived from a random value embedded in the URL fragment, which is never sent to the server.",
  },
  {
    q: "Can Reliq staff read my secrets?",
    a: "No. We operate on a zero-knowledge architecture. The server only stores encrypted ciphertext. Without the key fragment in the URL, decryption is impossible.",
  },
  {
    q: "What happens when a secret expires?",
    a: "Expired secrets are automatically purged from storage. The link becomes permanently invalid and cannot be recovered.",
  },
  {
    q: "Is there a limit on secret length?",
    a: "Secrets can be up to 10,000 characters. This covers most use cases including API keys, credentials, and private messages.",
  },
  {
    q: "Do I need an account to create secrets?",
    a: "Yes. Account-bound creation ensures every secret has an owner who can monitor and revoke it from the dashboard.",
  },
  {
    q: "What happens after too many wrong password attempts?",
    a: "The secret is permanently destroyed to prevent brute-force attacks. The configurable lockout threshold gives you control over the tolerance level.",
  },
];

const stats = [
  { value: "AES-256", label: "Encryption standard" },
  { value: "0", label: "Plaintext stored on server" },
  { value: "<1s", label: "Secret creation time" },
  { value: "100%", label: "Client-side encryption" },
];

/* ── page ── */

export default function LandingPage() {
  return (
    <div className="relative overflow-x-hidden">
      <main>
        {/* ── HERO ── */}
        <section className="relative px-6 pb-20 pt-20 sm:pt-28 md:pt-32">
          {/* decorative orbs */}
          <div className="pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(180,91,33,0.10)_0%,transparent_70%)] blur-2xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(180,91,33,0.06)_0%,transparent_70%)] blur-3xl" />

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-1.5 text-xs font-medium text-[var(--color-muted)] shadow-sm opacity-0">
              <Sparkles className="h-3.5 w-3.5 text-[var(--color-accent)]" />
              End-to-end encrypted secret sharing
            </div>

            <h1 className="animate-fade-in-up delay-100 opacity-0 font-dancing-script text-5xl leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-6xl md:text-7xl">
              Share secrets that
              <span className="relative ml-2 inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-strong)] bg-clip-text text-transparent">
                  vanish
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-3 rounded-full bg-[var(--color-accent)]/10" />
              </span>
              {" "}after reading.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl animate-fade-in-up delay-200 opacity-0 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
              Reliq encrypts your content in the browser, generates a one-time link, and
              destroys it the moment it&apos;s read. You stay in control with passwords,
              expiry timers, and instant revocation.
            </p>

            <div className="mt-8 flex animate-fade-in-up delay-300 opacity-0 flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-accent)]/20 transition hover:bg-[var(--color-accent-strong)] hover:shadow-xl hover:shadow-[var(--color-accent)]/25"
              >
                Create a secret
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-line)] bg-white/60 px-6 py-3 text-sm font-medium text-[var(--color-ink)] transition hover:bg-white/90 hover:shadow-sm"
              >
                Open dashboard
              </Link>
            </div>

            <div className="mt-10 flex animate-fade-in-up delay-400 opacity-0 flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]/60">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" /> Vercel Edge
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" /> Upstash Redis
              </div>
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4" /> PostgreSQL
              </div>
            </div>
          </div>

          {/* ── hero visual: mock UI ── */}
          <div className="relative mx-auto mt-16 max-w-3xl">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-[var(--color-accent)]/5 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-2xl shadow-[rgba(120,70,30,0.10)]">
              {/* mock title bar */}
              <div className="flex items-center gap-2 border-b border-[var(--color-line)]/60 bg-[var(--color-paper)]/60 px-5 py-3">
                <span className="h-3 w-3 rounded-full bg-[#e8c4a0]" />
                <span className="h-3 w-3 rounded-full bg-[#ddb888]" />
                <span className="h-3 w-3 rounded-full bg-[#c9986a]" />
                <span className="ml-3 text-xs text-[var(--color-muted)]">reliq.app/create</span>
              </div>
              {/* mock content */}
              <div className="space-y-4 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                    <LockKeyhole className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-ink)]">New secret</p>
                    <p className="text-xs text-[var(--color-muted)]">Encrypted &middot; Burns after reading</p>
                  </div>
                </div>
                <div className="rounded-xl border border-[var(--color-line)] bg-white/70 p-4">
                  <p className="font-geist-mono text-sm leading-relaxed text-[var(--color-muted)]">
                    <span className="text-[var(--color-ink)]">DATABASE_URL</span>=postgresql://admin:s3cr3t@prod-db:5432/app<br/>
                    <span className="text-[var(--color-ink)]">API_KEY</span>=sk_live_4eC39HqLyjWDarjtT1zdp7dc
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-1.5 text-xs text-[var(--color-muted)]">
                    <Timer className="h-3.5 w-3.5" /> Expires in 1 hour
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-1.5 text-xs text-[var(--color-muted)]">
                    <KeyRound className="h-3.5 w-3.5" /> Password protected
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-1.5 text-xs text-[var(--color-muted)]">
                    <Flame className="h-3.5 w-3.5" /> 3 attempts max
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 rounded-lg bg-[var(--color-accent)] px-4 py-2.5 text-center text-sm font-semibold text-white">
                    Create secret link
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section className="border-y border-[var(--color-line)]/60 bg-[var(--color-surface)]/50">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 py-10 sm:py-12 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold tracking-tight text-[var(--color-ink)] sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-[var(--color-muted)]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Features
              </p>
              <h2 className="mt-3 font-dancing-script text-3xl leading-tight text-[var(--color-ink)] sm:text-4xl md:text-5xl">
                Everything you need to share secrets safely
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                Built from the ground up for security-conscious teams and individuals
                who refuse to compromise on privacy.
              </p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon: Icon, title, desc }) => (
                <article
                  key={title}
                  className="group relative rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 transition hover:border-[var(--color-accent)]/30 hover:shadow-lg hover:shadow-[var(--color-accent)]/5"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-[var(--color-accent)]/10 p-3 text-[var(--color-accent)] transition group-hover:bg-[var(--color-accent)]/15">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--color-ink)]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="relative px-6 py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[var(--color-paper)]/40" />
          <div className="relative mx-auto max-w-5xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                How it works
              </p>
              <h2 className="mt-3 font-dancing-script text-3xl leading-tight text-[var(--color-ink)] sm:text-4xl md:text-5xl">
                Three steps to absolute privacy
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                No complex setup. No installations. Just write, share, and forget.
              </p>
            </div>

            <div className="relative mt-16 grid gap-8 md:grid-cols-3">
              {/* connector line (desktop) */}
              <div className="pointer-events-none absolute left-[16.6%] right-[16.6%] top-14 hidden h-0.5 border-t-2 border-dashed border-[var(--color-accent)]/30 md:block" />

              {steps.map(({ num, icon: Icon, title, desc }) => (
                <div key={num} className="relative group text-center">
                  <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md group-hover:border-[var(--color-accent)]/40">
                    <Icon className="h-6 w-6 text-[var(--color-accent)]" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-accent)] text-[10px] font-bold text-white shadow ring-2 ring-[var(--color-surface)]">
                      {num}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--color-ink)]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECURITY DEEP DIVE ── */}
        <section id="security" className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* left column */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  Security-first design
                </p>
                <h2 className="mt-3 font-dancing-script text-3xl leading-tight text-[var(--color-ink)] sm:text-4xl">
                  Your secrets never touch our servers in plaintext.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                  Reliq uses a zero-knowledge architecture where encryption and decryption
                  happen entirely in the browser. The encryption key is stored in the URL
                  fragment — a part that browsers never send to servers.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      icon: Zap,
                      title: "Client-side AES-256-GCM encryption",
                      desc: "Industry-standard authenticated encryption performed in your browser.",
                    },
                    {
                      icon: Server,
                      title: "Encrypted-at-rest storage",
                      desc: "Only ciphertext is stored. The decryption key never reaches the server.",
                    },
                    {
                      icon: Trash2,
                      title: "Automatic purge on access",
                      desc: "Secrets are permanently deleted after first successful retrieval.",
                    },
                  ].map(({ icon: FIcon, title, desc }) => (
                    <div key={title} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                        <FIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--color-ink)]">{title}</p>
                        <p className="mt-0.5 text-sm text-[var(--color-muted)]">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* right column: security visual */}
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent blur-2xl" />
                <div className="relative space-y-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 shadow-xl shadow-[rgba(120,70,30,0.06)]">
                  {/* encryption flow diagram */}
                  <div className="flex items-center gap-3 rounded-xl border border-[var(--color-line)] bg-white/70 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                      <Eye className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">Your browser</p>
                      <p className="text-sm font-semibold text-[var(--color-ink)]">Plaintext visible here only</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-[var(--color-line)] bg-white/70 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                      <LockKeyhole className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">AES-256-GCM</p>
                      <p className="text-sm font-semibold text-[var(--color-ink)]">Encrypted in your browser</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-[var(--color-line)] bg-white/70 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
                      <EyeOff className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">Reliq server</p>
                      <p className="text-sm font-semibold text-[var(--color-ink)]">Only ciphertext stored</p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-[var(--color-paper)] p-3 text-center">
                    <p className="font-geist-mono text-xs text-[var(--color-muted)]">
                      0x7f3a...c9b2 · 256-bit · authenticated
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMPARISON / WHY RELIQ ── */}
        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-4xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Why Reliq?
              </p>
              <h2 className="mt-3 font-dancing-script text-3xl leading-tight text-[var(--color-ink)] sm:text-4xl md:text-5xl">
                Stop sending secrets through insecure channels
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                Slack messages persist forever. Emails get forwarded. Reliq gives you
                a secure, auditable, self-destructing alternative.
              </p>
            </div>

            <div className="mt-12 overflow-hidden rounded-2xl border border-[var(--color-line)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-line)] bg-[var(--color-paper)]/60">
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Feature</th>
                    <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Email / Slack</th>
                    <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">Reliq</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-line)]/60">
                  {[
                    ["End-to-end encryption", false, true],
                    ["Self-destructing messages", false, true],
                    ["Password protection", false, true],
                    ["Configurable expiry", false, true],
                    ["Owner revocation", false, true],
                    ["Zero-knowledge storage", false, true],
                  ].map(([feature, legacy, reliq]) => (
                    <tr key={feature as string} className="bg-[var(--color-surface)]/50">
                      <td className="px-5 py-3 text-[var(--color-ink)]">{feature as string}</td>
                      <td className="px-5 py-3 text-center text-[var(--color-muted)]">
                        {legacy ? "✓" : "✗"}
                      </td>
                      <td className="px-5 py-3 text-center font-semibold text-[var(--color-accent)]">
                        {reliq ? "✓" : "✗"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                FAQ
              </p>
              <h2 className="mt-3 font-dancing-script text-3xl leading-tight text-[var(--color-ink)] sm:text-4xl md:text-5xl">
                Frequently asked questions
              </h2>
            </div>

            <div className="mt-12 space-y-4">
              {faqs.map(({ q, a }) => (
                <details
                  key={q}
                  className="group rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] transition-shadow open:shadow-md open:shadow-[var(--color-accent)]/5"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-semibold text-[var(--color-ink)] [&::-webkit-details-marker]:hidden">
                    {q}
                    <ChevronDown className="h-4 w-4 shrink-0 text-[var(--color-muted)] transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-5 text-sm leading-relaxed text-[var(--color-muted)]">
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="px-6 pb-20">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[linear-gradient(145deg,#fffbf5_0%,#f0ddc4_100%)] p-10 text-center shadow-xl shadow-[rgba(120,70,30,0.10)] sm:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[var(--color-accent)]/8 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[var(--color-accent)]/6 blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h2 className="font-dancing-script text-3xl leading-tight text-[var(--color-ink)] sm:text-4xl md:text-5xl">
                Ready to share your first secret?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                Create an account in seconds and start sending self-destructing,
                encrypted messages that only the right person can read.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-accent)]/20 transition hover:bg-[var(--color-accent-strong)] hover:shadow-xl"
                >
                  Create free account
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-line)] bg-white/60 px-7 py-3 text-sm font-medium text-[var(--color-ink)] transition hover:bg-white/90"
                >
                  Try it now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
