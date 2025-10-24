"use client";

import Link from "next/link";
import { Package, ExternalLink } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrandImage } from "@/components/media";
import { Reveal, Stagger } from "@/components/animated";
import { useTranslations } from "@/hooks/use-translations";
import type { FinnCard } from "@/lib/finn-api";

type KjopViewProps = {
  machines: FinnCard[];
};

export default function KjopView({ machines }: KjopViewProps) {
  const t = useTranslations();

  return (
    <main className="bg-white text-gray-900">
      <PageBanner
        title={t.kjop.banner.title}
        description={t.kjop.banner.description}
        kicker={t.kjop.banner.kicker}
        imageSrc="/pages/1.jpg"
        fallbackLabel="Maskinpark fra Hellestad Maskin"
      />

      <section className="relative overflow-hidden bg-gray-50 py-32">
        <div className="relative mx-auto max-w-7xl space-y-16 px-6">
          <div className="text-center">
            <Reveal animation="fade-up">
              <h2 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Tilgjengelige maskiner
              </h2>
            </Reveal>

            <Reveal animation="fade-up" delay={120}>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
                {machines.length > 0
                  ? `Vi har ${machines.length} maskiner tilgjengelig. Klikk på en maskin for mer informasjon.`
                  : "Bla gjennom vårt utvalg av anleggsmaskiner. Kontakt oss for mer informasjon eller for å bestille visning."}
              </p>
            </Reveal>
          </div>

          {machines.length > 0 ? (
            <Stagger interval={100} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {machines.map((machine, index) => (
                <Reveal key={machine.id} animation="scale-in" delay={index * 50}>
                  <Link href={`/kjop/${machine.id}`}>
                    <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border-0 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                      {machine.image && (
                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                          <BrandImage
                            src={machine.image}
                            alt={machine.title}
                            fallbackLabel={machine.title}
                            wrapperClassName="h-full w-full"
                            imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          />
                        </div>
                      )}
                      <CardHeader className="space-y-2 p-6">
                        <CardTitle className="line-clamp-2 text-xl font-bold text-gray-900 group-hover:text-[hsl(var(--primary))]">
                          {machine.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="mt-auto p-6 pt-0">
                        <div className="flex items-center justify-between">
                          <Button
                            variant="ghost"
                            className="group/btn inline-flex items-center gap-2 px-0 text-sm font-semibold text-[hsl(var(--primary))] hover:bg-transparent"
                          >
                            Se detaljer
                            <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </Reveal>
              ))}
            </Stagger>
          ) : (
            <Reveal animation="fade-up" delay={200}>
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white px-8 py-20 text-center shadow-sm">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                  <Package className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-gray-900">
                  Ingen maskiner for øyeblikket
                </h3>
                <p className="mb-8 max-w-xl text-lg text-gray-600">
                  Vi har ingen maskiner tilgjengelig akkurat nå. Ta kontakt for å høre om kommende maskiner.
                </p>
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link href="/kontakt">Kontakt oss</Link>
                </Button>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </main>
  );
}
