# Hellestad Maskin AS · Style Guide

Denne kortdokumentasjonen beskriver design- og interaksjonssystemet som er implementert i prosjektet. Bruk den som referanse når du legger til nye sider eller komponenter.

## Fargepalett

| Token | HSL | Bruk |
| --- | --- | --- |
| `--primary` | `hsl(27, 90%, 54%)` | Primær aksent (knapper, lenker, hovre). |
| `--primary-foreground` | `hsl(0, 0%, 100%)` | Tekst/ikon på primær. |
| `--secondary` | `hsl(220, 20%, 18%)` | Header/footer, tekst mot mørk bakgrunn. |
| `--secondary-foreground` | `hsl(0, 0%, 100%)` | Tekst/ikon på sekundær. |
| `--background` | `hsl(210, 24%, 98%)` | Standard bakgrunn. |
| `--surface-muted` | `hsl(210, 24%, 94%)` | Seksjonsbakgrunner, kort. |
| `--border` | `hsl(210, 20%, 88%)` | Linjer/delere. |
| `--accent-20` | `hsl(27, 90%, 54% / 0.2)` | Uthevninger, ikonsirkler, chips. |

> Bruk ett aksentfargetema per komponent og kombiner heller med opasitet (`--accent-10`, `--accent-40`) enn flere varianter.

## Typografi

- **Font**: `Manrope`, fallback `Inter`, system-sans.
- **Heading scale** (desktop):
  - H1 `3.5rem`, line-height `1.2`, letter-spacing `-0.01em`.
  - H2 `2.5rem`, line-height `1.25`.
  - H3 `2rem`, line-height `1.3`.
  - H4 `1.5rem`, line-height `1.35`.
- **Body**: `1rem`, line-height `1.6`, letter-spacing `-0.005em`.
- **Small**: `0.875rem`, line-height `1.5`.
- Bruk `text-balance` util for lengre overskrifter og `uppercase` + tracking på kicker-tekst (0.3–0.4em).

## Avstander og grid

- Seksjoner har standard `py-24`; kan reduseres til `py-20` på tettere seksjoner.
- Innholdsbredde styres av `max-w-6xl` (ca. 1120px) med `px-6`.
- Kort og overlay-komponenter benytter `rounded-3xl` / `rounded-[32px]` og `shadow-soft`.

## Ikoner og kontroller

- Ikoner settes i runde containere (`h-10 w-10` eller `h-14 w-14`) med bakgrunn `bg-[hsl(var(--accent-20))]`.
- Primærknapper: `Button` `variant="default"` med `rounded-full` og `tracking-[0.3em]`.
- Sekundærknapper: `variant="secondary"` på mørk bakgrunn, `variant="ghost"` for tekstlenker.
- Mobilmeny: overskygger med `bg-black/60` og `backdrop-blur-sm`.

## Animasjoner

- Intersection Observer via `Reveal`-komponenten. Tilgjengelige `animation`-verdier: `fade-up`, `fade`, `slide-left`, `slide-right`, `scale-in`, `rotate-in`, `mask-reveal`, `parallax`, `zoom`.
- `SplitText` for sekvensiell overskrift, `TypewriterText` for key messaging.
- Respektér `prefers-reduced-motion`: komponentene faller tilbake til statisk visning.
- Bruk `Stagger` for grupperte elementer og hold intervall 100–200 ms.

## Bildesystem

- `BrandImage` håndterer lastekontroll, skeleton og SVG-fallback (`PlaceholderGraphic`).
- Hero/banners bruker `PageBanner` som forsøker å laste bilde (`/heroX.jpg`, `/omoss.jpg` etc.) og faller tilbake til inline SVG dersom filen mangler.
- Hold `imgClassName="object-cover"` og legg til `transition-transform` for zoom-effekter.

## Layoutkomponenter

- **Header**: Transparent inntil scrollY > 40; nav-elementer plassert sentralt. Topplinje viser telefon + e-post, mobil viser kun to kontaktpunkter.
- **PageTransition**: legger `data-page-transition`-attributt rundt sider for myk fade.
- **ContactForm**: delt i informasjonskort + form. Kart er eksklusivt for kontaktsiden og ligger over footer, full bredde.
- **Equipment gallery**: interaktivt hovedbilde med `mask-reveal`, navigasjonspiler og miniatyrer med skalering på hover.

## Tilgjengelighet

- Fokusmarkeringer er arvet fra shadcn-komponentene (2px ring).
- `aria-label` brukes på navigasjonsknapper, mobilmeny og gallerinavigasjon.
- Tekstkontrast følger WCAG AA (minimum 4.5:1 for brødtekst).
- `ScrollToTop` respekt for anker (`hash`).

## Når du bygger videre

- Gjenbruk `Reveal` og `Stagger` for nye seksjoner.
- Legg nye bilder i `public/` eller bruk `BrandImage` for fallback.
- Hold sidetitler og meta-data i sync med `index.html`.
- Bruk `docs/performance-report.md` som sjekkliste etter større endringer.
