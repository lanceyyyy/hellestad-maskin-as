"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/animated";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Weight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { MachineDetail } from "@/data/machines";
import type { FinnAdDetail } from "@/lib/finn-api";

type MachineDetailViewProps = {
  machine: MachineDetail;
  finnData?: FinnAdDetail;
};

const specificationIcons: Record<string, JSX.Element> = {
  modelYear: <Calendar className="h-6 w-6 text-[hsl(var(--primary))]" />,
  workingHours: <Clock className="h-6 w-6 text-[hsl(var(--primary))]" />,
  weight: <Weight className="h-6 w-6 text-[hsl(var(--primary))]" />,
  location: <MapPin className="h-6 w-6 text-[hsl(var(--primary))]" />,
};

export function MachineDetailView({
  machine,
  finnData,
}: MachineDetailViewProps) {
  // Use FINN.no images if available, otherwise fallback to machine.image
  const images =
    finnData?.images && finnData.images.length > 0
      ? finnData.images
      : [machine.image];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!thumbnailContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - thumbnailContainerRef.current.offsetLeft);
    setScrollLeft(thumbnailContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !thumbnailContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - thumbnailContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    thumbnailContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white mt-24 text-gray-900">
      <section className="relative bg-white pb-8 pt-16 sm:pb-12 sm:pt-20 lg:pb-16 lg:pt-28">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
          {/* Back Link */}
          <Reveal animation="fade-up">
            <Link
              href="/kjop"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-[hsl(var(--primary))]"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Tilbake til oversikten
            </Link>
          </Reveal>

          {/* Main Content Grid */}
          <div className="mt-4 flex flex-col gap-6 sm:mt-6 lg:mt-8 lg:grid lg:grid-cols-2 lg:gap-10">
            {/* Image Section */}
            <div className="w-full space-y-3">
              <Reveal animation="scale-in">
                {/* Main Image Container */}
                <div className="relative h-[45vh] min-h-[280px] w-full overflow-hidden rounded-lg bg-gray-100 shadow-lg sm:h-[50vh] sm:min-h-[320px] sm:rounded-xl lg:h-[65vh] lg:min-h-[450px] lg:max-h-[600px] lg:rounded-2xl">
                  <img
                    src={images[currentImageIndex]}
                    alt={`${machine.title} - Bilde ${currentImageIndex + 1}`}
                    className="h-full w-full object-contain"
                  />

                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={goToPrevious}
                        className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-900 shadow-md backdrop-blur-sm transition-all hover:scale-110 active:scale-95 sm:left-3 sm:h-10 sm:w-10 lg:h-11 lg:w-11"
                        aria-label="Forrige bilde"
                      >
                        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                      </button>
                      <button
                        onClick={goToNext}
                        className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-900 shadow-md backdrop-blur-sm transition-all hover:scale-110 active:scale-95 sm:right-3 sm:h-10 sm:w-10 lg:h-11 lg:w-11"
                        aria-label="Neste bilde"
                      >
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                      </button>

                      {/* Image Counter */}
                      <div className="absolute bottom-2 right-2 rounded-full bg-black/75 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-sm sm:bottom-3 sm:right-3 sm:px-2.5 sm:py-1">
                        {currentImageIndex + 1} / {images.length}
                      </div>
                    </>
                  )}
                </div>
              </Reveal>

              {/* Thumbnail Navigation */}
              {images.length > 1 && (
                <div
                  ref={thumbnailContainerRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  className={`-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 ${
                    isDragging ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  style={{
                    userSelect: "none",
                    scrollbarWidth: "thin",
                  }}
                >
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all sm:h-16 sm:w-16 sm:rounded-lg lg:h-20 lg:w-20 ${
                        index === currentImageIndex
                          ? "scale-105 border-[hsl(var(--primary))] shadow-md"
                          : "border-gray-200 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Machine Info Section */}
            <div className="w-full space-y-4 sm:space-y-5">
              <Reveal animation="fade-up">
                <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
                  {machine.title}
                </h1>
              </Reveal>

              <Reveal animation="fade-up" delay={100}>
                <div className="flex flex-wrap items-baseline gap-2">
                  <p className="text-3xl font-bold text-[hsl(var(--primary))] sm:text-4xl lg:text-5xl">
                    {machine.price}
                  </p>
                  <span className="text-sm text-gray-500">(ekskl. mva.)</span>
                </div>
              </Reveal>

              <Reveal animation="fade-up" delay={150}>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-1 xl:grid-cols-2">
                  {/* Modellår */}
                  <div className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-gray-50 p-3 sm:gap-3 sm:p-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 sm:h-10 sm:w-10">
                      <Calendar className="h-4 w-4 text-[hsl(var(--primary))] sm:h-5 sm:w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500 sm:text-xs">
                        Modellår
                      </p>
                      <p className="truncate text-sm font-bold text-gray-900 sm:text-base">
                        {machine.year}
                      </p>
                    </div>
                  </div>

                  {/* Lokasjon */}
                  <div className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-gray-50 p-3 sm:gap-3 sm:p-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 sm:h-10 sm:w-10">
                      <MapPin className="h-4 w-4 text-[hsl(var(--primary))] sm:h-5 sm:w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500 sm:text-xs">
                        Lokasjon
                      </p>
                      <p className="truncate text-sm font-bold text-gray-900 sm:text-base">
                        {machine.location}
                      </p>
                    </div>
                  </div>

                  {/* Arbeidstimer */}
                  <div className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-gray-50 p-3 sm:gap-3 sm:p-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 sm:h-10 sm:w-10">
                      <Clock className="h-4 w-4 text-[hsl(var(--primary))] sm:h-5 sm:w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500 sm:text-xs">
                        Arbeidstimer
                      </p>
                      <p className="truncate text-sm font-bold text-gray-900 sm:text-base">
                        {machine.specifications.workingHours}
                      </p>
                    </div>
                  </div>

                  {/* Vekt */}
                  <div className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-gray-50 p-3 sm:gap-3 sm:p-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 sm:h-10 sm:w-10">
                      <Weight className="h-4 w-4 text-[hsl(var(--primary))] sm:h-5 sm:w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500 sm:text-xs">
                        Vekt
                      </p>
                      <p className="truncate text-sm font-bold text-gray-900 sm:text-base">
                        {machine.specifications.weight}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal animation="fade-up" delay={200}>
                <Card className="overflow-hidden border-0 bg-[hsl(var(--primary))] text-white shadow-lg">
                  <CardContent className="p-4 sm:p-5 lg:p-6">
                    <div className="mb-3 sm:mb-4">
                      <p className="text-xs uppercase tracking-widest text-white/70">
                        Kontaktperson
                      </p>
                      <h3 className="mt-1 text-base font-semibold sm:text-lg lg:text-xl">
                        {machine.dealer.contact}
                      </h3>
                      <p className="mt-0.5 text-sm text-white/90">
                        {machine.dealer.name}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2.5 sm:flex-row">
                      <Button
                        asChild
                        size="lg"
                        className="flex-1 rounded-full bg-white text-[hsl(var(--primary))] hover:bg-white/95"
                      >
                        <a
                          href={`tel:${machine.dealer.phone.replace(
                            /\s/g,
                            ""
                          )}`}
                          className="inline-flex items-center justify-center"
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          <span className="text-sm sm:text-base">
                            Ring {machine.dealer.phone}
                          </span>
                        </a>
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="flex-1 rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20"
                      >
                        <Link
                          href="/kontakt"
                          className="inline-flex items-center justify-center"
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          <span className="text-sm sm:text-base">
                            Send melding
                          </span>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-8 sm:py-12 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
            {/* Description Card */}
            <Reveal animation="fade-up">
              <Card className="h-full border-0 bg-white shadow-lg">
                <CardContent className="p-4 sm:p-5 lg:p-6">
                  <div className="mb-3 flex items-center gap-3 sm:mb-4">
                    <div className="h-1 w-6 bg-[hsl(var(--primary))] sm:w-8" />
                    <h2 className="text-base font-bold text-gray-900 sm:text-lg lg:text-xl">
                      Beskrivelse
                    </h2>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                    {machine.description}
                  </p>
                </CardContent>
              </Card>
            </Reveal>

            {/* Specifications Card */}
            <Reveal animation="fade-up" delay={100}>
              <Card className="h-full border-0 bg-white shadow-lg">
                <CardContent className="p-4 sm:p-5 lg:p-6">
                  <div className="mb-3 flex items-center gap-3 sm:mb-4">
                    <div className="h-1 w-6 bg-[hsl(var(--primary))] sm:w-8" />
                    <h2 className="text-base font-bold text-gray-900 sm:text-lg lg:text-xl">
                      Spesifikasjoner
                    </h2>
                  </div>
                  <dl className="space-y-1.5 sm:space-y-2">
                    {Object.entries({
                      Modellår: machine.specifications.modelYear,
                      "CE-merket": machine.specifications.ceCertified,
                      Arbeidstimer: machine.specifications.workingHours,
                      Vekt: machine.specifications.weight,
                      Førerhustype: machine.specifications.cabinType,
                      Understell: machine.specifications.undercarriage,
                      Tilleggshydraulikk:
                        machine.specifications.additionalHydraulics,
                      Samsvarserklæring:
                        machine.specifications.conformityDeclaration,
                      Vedlikeholdsavtale:
                        machine.specifications.maintenanceAgreement,
                    }).map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-2 rounded-lg bg-gray-50 px-2.5 py-2 text-xs sm:gap-3 sm:px-3 sm:py-2.5 sm:text-sm"
                      >
                        <dt className="font-medium text-gray-600">{label}</dt>
                        <dd className="truncate font-bold text-gray-900">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </Reveal>
          </div>

          {/* Warranty Information */}
          <Reveal animation="fade-up" delay={150}>
            <Card className="mt-4 border border-blue-200 bg-blue-50 shadow-lg sm:mt-5 lg:mt-6">
              <CardContent className="p-4 sm:p-5 lg:p-6">
                <div className="mb-2.5 flex items-start gap-2.5 sm:mb-3 sm:gap-3">
                  <div className="mt-1 h-1 w-6 flex-shrink-0 bg-blue-500 sm:mt-1.5 sm:w-8" />
                  <h3 className="text-sm font-bold text-gray-900 sm:text-base lg:text-lg">
                    Reklamasjonsrett ved kjøp fra forhandler
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-gray-700 sm:text-sm lg:text-base">
                  Normalt gjelder 5 års reklamasjonsrett mot skjulte feil og
                  mangler fra overlevering av produktet. Reklamasjonsretten
                  brukes hvis produktet er i dårligere stand enn du hadde grunn
                  til å forvente, basert på informasjonen du har fått fra
                  selger. Reklamasjonsretten kan være begrenset hvis
                  forhandleren har forretningssted utenfor Norge.
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

export default MachineDetailView;
