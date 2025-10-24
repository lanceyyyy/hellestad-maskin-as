import { CSSProperties, createElement, ReactNode, Ref, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useIntersection } from "@/hooks/use-intersection";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export type AnimationType =
  | "fade-up"
  | "fade"
  | "scale-in"
  | "slide-left"
  | "slide-right"
  | "rotate-in"
  | "mask-reveal"
  | "parallax"
  | "zoom";

type RevealProps<T extends keyof HTMLElementTagNameMap = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  once?: boolean;
  rootMargin?: string;
};

export function Reveal<T extends keyof HTMLElementTagNameMap = "div">({
  as,
  children,
  className,
  animation = "fade-up",
  delay = 0,
  once = true,
  rootMargin,
}: RevealProps<T>) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, hasEntered, isIntersecting } = useIntersection<HTMLElement>({
    triggerOnce: once,
    threshold: 0.2,
    rootMargin,
  });

  // Safety fallback: show content after timeout in dev mode
  const [forcedVisible, setForcedVisible] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !hasEntered && !isIntersecting) {
      const timeout = setTimeout(() => {
        setForcedVisible(true);
      }, 100); // Show after 100ms if observer hasn't fired

      return () => clearTimeout(timeout);
    }
  }, [hasEntered, isIntersecting]);

  const Component = (as ?? "div") as keyof JSX.IntrinsicElements;
  const shouldAnimateIn = prefersReducedMotion || hasEntered || isIntersecting || forcedVisible;

  return createElement(
    Component,
    {
      ref: ref as unknown as Ref<HTMLElement>,
      className: cn(className),
      "data-animate": animation,
      "data-animate-state": shouldAnimateIn ? "entered" : "idle",
      style: delay
        ? ({ "--stagger-offset": `${delay}ms` } as CSSProperties)
        : undefined,
    },
    children
  );
}
