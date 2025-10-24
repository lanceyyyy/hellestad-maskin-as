"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal, SplitText } from "@/components/animated";
import { useTranslations } from "@/hooks/use-translations";

const About = () => {
  const t = useTranslations();

  return (
    <section className="relative overflow-hidden bg-white py-32">
      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1.05fr,0.95fr] lg:items-center lg:gap-20">
        <Reveal
          animation="parallax"
          className="relative min-h-[400px] overflow-hidden rounded-3xl shadow-xl lg:min-h-[500px]"
        >
          <Image
            src="/omoss.jpg"
            alt="Hellestad Maskin i arbeid"
            fill
            className="object-cover transition-transform duration-1200ms ease-smooth hover:scale-105"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </Reveal>

        <div className="space-y-8">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[hsl(var(--primary))]">
            {t.navigation.companyName}
          </span>
          <SplitText
            text={t.about.title}
            animation="fade-up"
            interval={100}
            className="text-balance text-4xl font-bold leading-tight text-gray-900 sm:text-5xl"
          />
          <Reveal
            animation="fade"
            delay={140}
            className="text-lg leading-relaxed text-gray-600"
          >
            {t.about.description}
          </Reveal>

          <Reveal animation="fade-up" delay={240} className="pt-6">
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 py-6 text-sm font-semibold tracking-wide shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <Link href="/kontakt">{t.navigation.contactUs}</Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
