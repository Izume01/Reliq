"use client"
import React from "react";
import NoteInput from "@/components/common/NoteInput";
import OptionSecret from "@/components/common/OptionSecret";
import SecretButton from "@/components/common/SecretButton";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black px-6">
            <div className="flex flex-col items-center space-y-6 max-w-2xl">
                <h1 className="text-5xl font-bold text-white text-center">
                    Share Content Securely
                </h1>
                <p className="text-xl text-gray-400 text-center">
                    Lock your text, URLs, or any content with a password and auto-expiration. Share with confidence your data stays private.
                </p>
                <NoteInput/>                
                <OptionSecret/>
                
            </div>
        </div>
    );
}
