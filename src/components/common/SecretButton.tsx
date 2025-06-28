"use client";
import React, { useState } from "react";
import useSecret from "@/lib/store/secret";
import toast from "react-hot-toast";
import { CheckCircle, Loader2 } from "lucide-react";  

const SecretButton = () => {
  const { notes, timetolive, password } = useSecret();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState(null);

  const handleCreateSecret = async () => {
    if (!notes.trim()) {
      toast.error("Please enter a note");
      return;
    }
    if (timetolive === 0) {
      toast.error("Please select a time to live");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({
          content: notes,
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
      ${
        isSuccess
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
