import { Children, cloneElement, isValidElement, ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";

type StaggerProps = {
  children: ReactNode;
  interval?: number;
  initialDelay?: number;
  className?: string;
};

export function Stagger({ children, interval = 120, initialDelay = 0, className }: StaggerProps) {
  let index = 0;

  const mapped = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const delay = initialDelay + index * interval;
    index += 1;

    const childProps: Partial<ReactElement["props"]> = {
      style: {
        ...(child.props?.style ?? {}),
        "--stagger-offset": `${delay}ms`,
      },
    };

    return cloneElement(child, childProps);
  });

  return (
    <div className={cn(className)} data-animate-stagger>
      {mapped}
    </div>
  );
}
