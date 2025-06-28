"use client";
import React, { useState, useEffect } from "react";
import useSecret from "@/lib/store/secret";
import { Input } from "@/components/base/Input";
import SecretButton from "@/components/common/SecretButton";

const OptionSecret = () => {
    const { timetolive, setTimetolive, password, setPassword, notes } = useSecret();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(notes.trim().length > 0);
    }, [notes]);

    if (!isOpen) return null;

    return (
        <div className="w-full space-y-6 b p-6 rounded-xl">
            <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-3">
                    <label htmlFor="password" className="font-medium text-neutral-300">
                        Password (optional)
                    </label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Set a password if needed"
                        className="px-4 py-3 rounded-lg bg-[#121212] text-white border border-[#2a2a2a] 
                        placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#3b3b3b] 
                        transition-all duration-200 hover:border-[#3b3b3b]"
                    />
                </div>

                <div className="flex-1 flex flex-col gap-3">
                    <label htmlFor="ttl" className=" font-medium text-neutral-300">
                        Expiration
                    </label>
                    <select
                        id="ttl"
                        value={timetolive}
                        onChange={(e) => setTimetolive(Number(e.target.value))}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#111111] text-neutral-600 border border-[#2a2a2a]
                                 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#444] focus:border-transparent
                                 transition-all duration-200 hover:bg-[#141414] hover:border-[#333] cursor-pointer appearance-none"
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

export default OptionSecret;
