"use client";

import { useEffect, useState } from "react";

export type AgeVerificationStatus = "pending" | "verified" | "underage";

export function useAgeVerification() {
  const [status, setStatus] = useState<AgeVerificationStatus>("pending");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing age verification
    const storedStatus = localStorage.getItem("ageVerification");

    // Only consider "verified" status as valid, ignore "underage"
    if (storedStatus === "verified") {
      setStatus("verified");
    } else {
      // If it's "underage" or anything else, treat as pending
      setStatus("pending");
      // Clear any invalid status
      if (storedStatus) {
        localStorage.removeItem("ageVerification");
      }
    }

    setIsLoading(false);
  }, []);

  const verifyAge = (isOver18: boolean, remember: boolean = false) => {
    const newStatus: AgeVerificationStatus = isOver18 ? "verified" : "underage";

    setStatus(newStatus);

    if (remember) {
      localStorage.setItem("ageVerification", newStatus);
    }
  };

  const resetAgeVerification = () => {
    setStatus("pending");
    localStorage.removeItem("ageVerification");
  };

  return {
    status,
    isLoading,
    verifyAge,
    resetAgeVerification,
    isVerified: status === "verified",
    isUnderage: status === "underage",
    isPending: status === "pending",
  };
}
