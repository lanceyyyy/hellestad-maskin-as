"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CookieConsentProps {
  onConsentChange: (consented: boolean) => void;
  onSettingsRequest?: (openSettings: () => void) => void;
}

const CookieConsent = ({ onConsentChange, onSettingsRequest }: CookieConsentProps) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consented, setConsented] = useState<boolean | null>(null);
  const [tempConsent, setTempConsent] = useState<boolean>(false);

  const saveConsent = useCallback((value: boolean) => {
    setConsented(value);
    localStorage.setItem("cookieConsent", String(value));
    localStorage.setItem("cookieConsentDate", new Date().toISOString());
    onConsentChange(value);
  }, [onConsentChange]);

  const openSettings = useCallback(() => {
    setTempConsent(consented ?? false);
    setShowSettings(true);
    setShowBanner(false);
  }, [consented]);

  const reopenSettings = useCallback(() => {
    setTempConsent(consented ?? false);
    setShowSettings(true);
  }, [consented]);

  useEffect(() => {
    const savedConsent = typeof window !== "undefined" ? localStorage.getItem("cookieConsent") : null;
    if (savedConsent) {
      const consentValue = savedConsent === "true";
      setConsented(consentValue);
      setTempConsent(consentValue);
      setShowBanner(false);
      onConsentChange(consentValue);
    } else {
      setShowBanner(true);
    }
  }, [onConsentChange]);

  useEffect(() => {
    if (onSettingsRequest) {
      onSettingsRequest(reopenSettings);
    }
  }, [onSettingsRequest, reopenSettings]);

  const handleAccept = () => {
    saveConsent(true);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleDecline = () => {
    saveConsent(false);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSaveSettings = () => {
    saveConsent(tempConsent);
    setShowSettings(false);
  };

  const handleRejectSettings = () => {
    saveConsent(false);
    setShowSettings(false);
  };

  const handleBackdropClick = () => {
    saveConsent(tempConsent);
    setShowSettings(false);
  };

  if (!showBanner && !showSettings) {
    return null;
  }

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4 shadow-lg sm:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <h3 className="mb-2 text-base font-semibold text-gray-900 sm:text-lg">
                  Informasjonskapsler og samtykke
                </h3>
                <p className="text-sm text-gray-600">
                  Vi bruker informasjonskapsler for grunnleggende funksjonalitet. Ikke-n\u00F8dvendige teknologier som innebygd kart krever ditt samtykke og kan aktiveres eller deaktiveres n\u00E5r som helst.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                <Button
                  variant="outline"
                  onClick={openSettings}
                  className="border-2 border-gray-900 bg-white text-sm font-semibold text-gray-900 hover:bg-gray-100"
                >
                  Innstillinger
                </Button>
                <Button onClick={handleDecline} className="bg-gray-900 text-sm font-semibold text-white hover:bg-gray-800">
                  Avsl\u00E5
                </Button>
                <Button onClick={handleAccept} className="bg-gray-900 text-sm font-semibold text-white hover:bg-gray-800">
                  Godta
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Lukk innstillinger"
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />
          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-2xl">
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Samtykkeinnstillinger</h2>
                <button onClick={handleBackdropClick} className="rounded p-1 text-gray-900 hover:bg-gray-100">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-6 p-6">
              <div>
                <h3 className="mb-2 font-medium text-gray-900">N\u00F8dvendige informasjonskapsler</h3>
                <p className="mb-3 text-sm text-gray-700">
                  Disse er p\u00E5krevd for grunnleggende funksjonalitet og kan ikke deaktiveres.
                </p>
                <div className="flex items-center justify-between rounded bg-gray-100 p-3">
                  <span className="text-sm font-medium text-gray-900">Grunnleggende funksjonalitet</span>
                  <span className="text-sm text-gray-700">Alltid aktivert</span>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium text-gray-900">Funksjonelle tjenester</h3>
                <p className="mb-3 text-sm text-gray-700">
                  Innebygde kart og andre tredjepartstjenester som forbedrer brukeropplevelsen.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded bg-gray-100 p-3">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Google Maps</div>
                      <div className="text-xs text-gray-700">
                        Viser interaktive kart | Levetid: Sesjon |{" "}
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[hsl(var(--primary))] hover:underline"
                        >
                          Google sine retningslinjer
                        </a>
                      </div>
                    </div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={tempConsent}
                        onChange={(event) => setTempConsent(event.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`h-6 w-10 rounded-full transition-colors ${
                          tempConsent ? "bg-[hsl(var(--primary))]" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`mt-1 h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                            tempConsent ? "translate-x-5" : "translate-x-1"
                          }`}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-200 p-6 sm:flex-row sm:justify-end">
              <Button
                onClick={handleRejectSettings}
                className="border-2 border-gray-900 bg-white text-sm font-semibold text-gray-900 hover:bg-gray-100"
              >
                Avsl\u00E5 alle
              </Button>
              <Button
                onClick={handleSaveSettings}
                className="bg-gray-900 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Lagre valg
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;

