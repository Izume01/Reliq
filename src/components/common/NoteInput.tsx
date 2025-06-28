"use client";
import React from "react";
import useSecret from "@/lib/store/secret";
import { Input } from "../base/Input";

const NoteInput: React.FC = () => {
    const { notes, setNote } = useSecret();

    return (
        <div className="w-full px-6 flex flex-col gap-3">
            <label htmlFor="note" className="text-sm ml-1.5 font-medium text-neutral-400 tracking-wide">
                Note
            </label>
            {/* <Input
                id="note"
                type="text"
                value={notes}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter your secret..."
                
            /> */}
            <textarea
                id="note"
                value={notes}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter your secret..."
                className="w-full px-4 py-3.5 rounded-xl bg-[#111111] text-white border border-[#2a2a2a] 
                placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#444] focus:border-transparent
                transition-all duration-200 hover:bg-[#141414] hover:border-[#333]
                min-h-[120px] h-[120px] scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-[#111111]
                font-medium leading-relaxed resize-none"
                rows={4}
                spellCheck={false}
            ></textarea>
        </div>
    );
};

export default NoteInput;
