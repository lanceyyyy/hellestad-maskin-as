# Performance Report · HellestadMaskin.no

_Status: baseline review — automatiske målinger ikke kjørt i dette miljøet._

## Hvordan verifisere

1. **Prod-bygg**
   ```bash
   npm install
   npm run build
   npm run preview
   ```
2. **Lighthouse (Chrome DevTools eller CLI)**
   - Kjøre i mobilmodus (Moto G Power) og desktop.
   - Spesielt overvåk LCP (mål < 2,5s) og CLS (≈ 0).
3. **WebPageTest / PageSpeed Insights**
   - Test fra Oslo/Frankfurt.
   - Valider caching, server push og komprimering.
4. **React profiler**
   - Sjekk at overgangene (`PageTransition`, hero-slides) ikke genererer unødvendige renders.

## Optimaliseringer som allerede er ivaretatt

- Kritiske farger, typografi og animasjonsklasser er inline via Tailwind.
- `BrandImage` gir lazy-loading, skeleton og SVG-fallback.
- Interseksjonsobservatører kjører kun én gang (`triggerOnce`) og respekterer `prefers-reduced-motion`.
- Navigasjon og hero benytter transform/opacity for 60fps animasjoner.

## Tiltak å bekrefte under testing

- **Bildeoptimalisering**: konverter `public/hero*.jpg` til moderne formater (AVIF/WebP) dersom tilgjengelig, og angi `width/height`-attributter.
- **HTTP caching**: sett lang `Cache-Control` på statiske assets (Vite tilgjengeliggjør `dist`-hashing).
- **Critical CSS**: vurder å inline generert kritisk CSS for `Hero` + `Header` dersom first paint er avgjørende.
- **Third-party**: kart-iframe lastes kun på kontaktsiden; bruk `loading="lazy"` (allerede aktivt), men vurder `referrerpolicy` og eventuelt `iframe`-placeholder dersom FCP påvirkes.
- **Bundle-analyse**: kjør `npx vite-bundle-visualizer` for å sikre at shadcn/UI-bibliotek ikke drar inn unødvendige moduler.

## Måltall å logge etter kjøring

| Metric | Mål | Notat |
| --- | --- | --- |
| LCP (mobil) | ≤ 2.5 s | Hero-bilde + overskrift. Optimaliser ved å bruke `preload` på aktivt bakgrunnsbilde. |
| CLS | ≈ 0 | Sørg for dimensjoner på hero-container (`min-h`) og galleribilder. |
| TBT | ≤ 200 ms | Minimal JS, observer eventuelle tredjepartsbibliotek. |
| Speed Index | ≤ 3.0 s | Kontroller at `PageTransition` ikke forsinker initial paint. |

## Oppfølging

- Dokumenter reelle målinger og legg resultat-tabell i dette dokumentet (erstatt “Notat”).
- Ta skjermdumper av Lighthouse-sammendrag for mobil/desktop og lagre i `docs/perf/` hvis ønskelig.
- Sett opp automatisert regresjonstest (GitHub Action + `lhci`) hvis nettstedet skal driftes videre.
