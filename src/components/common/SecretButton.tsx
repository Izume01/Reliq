"use client";
import React, { useState } from "react";
import useSecret from "@/lib/store/secret";
import toast from "react-hot-toast";
import { CheckCircle, Loader2 } from "lucide-react";
import crypto from "crypto";
import { authClient } from "@/lib/auth/client";



const SecretButton = () => {

  const { notes, timetolive, password, setModel, setData } = useSecret();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { data: sessionData, isPending: sessionPending } = authClient.useSession();

  const aesKey = process.env.NEXT_PUBLIC_AES_HEX
  const isAuthenticated = Boolean(sessionData?.user);

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
  
  // Function to encrypt password
  async function encryptPassword(pwd: string): Promise<string> {
    if (!pwd) return "";
    
    // Simple encryption for password - using a different IV for password
    const iv = crypto.randomBytes(16);
    const key = Buffer.from(aesKey || "", 'hex');
    
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    let encrypted = cipher.update(pwd, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Store IV with encrypted password, separated by a delimiter
    return `${iv.toString('hex')}:${encrypted}:${cipher.getAuthTag().toString('hex')}`;
  }

  const handleCreateSecret = async () => {
    if (!isAuthenticated) {
      toast.error("Sign in to create a secret");
      return;
    }

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
    
    // Encrypt password if it exists
    const encryptedPassword = password ? await encryptPassword(password) : "";

    setIsLoading(true);
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({
          content: encrypted,
          iv,
          tag, 
          timetolive,
          password: encryptedPassword, // Send encrypted password
        }),
      });

      if (!response.ok) {
        toast.error("Failed to create secret");
        return;
      }

      const responseData = await response.json();
      setData(responseData);
      setIsSuccess(true);
      toast.success("Secret created!");
      
      // Show modal with the link
      setModel(true);

      setTimeout(() => {
        setIsSuccess(false);
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
        } ${isLoading || sessionPending || !isAuthenticated ? "opacity-60 cursor-not-allowed" : ""}`}
      onClick={handleCreateSecret}
      disabled={isLoading || isSuccess || sessionPending || !isAuthenticated}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="animate-spin h-4 w-4" />
          Creating...
        </div>
      ) : sessionPending ? (
        "Checking session..."
      ) : !isAuthenticated ? (
        "Sign in to Create Secret"
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
