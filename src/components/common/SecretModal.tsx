"use client";

import React, { useEffect, useRef } from "react";
import { Copy, X } from "lucide-react";
import toast from "react-hot-toast";
import useSecret from "@/lib/store/secret";

interface SecretModalProps {
  slug: string;
  expiresIn: number;
}

const SecretModal = ({ slug, expiresIn }: SecretModalProps) => {
  const { setModel } = useSecret();
  const modalRef = useRef<HTMLDivElement>(null);
  const fullLink = `${window.location.origin}/s/${slug}`;
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setModel(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setModel]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullLink);
    toast.success("Link copied to clipboard");
  };

  // Convert seconds to human-readable format
  const formatExpiryTime = (seconds: number) => {
    if (seconds < 60) return `${seconds} seconds`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
    return `${Math.floor(seconds / 86400)} days`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-[#121212] border border-[#2a2a2a] rounded-xl w-full max-w-md p-6 shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Secret Created</h3>
          <button 
            onClick={() => setModel(false)}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-neutral-400 text-sm mb-2">
            Your secret will expire in {formatExpiryTime(expiresIn)}
          </p>
          
          <div className="bg-[#0b0b0b] border border-[#2a2a2a] rounded-lg p-3 flex items-center justify-between">
            <div className="truncate text-sm font-mono text-white">
              {fullLink}
            </div>
            <button 
              onClick={copyToClipboard}
              className="ml-2 p-1.5 rounded-md hover:bg-[#1f1f1f] transition-colors"
            >
              <Copy size={16} className="text-neutral-400 hover:text-white" />
            </button>
          </div>
        </div>
        
        <div className="text-xs text-neutral-500">
          <p>Share this link with the intended recipient. The secret will be deleted after viewing.</p>
        </div>
      </div>
    </div>
  );
};

export default SecretModal; 