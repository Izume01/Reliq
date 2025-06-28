"use client";
import React, { useEffect, useState } from "react";

interface WithoutPasswordProps {
  slug: string;
}

const WithoutPassword: React.FC<WithoutPasswordProps> = ({ slug }) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSlugData = async () => {
      try {
        const response = await fetch("/api/getslug", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });

        if (!response.ok) throw new Error("Failed to fetch slug data");

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSlugData();
  }, [slug]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c0c0c] to-[#151515] text-white font-sans antialiased px-6 py-16 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
           Accessing: <span className="text-neutral-300 font-mono">{slug}</span>
        </h1>
        <p className="text-neutral-400 text-sm max-w-md mx-auto">
          This content is public. No password required to view the decrypted data.
        </p>
      </div>

      <div className="w-full max-w-4xl bg-[#121212] border border-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 bg-[#1e1e1e] border-b border-[#2a2a2a]">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/90" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/90" />
            <span className="h-3 w-3 rounded-full bg-green-500/90" />
          </div>
          <span className="ml-4 text-neutral-400 text-xs font-mono">public_content.json</span>
        </div>
        <div className="p-8 bg-[#0e0e0e] overflow-auto text-sm font-mono text-neutral-300 leading-relaxed">
          {loading ? (
            <div className="text-center animate-pulse">Loading public content...</div>
          ) : error ? (
            <div className="text-red-400">⚠️ Error: {error}</div>
          ) : (
            <pre className="whitespace-pre-wrap break-words">
              {JSON.stringify(data?.content ?? "No content available.", null, 2)}
            </pre>
          )}
        </div>
      </div>

      <div className="mt-8 w-full max-w-4xl">
        <div className="flex items-center gap-4 text-xs text-neutral-500 bg-[#121212] px-6 py-4 rounded-xl border border-[#2a2a2a]">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono">Live public session • Last checked {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-3xl rounded-lg bg-[#121212] text-neutral-500 text-xs px-4 py-3 border border-[#2a2a2a] shadow-sm font-mono tracking-tight mt-12">
        © 2025 SecureContent · Public delivery
      </div>
    </div>
  );
};

export default WithoutPassword;
