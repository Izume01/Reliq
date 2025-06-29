"use client";
import React, { useState } from "react";
import useSecret from "@/lib/store/secret";
import toast from "react-hot-toast";
import { CheckCircle, Loader2 } from "lucide-react";
import crypto from "crypto";



const SecretButton = () => {

  const { notes, timetolive, password } = useSecret();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState(null);

  const aesKey = process.env.NEXT_PUBLIC_AES_HEX

  async function ecrypt(text: string, hexKey: string) {
    if (hexKey.length !== 64) { // 32 bytes * 2 hex chars/byte = 64
      throw new Error('Key must be a 64-character hexadecimal string for AES-256.');
    }

    const iv = crypto.randomBytes(16); // 16 bytes IV for AES
    const key = Buffer.from(hexKey, 'hex'); // Convert hex string to Buffer

    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const tag = cipher.getAuthTag(); // Get the GCM authentication tag
    return {
      iv: iv.toString('hex'), 
      Content: encrypted,
      tag: tag.toString('hex') 
    };
  }

  const handleCreateSecret = async () => {
    if (!notes.trim()) {
      toast.error("Please enter a note");
      return;
    }
    if (timetolive === 0) {
      toast.error("Please select a time to live");
      return;
    }

    if (password && password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!aesKey) {
      toast.error("Encryption key is not set");
      return;
    }

    let encryptedData;
    try {
      encryptedData = await ecrypt(notes, aesKey);
    } catch (error: unknown) {
      toast.error("Encryption failed: " + (error instanceof Error ? error.message : 'Unknown error'));
      return;
    }

      const { iv, Content: encrypted, tag } = encryptedData;


    setIsLoading(true);
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({
          content: encrypted,
          iv,
          tag, 
          timetolive,
          password,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to create secret");
        return;
      }

      const data = await response.json();
      setData(data);
      setIsSuccess(true);
      toast.success("Secret created!");

      setTimeout(() => {
        setIsSuccess(false);
        setData(null);
      }, 2500);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`w-full px-5 py-3 mt-6 rounded-xl text-sm font-medium transition-all duration-200 
      ${isSuccess
          ? "bg-green-600 text-white cursor-default"
          : "bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white border border-[#2c2c2c] shadow-md"
        } ${isLoading && "opacity-60 cursor-not-allowed"}`}
      onClick={handleCreateSecret}
      disabled={isLoading || isSuccess}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="animate-spin h-4 w-4" />
          Creating...
        </div>
      ) : isSuccess ? (
        <div className="flex items-center justify-center gap-2">
          <CheckCircle className="h-4 w-4" />
          Secret Created
        </div>
      ) : (
        "Create Secret"
      )}
    </button>
  );
};

export default SecretButton;
