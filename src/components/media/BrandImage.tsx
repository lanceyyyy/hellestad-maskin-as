"use client";

import Image, { type ImageProps } from "next/image";
import { forwardRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { PlaceholderGraphic } from "./PlaceholderGraphic";

type Status = "idle" | "loading" | "loaded" | "error";

type BrandImageProps = Omit<
  ImageProps,
  "className" | "src" | "alt" | "fill" | "onLoadingComplete"
> & {
  src?: string;
  alt: string;
  wrapperClassName?: string;
  imgClassName?: string;
  fallbackLabel?: string;
  sizes?: string;
};

export const BrandImage = forwardRef<HTMLImageElement, BrandImageProps>(
  (
    {
      src,
      alt,
      wrapperClassName,
      imgClassName,
      fallbackLabel,
      onLoad,
      onError,
      sizes = "100vw",
      priority,
      ...rest
    },
    ref,
  ) => {
    const [status, setStatus] = useState<Status>(() => (src ? "loading" : "error"));

    useEffect(() => {
      setStatus(src ? "loading" : "error");
    }, [src]);

    return (
      <div
        className={cn(
          "relative isolate overflow-hidden rounded-2xl bg-[hsl(210,24%,96%)]",
          wrapperClassName,
        )}
        data-image-status={status}
      >
        {src && (
          <Image
            ref={ref}
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn(
              "object-cover opacity-0 transition-opacity duration-700 ease-smooth",
              status === "loaded" && "opacity-100",
              imgClassName,
            )}
            onLoad={(event) => {
              setStatus("loaded");
              onLoad?.(event);
            }}
            onError={(event) => {
              setStatus("error");
              onError?.(event);
            }}
            {...rest}
          />
        )}

        {status === "loading" && (
          <div className="absolute inset-0 animate-pulse bg-[hsl(210,24%,92%)]" aria-hidden="true" />
        )}

        {status === "error" && (
          <div className="absolute inset-0">
            <PlaceholderGraphic label={fallbackLabel ?? alt} className="rounded-2xl" />
          </div>
        )}
      </div>
    );
  },
);

BrandImage.displayName = "BrandImage";
