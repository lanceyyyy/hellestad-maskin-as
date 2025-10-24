# Translation System

This directory contains all translation files for the Hellestad Maskin website.

## Structure

Each section of the website has its own translation file:

- `navigation.ts` - Navigation bar and menu items
- `hero.ts` - Hero section on homepage
- `about.ts` - About section
- `services.ts` - Services section
- `ctaBanner.ts` - Call-to-action banner
- `contact.ts` - Contact form and contact page
- `footer.ts` - Footer content
- `kjop.ts` - Buy machinery page
- `selg.ts` - Sell machinery page

## Usage

### In Components

Import and use the `useTranslations` hook:

```tsx
import { useTranslations } from '@/hooks/use-translations';

const MyComponent = () => {
  const t = useTranslations();

  return (
    <div>
      <h1>{t.hero.title}</h1>
      <p>{t.hero.subtitle}</p>
    </div>
  );
};
```

### Language Context

The language can be changed using the `useLanguage` hook:

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

const MyComponent = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'no' : 'en');
  };

  return <button onClick={toggleLanguage}>Toggle Language</button>;
};
```

## Adding New Translations

1. Create a new file in `src/translations/` (e.g., `mySection.ts`)
2. Export translations for both Norwegian and English:

```ts
export const mySectionTranslations = {
  no: {
    title: "Norsk tittel",
    description: "Norsk beskrivelse",
  },
  en: {
    title: "English title",
    description: "English description",
  },
};
```

3. Export from `index.ts`:

```ts
export * from './mySection';
```

4. Add to `use-translations.ts`:

```ts
import { mySectionTranslations } from '@/translations';

export const useTranslations = () => {
  const { language } = useLanguage();

  return {
    // ... other translations
    mySection: mySectionTranslations[language],
  };
};
```

## Supported Languages

- `no` - Norwegian (Bokmål) - Default
- `en` - English

## Best Practices

1. Keep translations organized by component/section
2. Use descriptive keys for translation strings
3. Maintain consistency in translation structure between languages
4. Test both languages when adding new content
5. Use TypeScript to ensure type safety across translations
