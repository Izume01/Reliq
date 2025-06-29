"use client";
import React, { useCallback } from "react";
import useSecret from "@/lib/store/secret";

const NoteInput: React.FC = () => {
    const { notes, setNote } = useSecret();
    
    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value);
    }, [setNote]);

    return (
        <div className="w-full px-6 flex flex-col gap-3">
            <label htmlFor="note" className="text-sm ml-1.5 font-medium text-neutral-400 tracking-wide">
                Note
            </label>
            <textarea
                id="note"
                value={notes}
                onChange={handleChange}
                placeholder="Enter your secret..."
                className="w-full px-4 py-3.5 rounded-xl bg-[#111111] text-white border border-[#2a2a2a] 
                placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#444] focus:border-transparent
                transition-all duration-200 hover:bg-[#141414] hover:border-[#333]
                min-h-[120px] h-[120px] font-medium leading-relaxed resize-none"
                rows={4}
                spellCheck={false}
                aria-label="Secret note input"
            />
        </div>
    );
};

export default React.memo(NoteInput);
