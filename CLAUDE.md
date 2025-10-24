# CLAUDE.md

**Project**: Hellestad Maskin AS - Next.js 14 machinery/construction equipment website
**Last Updated**: 2025-10-24

## Quick Start

```bash
npm install      # Install dependencies
npm run dev      # Dev server (localhost:3000)
npm run build    # Production build
npm run lint     # Lint code
```

**Path Alias**: `@/` → `./src/`
**Stack**: Next.js 14 (App Router) • React 18 • TypeScript • Tailwind CSS • ShadcN/UI • Inter font • i18n (NO/EN)

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout + metadata
│   ├── providers.tsx            # Client providers
│   ├── globals.css              # Global styles + animations
│   └── (site)/                  # Route group
│       ├── layout.tsx           # Site layout
│       ├── site-shell.tsx       # Header/Footer shell
│       ├── page.tsx             # Homepage (/)
│       ├── not-found.tsx        # 404
│       ├── kjop/[id]/page.tsx   # Dynamic routes
│       └── selg|kontakt|personvern/page.tsx
├── views/                        # Page content components (client)
│   └── [Page]View.tsx
├── components/
│   ├── animated/                # Reveal, Stagger, SplitText, TypewriterText
│   ├── layout/                  # PageTransition, ScrollToTop
│   ├── media/                   # BrandImage, PlaceholderGraphic
│   ├── ui/                      # ShadcN components (70+)
│   └── [Feature].tsx            # Hero, Services, About, etc.
├── contexts/                     # LanguageContext, CookieConsentContext
├── data/                         # Static data (machines.ts)
├── hooks/                        # use-intersection, use-translations, etc.
├── translations/                 # i18n files (no/en)
└── lib/utils.ts                 # cn() utility
```

**Routes**:
- `/` → Homepage • `/kjop` → Buy page • `/kjop/[id]` → Machine detail (dynamic)
- `/selg` → Sell • `/kontakt` → Contact • `/personvern` → Privacy

---

## Architecture Patterns

### Next.js Specifics

**Server vs Client Components**:
- Default: Server Components (can't use hooks/browser APIs)
- Mark with `"use client"` when using: hooks, browser APIs, event handlers, contexts
- All View components, animated components, and interactive components are client components

**Page Pattern**:
```tsx
// app/(site)/kjop/page.tsx (Server)
import type { Metadata } from "next";
import KjopView from "@/views/KjopView";

export const metadata: Metadata = { title: "...", description: "..." };
export default function KjopPage() { return <KjopView />; }
```

**Dynamic Routes**:
```tsx
// app/(site)/kjop/[id]/page.tsx
import { notFound } from "next/navigation";
export function generateStaticParams() { return Object.keys(DATA).map(id => ({ id })); }
export default function Page({ params }: { params: { id: string } }) {
  const item = getById(params.id);
  if (!item) notFound();
  return <DetailView item={item} />;
}
```

**Navigation**:
- Use `next/link` (NOT react-router-dom)
- Use `usePathname()`, `useRouter()` from `next/navigation`

**Layout Hierarchy**: `app/layout.tsx` → Providers → `app/(site)/layout.tsx` → SiteShell → `page.tsx`

---

## Translation System (i18n)

**Architecture**: React Context-based, Norwegian (default) + English

```tsx
// In components
import { useTranslations } from '@/hooks/use-translations';
const t = useTranslations();
return <h1>{t.hero.title}</h1>;
```

**Adding translations**:
1. Create `src/translations/section.ts`:
```ts
export const sectionTranslations = {
  no: { key: "Norsk" },
  en: { key: "English" }
};
```
2. Export from `src/translations/index.ts`
3. Add to `useTranslations` hook

**Rule**: NEVER hardcode user-facing text. ALWAYS use translations.

---

## Animation System

All animations use **Intersection Observer** + respect `prefers-reduced-motion`.

### Reveal Component
```tsx
<Reveal animation="fade-up" delay={0} once={true}>
  {children}
</Reveal>
```

**Animation types**: `fade-up` (default), `fade`, `scale-in`, `slide-left/right`, `rotate-in`, `mask-reveal`, `parallax`, `zoom`

### Stagger Component
```tsx
<Stagger interval={160} initialDelay={0}>
  {children /* each gets incremental delay */}
</Stagger>
```

### SplitText Component
```tsx
<SplitText text="Heading" animation="fade-up" interval={60} splitBy="words" />
```

### TypewriterText Component
```tsx
<TypewriterText text="Text • With • Separators" />
```

**Best Practices**:
- Default to `fade-up` (most natural)
- Stagger delays: 100-200ms
- Combine Reveal + Stagger for sequential reveals
- Don't over-animate

**CSS**: Animations in `src/app/globals.css` using `[data-animate]` attributes

---

## Image & Media System

### CRITICAL RULE: NO External Placeholders
❌ NEVER: Unsplash, placeholder.com, external services
✅ ALWAYS: `PlaceholderGraphic` component (inline SVG)

### PlaceholderGraphic
```tsx
<PlaceholderGraphic label="Descriptive text" className="h-full w-full" />
```
Inline SVG with brand colors (orange accents on gray-blue background).

### BrandImage
```tsx
<BrandImage
  src="/path.jpg"
  alt="Description"
  fallbackLabel="Fallback text"
  wrapperClassName="rounded-3xl"
  imgClassName="object-cover"
/>
```
Three states: loading (pulse) → loaded (fade-in) → error (PlaceholderGraphic).

**Rules**:
- Always use `BrandImage` (never `<img>`)
- Always provide `fallbackLabel`
- Store images in `/public`, reference as `/image.jpg`
- Use descriptive alt text

---

## Component Patterns

### Section Pattern
```tsx
<section className="relative overflow-hidden py-24">
  <div className="absolute inset-0 bg-[color]" />
  <div className="relative mx-auto max-w-6xl px-6">
    <Reveal animation="fade-up">
      <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">LABEL</span>
      <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Title</h2>
      <p className="text-lg text-muted-foreground">Description</p>
    </Reveal>
    <Stagger interval={160}>
      {items.map(item => (
        <Reveal key={item.id} animation="scale-in">
          <Card>...</Card>
        </Reveal>
      ))}
    </Stagger>
  </div>
</section>
```

### Typography Patterns
```tsx
// Kicker/Badge
<span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">LABEL</span>

// Heading
<h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Title</h2>

// Description
<p className="text-lg text-muted-foreground">Description</p>
```

### Card Pattern
```tsx
<Reveal animation="scale-in" delay={200}>
  <Card className="rounded-3xl shadow-soft transition-transform duration-500 hover:-translate-y-2">
    <CardContent className="p-8">
      <div className="h-14 w-14 rounded-2xl bg-[hsl(var(--accent-20))] text-[hsl(var(--primary))]">
        <Icon className="h-6 w-6" />
      </div>
      <CardTitle>Title</CardTitle>
      <CardDescription>Description</CardDescription>
    </CardContent>
  </Card>
</Reveal>
```

### Button Patterns
```tsx
// Primary CTA
<Button size="lg" className="rounded-full px-8 text-sm font-semibold uppercase tracking-[0.3em]">
  Text
</Button>

// Secondary
<Button variant="secondary" size="lg" className="rounded-full border border-white/30 bg-transparent">
  Text
</Button>

// Text Link
<Button variant="ghost" className="group inline-flex items-center gap-2 px-0">
  Link
  <span className="h-px w-8 bg-[hsl(var(--primary))] transition-transform group-hover:scale-x-125" />
</Button>
```

---

## Styling System

### Color Tokens
```css
--primary: 27 90% 54%;           /* Orange accent */
--secondary: 220 20% 18%;        /* Dark blue headers */
--background: 210 24% 98%;       /* Off-white */
--accent-20: 27 90% 54% / 0.2;  /* Orange 20% opacity */
```

Usage: `className="bg-[hsl(var(--accent-20))]"`

### Custom Variables
```css
--shadow-soft: 0 20px 45px -20px hsl(220 40% 20% / 0.25);
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
.duration-900ms { transition-duration: 900ms; }
```

### Utilities
- `.gradient-surface` - Subtle gradient background
- `.text-accent-gradient` - Gradient text
- Custom scrollbar (8px, primary color)

---

## Hooks & Utilities

```tsx
// useIntersection
const { ref, hasEntered } = useIntersection({ threshold: 0.2, triggerOnce: true });

// usePrefersReducedMotion (used automatically in animation components)
const prefersReducedMotion = usePrefersReducedMotion();

// cn() - Combine classnames
import { cn } from "@/lib/utils";
<div className={cn("base", isActive && "active", className)} />
```

---

## Development Guidelines

### Component Structure
```tsx
// 1. Imports
// 2. Constants
// 3. Component (state → handlers → render)
// 4. Export
```

### Class Name Order
1. Layout (flex, grid, absolute)
2. Spacing (p-, m-, gap-)
3. Sizing (w-, h-, max-w-)
4. Typography (text-, font-, tracking-)
5. Colors (bg-, text-, border-)
6. Effects (shadow-, rounded-, opacity-)
7. Transitions (transition-, duration-)
8. States (hover:, focus:)

### Checklists

**Accessibility**:
- ✓ Alt text on images
- ✓ aria-labels on interactive elements
- ✓ WCAG AA contrast (4.5:1)
- ✓ Keyboard navigation + visible focus
- ✓ Respect `prefers-reduced-motion`
- ✓ Semantic HTML

**Performance**:
- ✓ Lazy-load images (BrandImage default)
- ✓ GPU-accelerated animations (transform/opacity)
- ✓ IntersectionObserver (not scroll listeners)
- ✓ No layout shifts

### Debugging

**Animation not working?**
- Check `prefers-reduced-motion` setting
- Verify `data-animate` attributes in DevTools
- Check threshold (default 0.2 = 20% visible)

**Image not loading?**
- Check console for 404s
- Verify path starts with `/`
- Confirm `BrandImage` is used
- Check if `PlaceholderGraphic` shows (image failed)

---

## Critical Rules for AI Agents

1. **Images**: NEVER external URLs. ALWAYS `PlaceholderGraphic` for fallbacks
2. **Text**: NEVER hardcode. ALWAYS use `useTranslations()`
3. **Animation**: Most sections should use Reveal/Stagger
4. **Commands**: DON'T auto-run `npm run dev/build` unless requested
5. **Accessibility**: NON-NEGOTIABLE - alt text, aria-labels, reduced-motion
6. **Next.js**: App Router file-system routing (NOT React Router)
7. **Client**: Mark `"use client"` for hooks/browser APIs/events
8. **Navigation**: `next/link` (NOT react-router-dom)
9. **Pages**: Follow page → view component pattern
10. **SEO**: Add metadata to all page.tsx files

### Design Philosophy
Modern Scandinavian/Nordic design • Professional (NOT AI template look) • Clean typography • Strategic color use • Engaging scroll animations • Mobile-first responsive

### Exemplar Components
- **Pages**: `app/(site)/kjop/page.tsx`
- **Views**: `src/views/KjopView.tsx`
- **Dynamic**: `app/(site)/kjop/[id]/page.tsx`
- **Components**: Services.tsx, About.tsx, Equipment.tsx, PageBanner.tsx, ContactForm.tsx, Header.tsx
- **Data**: `src/data/machines.ts`

### TypeScript
- Path alias: `@/` → `./src/`
- Strict mode enabled
- Import types: `import type { Metadata } from "next"`
- Route params: `{ params }: { params: { id: string } }`

---

## Quick Reference

```tsx
// Section header
<Reveal animation="fade-up">
  <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">SECTION</span>
  <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Title</h2>
</Reveal>

// Card
<Reveal animation="scale-in" delay={200}>
  <Card className="rounded-3xl shadow-soft">
    <CardContent className="p-8">{/* Content */}</CardContent>
  </Card>
</Reveal>

// Image
<BrandImage src="/path.jpg" alt="Alt" fallbackLabel="Fallback"
  wrapperClassName="rounded-3xl" imgClassName="object-cover" />

// Icon container
<div className="h-14 w-14 rounded-2xl bg-[hsl(var(--accent-20))] text-[hsl(var(--primary))]">
  <Icon className="h-6 w-6" />
</div>

// Button
<Button size="lg" className="rounded-full px-8 text-sm font-semibold uppercase tracking-[0.3em]">
  Text
</Button>
```

---

## Migration Notes (v2.0 → v3.0)

**Changes**: Vite + React Router → Next.js 14 App Router • File-system routing • View pattern • Server/Client architecture • Static generation • Font/image optimization • Maintained animations/translations/ShadcN

**Breaking**: `next/link` (not react-router) • `usePathname()` (not useLocation) • `"use client"` directive • `app/` directory • `app/layout.tsx` entry

---

**Version**: 3.0 | **Updated**: 2025-10-24
