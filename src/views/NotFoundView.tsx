"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animated";
import { useTranslations } from "@/hooks/use-translations";

export function NotFoundView() {
  const t = useTranslations();

  useEffect(() => {
    console.error("404 Error: User attempted to access a non-existent route.");
  }, []);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[hsl(var(--background))] px-6 py-24">
      <Reveal
        animation="fade-up"
        className="max-w-lg rounded-3xl bg-white p-10 text-center shadow-soft"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-[hsl(220,12%,45%)]">
          {t.notFound.error}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[hsl(var(--secondary))] sm:text-4xl">
          {t.notFound.title}
        </h1>
        <p className="mt-4 text-base text-[hsl(220,12%,40%)]">
          {t.notFound.description}
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 text-sm font-semibold uppercase tracking-[0.3em]"
          >
            <Link href="/">{t.notFound.homeButton}</Link>
          </Button>
        </div>
      </Reveal>
    </main>
  );
}

export default NotFoundView;
