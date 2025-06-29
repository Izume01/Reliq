"use client";

import React from "react";

const WithPassword = ({ slug }: { slug: string }) => {
    const [data, setData] = React.useState<any>(null);
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [isModalOpen, setIsModalOpen] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!password) {
            setError("Password is required");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/getslug", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug, password }),
            });

            if (!response.ok) throw new Error("Invalid password");

            const result = await response.json();
            setData(result);
            setIsModalOpen(false);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0c0c0c] to-[#151515] text-white font-sans antialiased">
            {/* Enhanced Password Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md px-4">
                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl w-full max-w-md p-8 shadow-2xl flex flex-col items-center transform transition-all duration-300 scale-100">

                        <h2 className="text-xl font-bold mb-3 tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-geist-sans">
                            Secure Access Required
                        </h2>
                        <p className="text-sm text-neutral-400 mb-8 text-center max-w-sm font-roboto">
                            This content is protected. Please enter the access password to view the encrypted data.
                        </p>

                        <form onSubmit={handleSubmit} className="w-full space-y-5">
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="w-full p-4 rounded-xl bg-[#2a2a2a] text-white border border-[#3a3a3a] 
                                    placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20
                                    transition-all duration-200 shadow-inner"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full p-4 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 
                                text-white rounded-xl font-medium transition-all duration-200 
                                disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                        <span>Verifying...</span>
                                    </div>
                                ) : (
                                    "Unlock Content"
                                )}
                            </button>
                        </form>

                        {error && (
                            <div className="mt-6 p-4 w-full bg-red-500/10 border border-red-500/20 text-red-400 
                            rounded-xl text-sm text-center backdrop-blur-sm">
                                <span className="mr-2">⚠️</span>
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Enhanced Content Display */}
            {data && (
                <div className="min-h-screen flex flex-col px-6 py-16">
                    <div className="text-center mb-12"> 

                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 font-dancing-script">
                            Content Decrypted Successfully
                        </h1>
                        <p className="text-neutral-400 text-sm max-w-md mx-auto font-roboto">
                            Your encrypted content has been successfully decrypted and is now available below.
                        </p>
                    </div>

                    <div className="flex-1 flex flex-col items-center gap-6">

                        <div className="w-full max-w-4xl">
                            <div className="flex items-center gap-4 text-xs text-neutral-500 bg-[#121212] px-6 py-4 rounded-xl border border-[#2a2a2a]">
                                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="font-mono">Session active • Last updated {new Date().toLocaleTimeString()}</span>
                            </div>
                        </div>
                        <div className="w-full max-w-4xl bg-[#121212] border border-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden">
                            <div className="flex items-center gap-2 px-6 py-4 bg-[#1e1e1e] border-b border-[#2a2a2a]">
                                <div className="flex gap-2">
                                    <span className="h-3 w-3 rounded-full bg-red-500/90" />
                                    <span className="h-3 w-3 rounded-full bg-yellow-500/90" />
                                    <span className="h-3 w-3 rounded-full bg-green-500/90" />
                                </div>
                                <span className="ml-4 text-neutral-400 text-xs font-mono">encrypted_content.json</span>
                            </div>
                            <div className="p-8 bg-[#0e0e0e] overflow-auto text-sm font-mono text-neutral-300 leading-relaxed">
                                <pre className="whitespace-pre-wrap break-words">
                                    {JSON.stringify(data?.content ?? "No content available", null, 2)}
                                </pre>
                            </div>
                        </div>


                    </div>
                </div>
            )}

            {/* Optional footer */}
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-3xl rounded-lg bg-[#121212] text-neutral-500 text-xs px-4 py-3 border border-[#2a2a2a] shadow-sm font-mono tracking-tight">
                © 2025 SecureContent · Encrypted delivery
            </div>
        </div>
    );
};
``
export default WithPassword;
