"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animated";
import { useTranslations } from "@/hooks/use-translations";

const CTABanner = () => {
  const t = useTranslations();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,hsl(var(--secondary))_0%,hsl(220_25%_25%)_100%)] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--primary)/0.1),transparent_40%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 text-center">
        <Reveal animation="fade-up">
          <h2 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t.ctaBanner.title}
          </h2>
        </Reveal>

        <Reveal animation="fade-up" delay={120}>
          <p className="max-w-2xl text-lg text-white/90 sm:text-xl">
            {t.ctaBanner.subtitle}
          </p>
        </Reveal>

        <Reveal animation="fade-up" delay={240}>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Button
              asChild
              size="lg"
              className="group rounded-full bg-[hsl(var(--primary))] px-10 py-6 text-base font-semibold tracking-wide text-white shadow-xl transition-all hover:scale-105 hover:bg-[hsl(var(--primary)/0.9)]"
            >
              <Link href="/kontakt">
                {t.ctaBanner.ctaButton}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-white/60 bg-white/10 px-10 py-6 text-base font-semibold tracking-wide text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/20"
            >
              <Link href="/kjop">
                {t.hero.viewMachines}
              </Link>
            </Button>
          </div>
        </Reveal>

        <Reveal animation="fade-up" delay={360}>
          <div className="mt-6 flex flex-col items-center gap-6 border-t border-white/30 pt-10 sm:flex-row sm:gap-10">
            <a
              href="tel:97650223"
              className="group flex items-center gap-3 text-base font-semibold text-white transition-colors hover:text-[hsl(var(--primary))]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all group-hover:bg-[hsl(var(--primary))] group-hover:scale-110">
                <Phone className="h-5 w-5" />
              </span>
              {t.ctaBanner.phoneNumber}
            </a>

            <a
              href="mailto:o-arnhel@online.no"
              className="group flex items-center gap-3 text-base font-semibold text-white transition-colors hover:text-[hsl(var(--primary))]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all group-hover:bg-[hsl(var(--primary))] group-hover:scale-110">
                <Mail className="h-5 w-5" />
              </span>
              {t.ctaBanner.emailAddress}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CTABanner;
