"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/hooks/use-translations";
import { Reveal, Stagger } from "@/components/animated";

type FormState = {
  navn: string;
  telefon: string;
  email: string;
  melding: string;
};

const INITIAL_STATE: FormState = {
  navn: "",
  telefon: "",
  email: "",
  melding: "",
};

const ContactForm = () => {
  const t = useTranslations();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const CONTACT_POINTS = [
    {
      icon: Phone,
      heading: t.contact.contactPoints.phone.heading,
      body: t.contact.contactPoints.phone.body,
      link: "tel:97650223",
      label: t.contact.contactPoints.phone.label,
    },
    {
      icon: Mail,
      heading: t.contact.contactPoints.email.heading,
      body: t.contact.contactPoints.email.body,
      link: "mailto:o-arnhel@online.no",
      label: t.contact.contactPoints.email.label,
    },
    {
      icon: MapPin,
      heading: t.contact.contactPoints.location.heading,
      body: t.contact.contactPoints.location.body,
      link: "https://maps.google.com/?q=Bruseveien+10+1911+Flateby",
      label: t.contact.contactPoints.location.label,
    },
  ] as const;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData object to match the UseBasin form submission
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('navn', formData.navn);
      formDataToSubmit.append('email', formData.email);
      formDataToSubmit.append('telefon', formData.telefon);
      formDataToSubmit.append('melding', formData.melding);

      // Submit to UseBasin without redirecting
      await fetch('https://usebasin.com/f/a04dea2516f1', {
        method: 'POST',
        body: formDataToSubmit,
        mode: 'no-cors' // This allows the request to go through even with CORS restrictions
      });

      // Show success message and reset form
      toast({
        title: t.contact.form.successTitle,
        description: t.contact.form.successDescription,
      });

      setFormData(INITIAL_STATE);

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Feil",
        description: "Det oppstod en feil ved sending av meldingen. Pr\u00F8v igjen eller ring direkte.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-gray-50 py-24"
      id="kontakt"
    >
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6">
        <div className="text-center">
          <Reveal animation="fade-up" className="space-y-6">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              {t.contact.title}
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              {t.contact.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr,1.2fr]">
          <Stagger interval={140} className="space-y-6">
            {CONTACT_POINTS.map((item, index) => (
              <Reveal
                key={item.heading}
                animation="slide-right"
                delay={index * 80}
              >
                <div className="group flex gap-6 rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[hsl(var(--accent-20))] text-[hsl(var(--primary))]">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.heading}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {item.body}
                    </p>
                    <a
                      href={item.link}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--primary))] transition-colors hover:underline"
                    >
                      {item.label}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </Stagger>

          <Reveal animation="scale-in">
            <div className="rounded-3xl bg-white p-8 shadow-xl lg:p-10">
              <div className="mb-8 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-12 bg-[hsl(var(--primary))]" />
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {t.contact.form.formTitle}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  {t.contact.form.formSubtitle}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="navn"
                    className="text-sm font-medium text-gray-700"
                  >
                    {t.contact.form.name} *
                  </Label>
                  <Input
                    id="navn"
                    name="navn"
                    value={formData.navn}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="rounded-lg border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]"
                  />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="telefon"
                      className="text-sm font-medium text-gray-700"
                    >
                      {t.contact.form.phone} *
                    </Label>
                    <Input
                      id="telefon"
                      name="telefon"
                      type="tel"
                      inputMode="tel"
                      value={formData.telefon}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="rounded-lg border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      {t.contact.form.email} *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="rounded-lg border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="melding"
                    className="text-sm font-medium text-gray-700"
                  >
                    {t.contact.form.message}
                  </Label>
                  <Textarea
                    id="melding"
                    name="melding"
                    value={formData.melding}
                    onChange={handleChange}
                    rows={6}
                    className="rounded-lg border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]"
                    placeholder={t.contact.form.messagePlaceholder}
                  />
                </div>
                <div className="pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full rounded-full text-sm font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                  >
                    {isSubmitting
                      ? t.contact.form.submitting
                      : t.contact.form.submit}
                  </Button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;




