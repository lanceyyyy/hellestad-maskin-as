import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type TypewriterTextProps = {
  text: string;
  className?: string;
};

export function TypewriterText({ text, className }: TypewriterTextProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <span
      className={cn(
        "inline-block font-medium tracking-tight",
        !prefersReducedMotion && "typewriter",
        className
      )}
    >
      {text}
    </span>
  );
}
