# Hellestad Maskin AS

Official website for Hellestad Maskin AS – a professional machinery contractor specialising in construction and civil engineering projects.

## Tech Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** with custom design tokens
- **shadcn/ui** component primitives
- **TanStack Query** for resilient async requests
- **i18n**: Norwegian (default) + English translations

## Development

### Prerequisites

- Node.js 18+ and npm

### Setup

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start the production build locally
npm run start
```

### Path Aliases

- `@/` -> `./src/` (e.g. `import { Button } from "@/components/ui/button"`)

## Project Structure

```
src/
|-- app/              # Next.js routes, layouts, metadata
|-- components/       # Reusable UI, media, layout and animation helpers
|-- contexts/         # React contexts (language, consent, etc.)
|-- data/             # Static domain data (machine catalogue)
|-- hooks/            # Custom hooks (translations, intersection, media)
|-- lib/              # Utility helpers
|-- translations/     # i18n dictionaries (NO/EN)
`-- views/            # Page-level client components rendered by routes
```

## Features

- Transparent header with top bar + mobile drawer navigation
- Hero carousel with animated transitions and lazy image loading
- Reusable animation primitives (fade, slide, scale, text split, stagger)
- GDPR-compliant cookie consent controlling Google Maps embedding
- Machine detail pages with responsive galleries and placeholders
- Custom design system (single accent colour, typography scale, scrollbar)
- Accessibility support (focus rings, reduced motion, alt text, ARIA)

## Documentation

See `CLAUDE.md` for extended component and workflow guidelines.

## Deployment

Optimised for Vercel out of the box.

## License

(c) 2025 Hellestad Maskin AS. All rights reserved.
