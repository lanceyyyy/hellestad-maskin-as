import { Fragment } from "react";
import { Reveal, AnimationType } from "./Reveal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type SplitMode = "words" | "chars";

type SplitTextProps = {
  text: string;
  as?: keyof HTMLElementTagNameMap;
  animation?: AnimationType;
  interval?: number;
  initialDelay?: number;
  splitBy?: SplitMode;
  className?: string;
};

export function SplitText({
  text,
  as = "span",
  animation = "fade-up",
  interval = 60,
  initialDelay = 0,
  splitBy = "words",
  className,
}: SplitTextProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const pieces =
    splitBy === "chars"
      ? Array.from(text)
      : text.split(/(\s+)/); // preserve spaces

  return (
    <span className={cn("inline-flex flex-wrap gap-x-2", className)}>
      {pieces.map((segment, index) => {
        const delay = initialDelay + index * interval;
        const shouldSkip = prefersReducedMotion || segment.trim() === "";

        if (shouldSkip) {
          return (
            <Fragment key={`${segment}-${index}`}>
              <span>{segment}</span>
            </Fragment>
          );
        }

        return (
          <Reveal
            key={`${segment}-${index}`}
            as={as}
            animation={animation}
            delay={delay}
            className="inline-block"
          >
            {segment}
          </Reveal>
        );
      })}
    </span>
  );
}
