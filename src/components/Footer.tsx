"use client";

import Link from "next/link";
import {
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Settings,
} from "lucide-react";
import { Reveal } from "@/components/animated";
import { useTranslations } from "@/hooks/use-translations";
import { cn } from "@/lib/utils";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { Logo } from "@/components/Logo";

const SOCIAL_LINKS = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com" },
] as const;

export default function Footer() {
  const t = useTranslations();
  const { openSettings } = useCookieConsent();

  const PRIMARY_LINKS = [
    { label: t.footer.home, path: "/", isExternal: false },
    {
      label: t.footer.buy,
      path: "https://www.finn.no/mobility/search/b2b/construction?orgId=1118319976",
      isExternal: true,
    },
    { label: t.footer.sell, path: "/selg", isExternal: false },
    { label: t.footer.contact, path: "/kontakt", isExternal: false },
  ] as const;

  return (
    <footer className="relative bg-gray-900 text-white">
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr,0.9fr,1fr]">
          <Reveal animation="fade-up" className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold tracking-tight lg:text-3xl">
                {t.footer.companyName}
              </h3>
              <p className="text-sm font-semibold uppercase tracking-wide text-[hsl(var(--primary))]">
                {t.footer.tagline}
              </p>
            </div>
            <p className="max-w-lg border-l-4 border-[hsl(var(--primary))] pl-4 text-sm leading-relaxed text-gray-300">
              {t.footer.description}
            </p>

            <div className="flex items-center gap-4 pt-2">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-300 hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]"
                  aria-label={item.label}
                >
                  <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal animation="fade-up" delay={120} className="space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
                  <Phone className="h-5 w-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    {t.footer.phone}
                  </span>
                  <a
                    href="tel:97650223"
                    className="text-base font-semibold tracking-tight transition-colors hover:text-[hsl(var(--primary))]"
                  >
                    {t.footer.phoneNumber}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
                  <Mail className="h-5 w-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    {t.footer.email}
                  </span>
                  <a
                    href="mailto:o-arnhel@online.no"
                    className="text-base font-semibold tracking-tight transition-colors hover:text-[hsl(var(--primary))]"
                  >
                    {t.footer.emailAddress}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
                  <MapPin className="h-5 w-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    {t.footer.address}
                  </span>
                  <address className="not-italic text-base font-semibold tracking-tight">
                    {t.footer.addressLine1}
                    <br />
                    {t.footer.addressLine2}
                  </address>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal animation="fade-up" delay={220} className="space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              {t.footer.exploreTitle}
            </h4>
            <ul className="space-y-3">
              {PRIMARY_LINKS.map((item) => (
                <li key={item.path}>
                  {item.isExternal ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "group inline-flex items-center gap-3 text-base font-semibold tracking-tight transition-all duration-300 hover:text-[hsl(var(--primary))]"
                      )}
                    >
                      <span className="h-[2px] w-6 bg-[hsl(var(--primary))] transition-all duration-300 group-hover:w-10" />
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.path}
                      className={cn(
                        "group inline-flex items-center gap-3 text-base font-semibold tracking-tight transition-all duration-300 hover:text-[hsl(var(--primary))]"
                      )}
                    >
                      <span className="h-[2px] w-6 bg-[hsl(var(--primary))] transition-all duration-300 group-hover:w-10" />
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 text-sm text-gray-400 md:flex-row">
          <p className="font-medium">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/personvern"
              className="font-medium transition-colors hover:text-[hsl(var(--primary))]"
            >
              {t.footer.privacy}
            </Link>
            <button
              type="button"
              onClick={openSettings}
              className="flex items-center gap-2 font-medium transition-colors hover:text-[hsl(var(--primary))]"
            >
              <Settings className="h-4 w-4" />
              {t.footer.cookieSettings}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
