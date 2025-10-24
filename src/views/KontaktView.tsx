"use client";

import PageBanner from "@/components/PageBanner";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animated";
import { MapPin } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";
import { useCookieConsent } from "@/contexts/CookieConsentContext";

export function KontaktView() {
  const t = useTranslations();
  const { hasConsent, openSettings } = useCookieConsent();

  return (
    <main className="bg-white text-gray-900">
      <PageBanner
        title={t.contact.banner.title}
        description={t.contact.banner.description}
        kicker={t.contact.banner.kicker}
        imageSrc="/pages/3.jpg"
        fallbackLabel="Kontakt Hellestad Maskin"
      />

      <ContactForm />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal animation="fade-up">
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              {hasConsent ? (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1835.0536077075628!2d11.1477571!3d59.83711100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416f2281adf187%3A0x562f778b75282c7b!2sHellestad%20Maskin%20AS!5e1!3m2!1sen!2sph!4v1760408684447!5m2!1sen!2sph"
                  width="100%"
                  height="420"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t.contact.mapTitle}
                />
              ) : (
                <div className="flex h-[420px] flex-col items-center justify-center gap-5 bg-gray-100 px-6 text-center">
                  <MapPin className="h-12 w-12 text-gray-400" />
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Google Maps krever samtykke
                    </h3>
                    <p className="text-sm text-gray-600">
                      For \u00E5 vise kartet m\u00E5 du akseptere Google Maps i samtykkeinnstillingene.
                    </p>
                    <Button
                      onClick={openSettings}
                      className="bg-gray-900 text-sm font-semibold text-white hover:bg-gray-800"
                    >
                      \u00C5pne samtykkeinnstillinger
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

export default KontaktView;



