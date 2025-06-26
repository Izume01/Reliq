"use client";
import React, { useState } from "react";
import useSecret from "@/lib/store/secret";
import toast from "react-hot-toast";

const SecretButton = () => {
  const { notes, timetolive, password } = useSecret();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState(null);
  
  

  const handleCreateSecret = async () => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");

    if (notes.length === 0) {
      setIsError(true);
      const msg = "Please enter a note";
      setErrorMessage(msg);
      toast.error(msg);
      setIsLoading(false);
      return;
    }

    if (timetolive === 0) {
      setIsError(true);
      const msg = "Please select a time to live";
      setErrorMessage(msg);
      toast.error(msg);
      setIsLoading(false);
      return;
    }

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
        setIsError(true);
        const msg = "Failed to create secret";
        setErrorMessage(msg);
        toast.error(msg);
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setData(data);
      setIsSuccess(true);

      // Reset button after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setData(null);
      }, 2000);
    } catch (error) {
      setIsError(true);
      const msg = "An error occurred";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="w-full px-5 py-3 mt-5   text-sm font-medium text-white bg-blue-500 rounded-2xl shadow-sm hover:bg-blue-600 transition duration-200"
      onClick={handleCreateSecret}
      disabled={isLoading || isSuccess}
    >
      {isLoading ? "Creating..." : isSuccess ? "Secret Created" : "Create Secret"}
    </button>
  );
};

export default SecretButton