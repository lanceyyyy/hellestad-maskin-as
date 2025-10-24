import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import CTABanner from "@/components/CTABanner";
import Equipment from "@/components/Equipment";

export default function HomePage() {
  return (
    <main className="flex flex-col gap-0">
      <Hero />
      <About />
      <Services />
      <CTABanner />
    </main>
  );
}
