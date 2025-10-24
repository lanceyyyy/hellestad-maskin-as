"use client";

import Link from "next/link";
import { Menu, X, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { Logo } from "@/components/Logo";

type NavigationProps = {
  activePath: string;
  isSolid?: boolean;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onNavigate?: () => void;
};

export function Navigation({
  activePath,
  isSolid = false,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onNavigate,
}: NavigationProps) {
  const t = useTranslations();

  const NAV_ITEMS = [
    { name: t.navigation.home, path: "/", isExternal: false },
    { name: t.navigation.buy, path: "/kjop", isExternal: false },
    { name: t.navigation.sell, path: "/selg", isExternal: false },
  ] as const;

  const CONTACT_ITEMS = [
    {
      icon: Phone,
      label: "Ring oss",
      value: "976 50 223",
      href: "tel:97650223",
    },
    {
      icon: Mail,
      label: "Send e-post",
      value: "o-arnhel@online.no",
      href: "mailto:o-arnhel@online.no",
    },
  ] as const;

  return (
    <div
      className={cn(
        "transition-all duration-500",
        isSolid
          ? "bg-white/95 text-gray-900 shadow-lg backdrop-blur-md"
          : "bg-transparent text-white",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-bold tracking-tight"
          onClick={onNavigate}
          aria-label={t.navigation.companyName}
        >
          <Logo
            size="sm"
            className={cn(isSolid ? "" : "drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]")}
            variant={isSolid ? "dark" : "light"}
          />
          <span
            className={cn(
              "hidden sm:inline-block",
              isSolid ? "text-gray-900" : "text-white",
            )}
          >
            {t.navigation.companyName}
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {NAV_ITEMS.map((item) =>
            item.isExternal ? (
              <a
                key={item.path}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "relative text-sm font-semibold transition-colors",
                  isSolid
                    ? "text-gray-700 hover:text-[hsl(var(--primary))]"
                    : "text-white/80 hover:text-white",
                )}
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.path}
                href={item.path}
                onClick={onNavigate}
                className={cn(
                  "relative text-sm font-semibold transition-colors",
                  activePath === item.path
                    ? isSolid
                      ? "text-[hsl(var(--primary))]"
                      : "text-white"
                    : isSolid
                      ? "text-gray-700 hover:text-[hsl(var(--primary))]"
                      : "text-white/80 hover:text-white",
                )}
              >
                {item.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-[hsl(var(--primary))] transition-transform duration-300",
                    activePath === item.path && "scale-x-100",
                  )}
                />
              </Link>
            ),
          )}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="hidden md:block">
            <Button
              asChild
              className={cn(
                "rounded-full text-sm font-semibold tracking-wide shadow-md transition-all duration-300",
                isSolid
                  ? "bg-[hsl(var(--primary))] text-white hover:scale-105 hover:shadow-lg"
                  : "border-2 border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-[hsl(var(--primary))]",
              )}
            >
              <Link href="/kontakt" onClick={onNavigate}>
                {t.navigation.contactUs}
              </Link>
            </Button>
          </div>

          <button
            type="button"
            onClick={onToggleMobileMenu}
            className={cn(
              "flex items-center justify-center rounded-lg p-2.5 transition-all duration-300 md:hidden",
              isSolid
                ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                : "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
            )}
            aria-label={isMobileMenuOpen ? "Lukk meny" : "Åpne meny"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden",
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <button
          type="button"
          aria-label="Lukk navigasjon"
          onClick={onToggleMobileMenu}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        />
        <div
          className={cn(
            "fixed inset-y-0 right-0 z-50 flex h-full w-72 max-w-[85vw] flex-col gap-6 bg-white px-6 py-16 text-base font-semibold tracking-tight text-gray-900 shadow-2xl transition-transform duration-500 ease-smooth",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <nav className="flex flex-col gap-6">
            {NAV_ITEMS.map((item) =>
              item.isExternal ? (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-gray-900 transition-colors hover:text-[hsl(var(--primary))]"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={onNavigate}
                  className={cn(
                    "text-base font-semibold transition-colors",
                    activePath === item.path
                      ? "text-[hsl(var(--primary))]"
                      : "text-gray-900 hover:text-[hsl(var(--primary))]",
                  )}
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>

          <div className="mt-auto space-y-6">
            <Button asChild className="w-full rounded-full font-semibold shadow-md">
              <Link href="/kontakt" onClick={onNavigate}>
                {t.navigation.contactUs}
              </Link>
            </Button>

            <div className="space-y-4 border-t border-gray-200 pt-6">
              {CONTACT_ITEMS.map((item) => (
                <a
                  key={item.value}
                  href={item.href}
                  className="group flex items-center gap-3 text-sm font-medium text-gray-600 transition-colors hover:text-[hsl(var(--primary))]"
                  aria-label={`${item.label} ${item.value}`}
                >
                  <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span>{item.value}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
