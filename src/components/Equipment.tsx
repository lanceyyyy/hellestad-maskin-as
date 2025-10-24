"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger } from "@/components/animated";
import { BrandImage } from "@/components/media";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/hooks/use-translations";

const EQUIPMENT_IMAGES = ["/service/1.jpg", "/service/2.jpg", "/service/3.jpg"] as const;

const Equipment = () => {
  const t = useTranslations();
  const [activeIndex, setActiveIndex] = useState(0);

  const EQUIPMENT = useMemo(() => t.equipment.equipment.map((item, index) => ({
    ...item,
    image: EQUIPMENT_IMAGES[index],
  })), [t.equipment.equipment]);

  const activeItem = EQUIPMENT[activeIndex];
  const itemCount = useMemo(() => EQUIPMENT.length, [EQUIPMENT.length]);

  const goToIndex = (index: number) => {
    const normalized = (index + itemCount) % itemCount;
    setActiveIndex(normalized);
  };

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[hsl(var(--surface-muted))]" />
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/60 to-transparent" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6">
        <div className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-6">
            <Reveal animation="fade-up" className="space-y-4">
              <span className="text-xs uppercase tracking-[0.32em] text-[hsl(220,12%,45%)]">
                {t.equipment.badge}
              </span>
              <h2 className="text-balance text-4xl font-semibold tracking-tight text-[hsl(var(--secondary))] sm:text-5xl">
                {t.equipment.title}
              </h2>
            </Reveal>
            <Reveal animation="fade" delay={120} className="text-lg text-[hsl(220,12%,38%)]">
              {t.equipment.subtitle}
            </Reveal>

            <Stagger interval={140} className="mt-10 grid gap-4">
              {t.equipment.features.map((item, index) => (
                <Reveal key={item} animation="slide-right" delay={index * 80} className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-soft">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--accent-20))] text-[hsl(var(--primary))]">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-semibold tracking-tight text-[hsl(var(--secondary))]">
                    {item}
                  </p>
                </Reveal>
              ))}
            </Stagger>
          </div>

          <Reveal animation="scale-in" className="rounded-3xl bg-white p-8 shadow-card">
            <div className="flex flex-col gap-4">
              <span className="text-xs uppercase tracking-[0.3em] text-[hsl(220,12%,45%)]">
                {t.equipment.currentMachine}
              </span>
              <h3 className="text-2xl font-semibold text-[hsl(var(--secondary))]">
                {activeItem.title}
              </h3>
              <p className="text-[hsl(220,12%,40%)]">{activeItem.description}</p>
              <ul className="grid gap-3 text-sm text-[hsl(220,12%,38%)]">
                {activeItem.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
                    {highlight}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                className="mt-4 w-full rounded-full text-sm font-semibold uppercase tracking-[0.3em]"
              >
                <a
                  href="https://www.finn.no/b2b/construction/search.html?orgId=1118319976&sort=PUBLISHED_DESC"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.equipment.viewAds}
                </a>
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal animation="mask-reveal" className="relative overflow-hidden rounded-3xl bg-white shadow-soft">
            <div className="relative aspect-[16/9]">
              {EQUIPMENT.map((item, index) => (
                <div
                  key={item.title}
                  className={cn(
                "absolute inset-0 transition-all duration-900ms ease-smooth",
                    index === activeIndex
                      ? "translate-x-0 opacity-100"
                      : "translate-x-6 opacity-0"
                  )}
                  aria-hidden={index !== activeIndex}
                >
                  <BrandImage
                    src={item.image}
                    alt={item.title}
                    fallbackLabel={item.title}
                    wrapperClassName="h-full w-full rounded-3xl"
                    imgClassName="scale-[1.02] object-cover transition-transform duration-1200ms ease-smooth"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                  <div className="absolute bottom-8 left-8 max-w-md text-white">
                    <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/80">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-6 right-6 flex items-center gap-3">
              <button
                type="button"
                aria-label={t.equipment.previousMachine}
                onClick={() => goToIndex(activeIndex - 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[hsl(var(--secondary))] shadow-card transition-transform duration-300 hover:-translate-y-0.5 hover:text-[hsl(var(--primary))]"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label={t.equipment.nextMachine}
                onClick={() => goToIndex(activeIndex + 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[hsl(var(--secondary))] shadow-card transition-transform duration-300 hover:-translate-y-0.5 hover:text-[hsl(var(--primary))]"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {EQUIPMENT.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => goToIndex(index)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-transparent bg-white shadow-sm transition-all duration-300",
                  index === activeIndex ? "border-[hsl(var(--primary))] shadow-card" : ""
                )}
                aria-label={`${t.equipment.showMachine} ${item.title}`}
              >
                <div className="absolute inset-0 bg-[hsl(var(--accent-10))] opacity-0 transition-opacity duration-300 ease-smooth group-hover:opacity-100" />
                <BrandImage
                  src={item.image}
                  alt={item.title}
                  fallbackLabel={item.title}
                  wrapperClassName="h-32 w-full"
                  imgClassName="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="relative px-4 py-3 text-left">
                  <p
                    className={cn(
                      "text-sm font-semibold tracking-tight",
                      index === activeIndex
                        ? "text-[hsl(var(--primary))]"
                        : "text-[hsl(var(--secondary))]"
                    )}
                  >
                    {item.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Equipment;
