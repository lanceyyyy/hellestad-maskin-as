import { cn } from "@/lib/utils";

type PlaceholderGraphicProps = {
  label?: string;
  className?: string;
};

export function PlaceholderGraphic({
  label = "Hellestad Maskin",
  className,
}: PlaceholderGraphicProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-[hsl(210,24%,94%)] text-sm font-medium text-[hsl(var(--secondary))]",
        className,
      )}
      role="img"
      aria-label={label}
    >
      <svg
        viewBox="0 0 400 250"
        className="h-full w-full text-[hsl(var(--primary))]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="400"
          height="250"
          rx="24"
          fill="hsl(210, 24%, 94%)"
        />
        <rect
          x="20"
          y="20"
          width="360"
          height="210"
          rx="20"
          fill="currentColor"
          fillOpacity="0.15"
        />
        <path
          d="M60 180 L120 120 L170 150 L240 80 L340 160"
          stroke="currentColor"
          strokeOpacity="0.6"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="120" cy="120" r="16" fill="currentColor" fillOpacity="0.75" />
        <circle cx="170" cy="150" r="16" fill="currentColor" fillOpacity="0.75" />
        <circle cx="240" cy="80" r="16" fill="currentColor" fillOpacity="0.75" />
        <text
          x="200"
          y="214"
          textAnchor="middle"
          fontSize="28"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
          fill="hsl(220, 18%, 26%)"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}
