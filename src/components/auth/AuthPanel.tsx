"use client";

import React, { useState } from "react";
import { Loader2, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth/client";

type AuthMode = "sign-in" | "sign-up";

const AuthPanel = () => {
  const { data: sessionData, isPending: sessionPending } = authClient.useSession();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAuthenticated = Boolean(sessionData?.user);

  const resetForm = () => {
    setPassword("");
    if (mode === "sign-in") {
      setName("");
    }
  };

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required");
      return;
    }

    if (mode === "sign-up" && !name.trim()) {
      toast.error("Name is required");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "sign-up") {
        const result = await authClient.signUp.email({
          name: name.trim(),
          email: email.trim(),
          password,
        });

        if (result.error) {
          toast.error(result.error.message || "Sign up failed");
          return;
        }

        toast.success("Account created");
      } else {
        const result = await authClient.signIn.email({
          email: email.trim(),
          password,
        });

        if (result.error) {
          toast.error(result.error.message || "Sign in failed");
          return;
        }

        toast.success("Signed in");
      }

      resetForm();
    } catch {
      toast.error("Authentication request failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    setIsSubmitting(true);
    try {
      const result = await authClient.signOut();
      if (result.error) {
        toast.error(result.error.message || "Sign out failed");
        return;
      }
      toast.success("Signed out");
    } catch {
      toast.error("Unable to sign out");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (sessionPending) {
    return (
      <div className="w-full px-6">
        <div className="rounded-xl border border-[#2a2a2a] bg-[#111111] px-4 py-3 text-sm text-neutral-400">
          Checking session...
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="w-full px-6">
        <div className="rounded-xl border border-[#2a2a2a] bg-[#111111] px-4 py-3 flex items-center justify-between gap-3">
          <div className="text-sm text-neutral-300">
            Signed in as <span className="font-mono">{sessionData?.user?.email}</span>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg border border-[#3a3a3a] bg-[#1b1b1b] px-3 py-2 text-xs text-white hover:bg-[#252525] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6">
      <div className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-4">
        <div className="mb-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode("sign-in")}
            className={`rounded-lg px-3 py-1.5 text-xs ${
              mode === "sign-in" ? "bg-white text-black" : "bg-[#1d1d1d] text-neutral-400"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode("sign-up")}
            className={`rounded-lg px-3 py-1.5 text-xs ${
              mode === "sign-up" ? "bg-white text-black" : "bg-[#1d1d1d] text-neutral-400"
            }`}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-3">
          {mode === "sign-up" && (
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
              className="w-full rounded-lg border border-[#2f2f2f] bg-[#151515] px-3 py-2 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#444]"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="w-full rounded-lg border border-[#2f2f2f] bg-[#151515] px-3 py-2 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#444]"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-[#2f2f2f] bg-[#151515] px-3 py-2 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#444]"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-white px-3 py-2 text-sm font-medium text-black hover:bg-neutral-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : mode === "sign-up" ? "Create account" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPanel;
