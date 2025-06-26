"use client";
import React, { useState, useEffect } from "react";
import useSecret from "@/lib/store/secret";
import { Input } from "@/components/base/Input";
import SecretButton from "@/components/common/SecretButton";

const OptionSecret = () => {
    const { timetolive, setTimetolive, password, setPassword, notes } = useSecret();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(notes.length > 0);
    }, [notes]);



    return (
        <div className="w-full">
            {
                isOpen && (
                    <>
                        <div className="flex flex-row gap-4">
                            {/* Password */}
                            <div className="flex flex-1 flex-col gap-2">
                                <label className="text-gray-300 font-medium" htmlFor="password">
                                    Password (Optional)
                                </label>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password here..."
                                    value={password as string}
                                    onChange={(e) => setPassword(e.target.value)}/>
                            </div>

                            {/* Time to Live */}
                            <div className="flex flex-1 flex-col gap-2">
                                <label className="text-gray-300 font-medium" htmlFor="expiration">
                                    Expiration
                                </label>
                                <select
                                    id="expiration"
                                    value={timetolive}
                                    onChange={(e) => setTimetolive(Number(e.target.value))}
                                    className="w-full px-5 py-3 text-sm border border-gray-700 bg-gray-950 text-gray-100 placeholder-gray-500 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 appearance-none"
                                >
                                    <option value={0}>Select Time to Live</option>
                                    <option value={300}>5 minutes</option>
                                    <option value={600}>10 minutes</option>
                                    <option value={1800}>30 minutes</option>
                                </select>

                            </div>
                        </div>
                        <SecretButton/></>
                )
            }
            
            
        </div>
    );
};

export default OptionSecret;
