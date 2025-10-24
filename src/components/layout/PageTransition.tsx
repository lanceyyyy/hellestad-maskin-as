"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type PageTransitionProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<"entering" | "entered">("entered");

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase("entered");
      return;
    }

    setPhase("entering");
    const frame = requestAnimationFrame(() => setPhase("entered"));

    return () => cancelAnimationFrame(frame);
  }, [pathname, prefersReducedMotion]);

  return (
    <div
      className={cn(className)}
      data-page-transition="wrapper"
      data-page-transition-state={phase === "entered" ? "entered" : "idle"}
    >
      {children}
    </div>
  );
}
