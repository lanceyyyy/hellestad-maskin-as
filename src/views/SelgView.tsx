"use client";

import { useState } from "react";
import PageBanner from "@/components/PageBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/animated";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/hooks/use-translations";
import { Upload, X } from "lucide-react";

type SellFormState = {
  navn: string;
  telefon: string;
  email: string;
  objektType: string;
  regNummer: string;
  pris: string;
  info: string;
  bilder: File[];
};

const INITIAL_FORM: SellFormState = {
  navn: "",
  telefon: "",
  email: "",
  objektType: "",
  regNummer: "",
  pris: "",
  info: "",
  bilder: [],
};

export function SelgView() {
  const t = useTranslations();
  const { toast } = useToast();
  const [formState, setFormState] = useState<SellFormState>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const nextImages = Array.from(files);
    setFormState((prev) => ({
      ...prev,
      bilder: [...prev.bilder, ...nextImages],
    }));
  };

  const removeImage = (index: number) => {
    setFormState((prev) => ({
      ...prev,
      bilder: prev.bilder.filter((_, currentIndex) => currentIndex !== index),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("navn", formState.navn);
      payload.append("email", formState.email);
      payload.append("telefon", formState.telefon);
      payload.append("objektType", formState.objektType);
      payload.append("regNummer", formState.regNummer);
      payload.append("pris", formState.pris);
      payload.append("info", formState.info);

      formState.bilder.forEach((file, index) => {
        payload.append(`bilde_${index + 1}`, file);
      });

      await fetch("https://usebasin.com/f/a04dea2516f1", {
        method: "POST",
        body: payload,
        mode: "no-cors",
      });

      toast({
        title: t.selg.form.successTitle,
        description: t.selg.form.successDescription,
      });
      setFormState(INITIAL_FORM);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Feil",
        description:
          "Det oppstod en feil ved sending av meldingen. Pr\u00F8v igjen eller ring direkte.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-white text-gray-900">
      <PageBanner
        title={t.selg.banner.title}
        description={t.selg.banner.description}
        kicker={t.selg.banner.kicker}
        imageSrc="/pages/2.jpg"
        fallbackLabel="Selg maskiner til Hellestad Maskin"
      />

      <section className="relative overflow-hidden bg-gray-50 py-32">
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="rounded-3xl bg-white p-10 shadow-xl lg:p-16">
            <Reveal animation="fade-up" className="mb-12 space-y-4 text-center">
              <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900">
                {t.selg.form.title}
              </h2>
              <p className="text-lg text-gray-600">{t.selg.form.subtitle}</p>
            </Reveal>

            <Reveal animation="scale-in">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-1 w-12 bg-[hsl(var(--primary))]" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t.selg.form.contactInfoTitle}
                    </h3>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="navn" className="text-sm font-medium text-gray-700">
                        {t.selg.form.name} *
                      </Label>
                      <Input
                        id="navn"
                        name="navn"
                        value={formState.navn}
                        onChange={handleChange}
                        required
                        className="rounded-lg border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="telefon"
                        className="text-sm font-medium text-gray-700"
                      >
                        {t.selg.form.phone} *
                      </Label>
                      <Input
                        id="telefon"
                        name="telefon"
                        type="tel"
                        inputMode="tel"
                        value={formState.telefon}
                        onChange={handleChange}
                        required
                        className="rounded-lg border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                      >
                        {t.selg.form.email} *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        inputMode="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="rounded-lg border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="objektType"
                        className="text-sm font-medium text-gray-700"
                      >
                        {t.selg.form.objectType}
                      </Label>
                      <Input
                        id="objektType"
                        name="objektType"
                        value={formState.objektType}
                        onChange={handleChange}
                        className="rounded-lg border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="regNummer"
                        className="text-sm font-medium text-gray-700"
                      >
                        {t.selg.form.registration}
                      </Label>
                      <Input
                        id="regNummer"
                        name="regNummer"
                        value={formState.regNummer}
                        onChange={handleChange}
                        className="rounded-lg border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pris" className="text-sm font-medium text-gray-700">
                        {t.selg.form.price} *
                      </Label>
                      <Input
                        id="pris"
                        name="pris"
                        value={formState.pris}
                        onChange={handleChange}
                        placeholder={t.selg.form.pricePlaceholder}
                        className="rounded-lg border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-1 w-12 bg-[hsl(var(--primary))]" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t.selg.form.descriptionTitle}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="info" className="text-sm font-medium text-gray-700">
                      {t.selg.form.description} *
                    </Label>
                    <Textarea
                      id="info"
                      name="info"
                      value={formState.info}
                      onChange={handleChange}
                      required
                      rows={8}
                      placeholder={t.selg.form.descriptionPlaceholder}
                      className="rounded-lg border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-1 w-12 bg-[hsl(var(--primary))]" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t.selg.form.imagesTitle}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <Label
                      htmlFor="images"
                      className="text-sm font-medium text-gray-700"
                    >
                      {t.selg.form.imagesLabel}
                    </Label>
                    <div className="relative">
                      <input
                        type="file"
                        id="images"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="images"
                        className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition-all hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--accent-10))]"
                      >
                        <Upload className="h-6 w-6 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">
                          {t.selg.form.imagesButton}
                        </span>
                      </label>
                    </div>

                    {formState.bilder.length > 0 && (
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {formState.bilder.map((file, index) => (
                        <div
                          key={`${file.name}-${index}`}
                          className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="h-40 w-full object-cover"
                          />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 opacity-0 shadow-lg transition-all hover:bg-[hsl(var(--primary))] hover:text-white group-hover:opacity-100"
                              aria-label={t.selg.form.removeImage}
                            >
                              <X className="h-4 w-4" />
                            </button>
                            <div className="border-t border-gray-200 bg-white p-2">
                              <p className="truncate text-xs text-gray-600">
                                {file.name}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-gray-600">{t.selg.form.imagesHelp}</p>
                  </div>
                </div>

                <div className="pt-8">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full rounded-full text-sm font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                  >
                    {isSubmitting ? t.selg.form.submitting : t.selg.form.submit}
                  </Button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SelgView;

