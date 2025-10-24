"use client";

import { Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageSwitch from "@/components/LanguageSwitch";

type TopBarProps = {
  isSolid?: boolean;
};

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
];

export function TopBar({ isSolid = false }: TopBarProps) {
  return (
    <div
      className={cn(
        "transition-colors duration-500 backdrop-blur-sm",
        isSolid
          ? "bg-gray-50 text-gray-700"
          : "bg-transparent text-white/90"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 text-sm md:text-[0.95rem]">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {CONTACT_ITEMS.map((item) => (
            <a
              key={item.value}
              href={item.href}
              className={cn(
                "group flex items-center gap-2 font-medium transition-colors",
                isSolid ? "hover:text-[hsl(var(--primary))]" : "hover:text-white"
              )}
              aria-label={`${item.label} ${item.value}`}
            >
              <item.icon className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:scale-110" />
              <span className="hidden sm:inline">{item.value}</span>
              <span className="sm:hidden">{item.value.replace(/\s/g, "")}</span>
            </a>
          ))}
        </div>
        <div className="hidden sm:block">
          <LanguageSwitch isSolid={isSolid} />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
