"use client";
import React, { useState, useEffect, useCallback } from "react";
import useSecret from "@/lib/store/secret";
import { Input } from "@/components/base/Input";
import dynamic from "next/dynamic";

const SecretButton = dynamic(() => import("@/components/common/SecretButton"), {
    ssr: true,
    loading: () => (
        <div className="w-full px-5 py-3 mt-6 rounded-xl text-sm font-medium bg-[#1f1f1f] text-white border border-[#2c2c2c] shadow-md opacity-70">
            Loading...
        </div>
    )
});

const OptionSecret = () => {
    const { timetolive, setTimetolive, password, setPassword, notes } = useSecret();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(notes.trim().length > 0);
        }, 100);
        
        return () => clearTimeout(timer);
    }, [notes]);

    const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }, [setPassword]);

    const handleTTLChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setTimetolive(Number(e.target.value));
    }, [setTimetolive]);

    if (!isOpen) return null;

    return (
        <div className="w-full space-y-6 p-6 rounded-xl">
            <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-3">
                    <label htmlFor="password" className="font-medium text-neutral-300">
                        Password (optional)
                    </label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Set a password if needed"
                        className="px-4 py-3 rounded-lg bg-[#121212] text-white border border-[#2a2a2a] 
                        placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#3b3b3b] 
                        transition-all duration-200 hover:border-[#3b3b3b]"
                    />
                </div>

                <div className="flex-1 flex flex-col gap-3">
                    <label htmlFor="ttl" className="font-medium text-neutral-300">
                        Expiration
                    </label>
                    <select
                        id="ttl"
                        value={timetolive}
                        onChange={handleTTLChange}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#111111] text-neutral-600 border border-[#2a2a2a]
                                 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#444] focus:border-transparent
                                 transition-all duration-200 hover:bg-[#141414] hover:border-[#333] cursor-pointer appearance-none"
                        aria-label="Select expiration time"
                    >
                        <option value={0}>Select expiry</option>
                        <option value={300}>5 minutes</option>
                        <option value={600}>10 minutes</option>
                        <option value={1800}>30 minutes</option>
                    </select>
                </div>
            </div>

            <SecretButton />
        </div>
    );
};

export default React.memo(OptionSecret);
