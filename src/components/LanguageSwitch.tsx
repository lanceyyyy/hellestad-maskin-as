"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LanguageSwitchProps {
  isSolid?: boolean;
}

const LanguageSwitch = ({ isSolid = false }: LanguageSwitchProps) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'no' : 'en');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className={cn(
        "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all",
        isSolid
          ? "border-gray-300 bg-white text-gray-700 hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white"
          : "border-white/20 bg-transparent text-white hover:border-white hover:bg-white/10"
      )}
    >
      {/* Norwegian Flag */}
      <div className={cn(
        "flex items-center gap-1 transition-opacity",
        language === 'no' ? 'opacity-100' : 'opacity-50'
      )}>
        <Image
          src="/norway.png"
          alt="Norsk flagg"
          width={16}
          height={16}
          className="h-4 w-4 rounded-sm object-cover"
        />
        <span className="text-xs">NO</span>
      </div>

      <span className={cn(
        isSolid ? "text-gray-400" : "text-white/40"
      )}>|</span>

      {/* US Flag */}
      <div className={cn(
        "flex items-center gap-1 transition-opacity",
        language === 'en' ? 'opacity-100' : 'opacity-50'
      )}>
        <Image
          src="/US.webp"
          alt="US flagg"
          width={16}
          height={16}
          className="h-4 w-4 rounded-sm object-cover"
        />
        <span className="text-xs">EN</span>
      </div>
    </Button>
  );
};

export default LanguageSwitch;
