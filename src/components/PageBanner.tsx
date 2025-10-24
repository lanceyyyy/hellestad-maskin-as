"use client";

import NextImage from "next/image";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { PlaceholderGraphic } from "@/components/media";
import { Reveal, SplitText } from "@/components/animated";

type PageBannerProps = {
  title: string;
  description?: string;
  kicker?: string;
  imageSrc?: string;
  fallbackLabel?: string;
  actions?: ReactNode;
  align?: "left" | "center";
};

export function PageBanner({
  title,
  description,
  kicker,
  imageSrc,
  fallbackLabel,
  actions,
  align = "left",
}: PageBannerProps) {
  const [failedImage, setFailedImage] = useState(false);
  const shouldShowPlaceholder = !imageSrc || failedImage;

  return (
    <section className="relative flex min-h-[50vh] items-end overflow-hidden pt-36 pb-16 sm:pt-44 lg:pt-56">
      <div className="absolute inset-0">
        {shouldShowPlaceholder ? (
          <PlaceholderGraphic
            label={fallbackLabel ?? title}
            className="h-full w-full"
          />
        ) : (
          <div className="relative h-full w-full">
            <NextImage
              src={imageSrc ?? ""}
              alt={fallbackLabel ?? title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
              onError={() => setFailedImage(true)}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/65" />
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 text-white",
          align === "center" && "items-center text-center",
        )}
      >
        {kicker && (
          <Reveal
            animation="fade-up"
            className="text-xs uppercase tracking-[0.3em] text-white/70"
          >
            {kicker}
          </Reveal>
        )}
        <SplitText
          text={title}
          as="span"
          animation="fade-up"
          interval={110}
          className="text-balance text-4xl font-semibold sm:text-5xl"
        />
        {description && (
          <Reveal
            animation="fade-up"
            delay={200}
            className="max-w-2xl text-lg text-white/80"
          >
            {description}
          </Reveal>
        )}
        {actions && (
          <Reveal animation="fade-up" delay={280}>
            <div
              className={cn(
                "flex flex-wrap items-center gap-4",
                align === "center" && "justify-center",
              )}
            >
              {actions}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export default PageBanner;
