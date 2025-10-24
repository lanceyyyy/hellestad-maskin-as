"use client";

import NextImage from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
};

const SIZE_MAP: Record<NonNullable<LogoProps["size"]>, string> = {
  sm: "h-9 w-9",
  md: "h-12 w-12",
  lg: "h-14 w-14",
};

const DIMENSIONS: Record<NonNullable<LogoProps["size"]>, number> = {
  sm: 36,
  md: 48,
  lg: 56,
};

export function Logo({
  className,
  size = "md",
  variant = "dark",
}: LogoProps) {
  const [hasLogo, setHasLogo] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const tester = new Image();
    tester.src = "/logo.png";
    tester.onload = () => setHasLogo(true);
    tester.onerror = () => setHasLogo(false);

    return () => {
      tester.onload = null;
      tester.onerror = null;
    };
  }, []);

  if (hasLogo) {
    const dimension = DIMENSIONS[size] ?? DIMENSIONS.md;
    return (
      <NextImage
        src="/logo.png"
        alt="Hellestad Maskin"
        width={dimension}
        height={dimension}
        className={cn(
          "object-contain",
          SIZE_MAP[size] ?? SIZE_MAP.md,
          variant === "light" ? "drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]" : "",
          className,
        )}
        priority
        onError={() => setHasLogo(false)}
      />
    );
  }

  return (
    <div
      className={cn(
        "grid place-items-center rounded-full bg-[hsl(var(--accent))] font-semibold uppercase tracking-wide text-[hsl(var(--accent-foreground))] shadow-soft",
        SIZE_MAP[size] ?? SIZE_MAP.md,
        className,
      )}
      aria-label="Hellestad Maskin"
    >
      HM
    </div>
  );
}
