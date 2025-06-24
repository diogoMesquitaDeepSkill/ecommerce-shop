"use client";

import { AgeVerificationPopup } from "@/components/age-verification-popup";
import { useAgeVerification } from "@/hooks/useAgeVerification";

interface AgeVerificationProviderProps {
  children: React.ReactNode;
}

export function AgeVerificationProvider({
  children,
}: AgeVerificationProviderProps) {
  const { status, isLoading } = useAgeVerification();

  return (
    <>
      <AgeVerificationPopup />
      {children}
    </>
  );
}
