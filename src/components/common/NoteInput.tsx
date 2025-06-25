"use client"

import React from "react";
import useSecret from "@/lib/store/secret";
import { Input } from "../base/Input";
const NoteInput: React.FC = () => {
    const {notes , setNote}  = useSecret();     
    
    return (
        <div className="w-full">
            <Input 
                type="text" 
                id="note" 
                placeholder="Enter your note here..." 
                value={notes as string}
                onChange={(e) => setNote(e.target.value as string)}
                className="w-full"
            />
        </div>
    )
}

export default NoteInput;