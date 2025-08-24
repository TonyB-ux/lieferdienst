"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type ConsentState = {
  necessary: true;       // immer true (zwingend erforderliche Cookies)
  analytics: boolean;    // z.B. GA4 (kommt in Schritt 2)
  marketing: boolean;    // optional (falls du später Ads einbindest)
};

type ConsentContextType = {
  consent: ConsentState;
  setConsent: (next: Partial<ConsentState>) => void;
  showBanner: boolean;
  openBanner: () => void;
  closeBanner: () => void;
};

const defaultConsent: ConsentState = { necessary: true, analytics: false, marketing: false };
const ConsentContext = createContext<ConsentContextType | null>(null);
const STORAGE_KEY = "consent.v1";

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}

export default function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsentState] = useState<ConsentState>(defaultConsent);
  const [showBanner, setShowBanner] = useState(false);

  // Consent aus localStorage laden
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ConsentState;
        setConsentState({ necessary: true, analytics: !!parsed.analytics, marketing: !!parsed.marketing });
        setShowBanner(false);
      } else {
        setShowBanner(true);
      }
    } catch {
      setShowBanner(true);
    }
  }, []);

  // Consent speichern
  const setConsent = (next: Partial<ConsentState>) => {
    setConsentState((prev) => {
      const merged: ConsentState = { ...prev, ...next, necessary: true };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    });
  };

  const openBanner = () => setShowBanner(true);
  const closeBanner = () => setShowBanner(false);

  const value = useMemo<ConsentContextType>(
    () => ({ consent, setConsent, showBanner, openBanner, closeBanner }),
    [consent, showBanner]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}
