"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import CookieConsent from "@/components/CookieConsent";

type CookieConsentContextValue = {
  hasConsent: boolean;
  openSettings: () => void;
  setConsent: (consented: boolean) => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

export function CookieConsentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [hasConsent, setHasConsent] = useState(false);
  const openSettingsRef = useRef<(() => void) | null>(null);

  const setConsent = useCallback((consented: boolean) => {
    setHasConsent(consented);
  }, []);

  const openSettings = useCallback(() => {
    openSettingsRef.current?.();
  }, []);

  const handleSettingsRequest = useCallback((handler: () => void) => {
    openSettingsRef.current = handler;
  }, []);

  const value = useMemo(
    () => ({
      hasConsent,
      openSettings,
      setConsent,
    }),
    [hasConsent, openSettings, setConsent],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      <CookieConsent
        onConsentChange={setConsent}
        onSettingsRequest={handleSettingsRequest}
      />
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider",
    );
  }
  return context;
}
