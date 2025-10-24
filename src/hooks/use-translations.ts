import { useLanguage } from '@/contexts/LanguageContext';
import {
  navigationTranslations,
  heroTranslations,
  aboutTranslations,
  servicesTranslations,
  equipmentTranslations,
  ctaBannerTranslations,
  contactTranslations,
  footerTranslations,
  kjopTranslations,
  selgTranslations,
  notFoundTranslations,
  personvernTranslations,
} from '@/translations';

export const useTranslations = () => {
  const { language } = useLanguage();

  return {
    navigation: navigationTranslations[language],
    hero: heroTranslations[language],
    about: aboutTranslations[language],
    services: servicesTranslations[language],
    equipment: equipmentTranslations[language],
    ctaBanner: ctaBannerTranslations[language],
    contact: contactTranslations[language],
    footer: footerTranslations[language],
    kjop: kjopTranslations[language],
    selg: selgTranslations[language],
    notFound: notFoundTranslations[language],
    personvern: personvernTranslations[language],
  };
};
