"use client";

import Link from "next/link";
import type { Route } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger } from "@/components/animated";
import { BrandImage } from "@/components/media";
import { useTranslations } from "@/hooks/use-translations";
import type { AnimationType } from "@/components/animated/Reveal";

const Services = () => {
  const t = useTranslations();

  const SERVICES: Array<{
    title: string;
    description: string;
    link: string;
    linkLabel: string;
    isExternal?: boolean;
    animation: AnimationType;
    image: string;
    imageLabel: string;
  }> = [
    {
      ...t.services.services[0],
      animation: "slide-right",
      image: "/service/1.jpg",
      imageLabel: t.services.services[0].title,
    },
    {
      ...t.services.services[1],
      animation: "fade-up",
      image: "/service/2.jpg",
      imageLabel: t.services.services[1].title,
    },
    {
      ...t.services.services[2],
      animation: "slide-left",
      image: "/service/3.jpg",
      imageLabel: t.services.services[2].title,
    },
  ];
  return (
    <section className="relative overflow-hidden bg-gray-50 py-32">
      <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-6">
        <div className="text-center">
          <Reveal animation="fade-up" className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t.services.sectionTitle}
            </h2>
          </Reveal>
        </div>

        <Stagger interval={160} className="grid gap-10 md:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal
              key={service.title}
              animation={service.animation as any}
              delay={index * 60}
              className="h-full"
            >
              <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border-0 bg-white shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <BrandImage
                  src={service.image}
                  alt={service.imageLabel}
                  fallbackLabel={service.title}
                  wrapperClassName="h-64 w-full flex-shrink-0"
                  imgClassName="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <CardContent className="flex flex-1 flex-col gap-6 p-8">
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-600">
                      {service.description}
                    </p>
                  </div>
                  <div className="pt-4">
                    <Button
                      asChild
                      size="lg"
                      className="w-full rounded-full border-0 text-sm font-semibold tracking-wide shadow-md transition-all hover:scale-105 hover:shadow-lg"
                    >
                      {service.isExternal ? (
                        <a
                          href={service.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {service.linkLabel}
                        </a>
                      ) : (
                        <Link href={service.link as Route}>{service.linkLabel}</Link>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Services;
