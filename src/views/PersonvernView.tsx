"use client";

import PageBanner from "@/components/PageBanner";
import { Reveal } from "@/components/animated";
import { useTranslations } from "@/hooks/use-translations";

export function PersonvernView() {
  const t = useTranslations();

  type PersonvernSection =
    | { title: string; content: string; purposes?: string[] }
    | { title: string; content: string[]; purposes?: string[] };

  const sections: PersonvernSection[] = [
    t.personvern.section1,
    t.personvern.section2,
    t.personvern.section3,
    t.personvern.section4,
    t.personvern.section5,
    t.personvern.section6,
    t.personvern.section7,
    t.personvern.section8,
    t.personvern.section9,
    t.personvern.section10,
    t.personvern.section11,
  ];

  return (
    <main className="bg-white text-gray-900">
      <PageBanner
        title={t.personvern.banner.title}
        description={t.personvern.banner.description}
        kicker={t.personvern.banner.kicker}
        imageSrc="/pages/2.jpg"
        fallbackLabel="Personvern"
      />

      <section className="relative overflow-hidden bg-white py-24">
        <div className="relative mx-auto flex max-w-4xl flex-col gap-12 px-6">
          {sections.map((section, index) => (
            <Reveal key={section.title} animation="fade-up" delay={index * 60}>
              <article className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {section.title}
                </h2>
                {Array.isArray(section.content) ? (
                  <div className="space-y-3 text-gray-700">
                    {section.content.map((paragraph: string) => (
                      <p key={paragraph} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="leading-relaxed text-gray-700">{section.content}</p>
                )}
                {section.purposes && (
                  <ul className="ml-6 list-disc space-y-2 text-gray-700">
                    {section.purposes.map((purpose: string) => (
                      <li key={purpose} className="leading-relaxed">
                        {purpose}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}

export default PersonvernView;
