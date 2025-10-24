# Browser Compatibility Checklist

| Miljø | Status | Sjekkpunkter |
| --- | --- | --- |
| Chrome (seneste 2) | Ikke testet ennå | Header-transparens, hero-slider, gallerinavigasjon, mobilmeny. |
| Safari macOS | Ikke testet ennå | IntersectionObserver (Reveal), typografi, mask-reveal animasjon. |
| Firefox | Ikke testet ennå | Custom scrollbar fallback, PageTransition, knappefokus. |
| Edge | Ikke testet ennå | Lazy-loading av bilder, SVG-fallback. |
| iOS Safari | Ikke testet ennå | Hero-tekstlesbarhet, mobile CTA-knapper, meny-overlay. |
| Android Chrome | Ikke testet ennå | ScrollToTop, kontaktform, Finn.no-ekstern lenke. |

## Testprosedyre

1. **Oppstart**
   - Bygg produksjon (`npm run build`) og kjør `npm run preview`.
   - Test med lokal IP eller `ngrok` for mobile enheter.

2. **Hva du skal verifisere**
   - **Header**: Transparent ved topp, solid etter scroll. Ingen blink i border.
   - **Navigasjon**: Sentraliserte lenker på desktop; mobilmeny har overlay og lukker på lenkeklikk eller overlay-trykk.
   - **Hero**: Bildeoverganger hvert 6.5s (pause ved hover). Fallback-SVG hvis bildefeil.
   - **Animasjoner**: Reveal/Typewriter må være jevne. Sjekk `prefers-reduced-motion` ved å aktivere OS-innstilling.
   - **Gallery**: Piler & miniatyr-knapper oppdaterer hovedbilde og tekst. Tastatur-navigasjon (Tab + Enter/Space) fungerer.
   - **Forms**: Fokusstil synlig, validering (required) fungerer. Mobilt tastatur riktig (`inputMode`).
   - **Kart**: Laster kun på kontaktsiden, full bredde, rulle ikke låst.
   - **ScrollToTop**: Ved rutenavigering scrolles siden mykt til toppen (unntatt hash-navigasjon).

3. **Fallbacks**
   - Bekreft at `BrandImage` viser svg-placeholder når du midlertidig endrer `src` til ugyldig URL.
   - Custom scrollbar: Edge/Safari bruker egen implementasjon; visuell degrad er akseptabel.

4. **Rapportering**
   - Oppdater tabellen over med “Bestått” / “Avvik” + dato.
   - Logg spesifikke bugs i prosjektets issue-tracker sammen med skjermdumper/video.

> Tips: Bruk BrowserStack eller responsiv modus i DevTools for rask verifisering dersom fysiske enheter ikke er tilgjengelig.
