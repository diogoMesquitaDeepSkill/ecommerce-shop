"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentContextType {
  consent: CookiePreferences | null;
  isLoading: boolean;
  hasConsent: (category: keyof CookiePreferences) => boolean;
  updateConsent: (preferences: CookiePreferences) => void;
  resetConsent: () => void;
}

const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined);

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consent, setConsent] = useState<CookiePreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load consent from localStorage on mount
    if (typeof window !== "undefined") {
      const storedConsent = localStorage.getItem("cookieConsent");
      if (storedConsent) {
        try {
          setConsent(JSON.parse(storedConsent));
        } catch (error) {
          console.error("Failed to parse stored cookie consent:", error);
        }
      }
      setIsLoading(false);
    }
  }, []);

  const hasConsent = (category: keyof CookiePreferences): boolean => {
    if (!consent) return false;
    return consent[category];
  };

  const updateConsent = (preferences: CookiePreferences) => {
    setConsent(preferences);
    if (typeof window !== "undefined") {
      localStorage.setItem("cookieConsent", JSON.stringify(preferences));
      localStorage.setItem("cookieConsentDate", new Date().toISOString());
    }
  };

  const resetConsent = () => {
    setConsent(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cookieConsent");
      localStorage.removeItem("cookieConsentDate");
    }
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        isLoading,
        hasConsent,
        updateConsent,
        resetConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
  }
  return context;
}
