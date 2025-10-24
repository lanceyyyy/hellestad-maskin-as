"use client";

import NextImage from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SplitText } from "@/components/animated";
import { PlaceholderGraphic } from "@/components/media";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useTranslations } from "@/hooks/use-translations";
import { cn } from "@/lib/utils";

type SlideStatus = "loading" | "loaded" | "error";

const SLIDES = [
  {
    src: "/hero/1.jpg",
    label: "Gravemaskin i arbeid ved solnedgang",
  },
  {
    src: "/hero/2.jpg",
    label: "Maskinpark klar for nye prosjekter",
  },
  {
    src: "/hero/3.jpg",
    label: "Fagfolk som leverer kvalitet",
  },
];

const TRANSITION_INTERVAL = 6500;

const Hero = () => {
  const t = useTranslations();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [statuses, setStatuses] = useState<SlideStatus[]>(
    () => SLIDES.map(() => "loading" as SlideStatus)
  );
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    SLIDES.forEach((slide, index) => {
      if (!slide.src) {
        setStatuses((prev) => {
          const next = [...prev];
          next[index] = "error";
          return next;
        });
        return;
      }

      const img = new window.Image();
      img.src = slide.src;
      img.onload = () => {
        setStatuses((prev) => {
          const next = [...prev];
          next[index] = "loaded";
          return next;
        });
      };
      img.onerror = () => {
        setStatuses((prev) => {
          const next = [...prev];
          next[index] = "error";
          return next;
        });
      };
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, TRANSITION_INTERVAL);

    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  const heroLabel = SLIDES[activeIndex]?.label ?? "Hellestad Maskin";

  return (
    <section
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0">
        {SLIDES.map((slide, index) => {
          const status = statuses[index];
          return (
            <div
              key={slide.src ?? index}
              className={cn(
                "absolute inset-0 h-full w-full overflow-hidden transition-opacity duration-1200ms ease-soft",
                activeIndex === index ? "opacity-100" : "opacity-0"
              )}
              aria-hidden={activeIndex !== index}
            >
              {status === "loaded" ? (
                <div className="relative h-full w-full">
                  <NextImage
                    src={slide.src ?? ""}
                    alt={slide.label}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="100vw"
                  />
                </div>
              ) : (
                <PlaceholderGraphic label={slide.label} className="h-full w-full" />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
            </div>
          );
        })}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-10 px-6 text-center">
        <div className="space-y-6 text-white">
          <SplitText
            text={t.hero.title}
            as="h1"
            animation="fade-up"
            interval={90}
            className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          />
          <Reveal animation="fade-up" delay={200} className="mx-auto max-w-3xl text-lg text-white/95 sm:text-xl">
            {t.hero.subtitle}
          </Reveal>
        </div>

        <Reveal animation="fade-up" delay={320} className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Button
            asChild
            size="lg"
            className="group flex items-center gap-3 rounded-full border-0 px-10 py-7 text-base font-semibold tracking-wide shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Link href="/kjop">
              {t.hero.viewMachines}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="group flex items-center gap-3 rounded-full border-2 border-white/80 bg-white/10 px-10 py-7 text-base font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[hsl(var(--secondary))]"
          >
            <Link href="/kontakt">
              {t.hero.talkToUs}
              <PhoneCall className="h-5 w-5 transition-transform group-hover:scale-110" />
            </Link>
          </Button>
        </Reveal>
      </div>

      <span className="sr-only">Aktivt hero-bilde: {heroLabel}</span>
    </section>
  );
};

export default Hero;
