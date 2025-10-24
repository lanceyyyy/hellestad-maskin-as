"use client";

import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
      <Header />
      <PageTransition className="flex-1">{children}</PageTransition>
      <Footer />
    </div>
  );
}
