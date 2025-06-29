"use client";

import React from "react";
import useSecret from "@/lib/store/secret";
import SecretModal from "@/components/common/SecretModal";

interface ModalProviderProps {
  children: React.ReactNode;
}

const ModalProvider = ({ children }: ModalProviderProps) => {
  const { model, data } = useSecret();

  return (
    <>
      {children}
      {model && data && (
        <SecretModal slug={data.slug} expiresIn={data.expiresIn} />
      )}
    </>
  );
};

export default ModalProvider; 