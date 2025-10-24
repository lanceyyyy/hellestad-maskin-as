# FINN.no API Integration

## Overview

This Next.js application integrates with FINN.no API to fetch and display machinery listings in real-time.

## Features

✅ **ISR (Incremental Static Regeneration)** - Pages revalidate every 5 minutes
✅ **Server-Side Rendering** - API calls happen on the server (no exposed API keys)
✅ **Static Generation** - Pre-renders all machinery detail pages at build time
✅ **Image Support** - Displays machinery images from FINN.no
✅ **Type Safety** - Full TypeScript support

## Console Logging

The integration includes comprehensive console logging to help you understand the API structure:

### On `/kjop` page load (Server-side):
```
=== Fetching FINN.no Machinery Cards ===
URL: https://cache.api.finn.no/iad/search/construction?orgId=1118319976&rows=1000&page=1

=== FINN.no Search Feed Entry Structure ===
{
  "id": "urn:finn:ad:426313439",
  "title": "Cat D6R LGP",
  "link": [
    { "@_rel": "alternate", "@_href": "https://www.finn.no/426313439" },
    { "@_rel": "enclosure", "@_href": "https://images.finn.no/..." }
  ],
  ...
}
===========================================

Sample card: {
  "id": "426313439",
  "title": "Cat D6R LGP",
  "publicUrl": "https://www.finn.no/426313439",
  "image": "https://images.finn.no/...",
  "images": ["https://images.finn.no/..."]
}

✅ Successfully fetched 5 machinery cards
========================================
```

### On `/kjop/[id]` page load (Server-side):
```
=== Fetching FINN.no Ad Detail: 426313439 ===
URL: https://cache.api.finn.no/iad/ad/426313439

=== FINN.no Ad Detail Entry Structure ===
{
  "atom:id": "urn:finn:ad:426313439",
  "atom:title": "Cat D6R LGP",
  "link": [...],
  "f:attributes": {
    "f:attribute": [
      { "@_name": "brand", "f:value": "CAT" },
      { "@_name": "model", "f:value": "D6R LGP" },
      { "@_name": "year", "f:value": "2005" },
      { "@_name": "price", "f:value": "590000" },
      ...
    ]
  }
}
=========================================

=== Collected Attributes ===
{
  "brand": "CAT",
  "model": "D6R LGP",
  "year": "2005",
  "price": "590000",
  "hours": "16000",
  "location": "Flateby",
  ...
}
============================

=== Parsed Ad Detail ===
{
  "id": "426313439",
  "title": "Cat D6R LGP",
  "brand": "CAT",
  "model": "D6R LGP",
  "year": "2005",
  "price": "590000",
  "mainImage": "https://images.finn.no/...",
  "images": ["https://images.finn.no/..."],
  ...
}
========================

✅ Successfully fetched ad detail for: Cat D6R LGP
========================================
```

## Where to Look for Console Logs

**In Development:**
- Open your **terminal** where `npm run dev` is running
- Logs appear when you navigate to `/kjop` or `/kjop/[id]`
- Server-side logs only (not in browser console)

**In Production:**
- Check your deployment platform's logs (Vercel, Netlify, etc.)
- Logs appear during build time and on-demand revalidation

## API Structure

### FinnCard (from search feed)
```typescript
{
  id: string;              // "426313439"
  title: string;           // "Cat D6R LGP"
  publicUrl: string;       // "https://www.finn.no/426313439"
  image?: string;          // First image URL
  images?: string[];       // All image URLs
}
```

### FinnAdDetail (from ad detail)
```typescript
{
  id: string;
  title: string;
  publicUrl: string;
  brand: string | null;           // "CAT"
  model: string | null;           // "D6R LGP"
  year: string | null;            // "2005"
  hours: string | null;           // "16000"
  price: string | null;           // "590000"
  location: string | null;        // "Flateby"
  mainImage: string | null;       // First image
  images: string[];               // All images
  attributes: Record<string, any>; // All FINN attributes
}
```

## Common Attribute Names

Based on FINN.no API, these are common attribute names you might find:

- `brand` / `manufacturer`
- `model`
- `year` / `model_year`
- `hours` / `operating_hours`
- `price` / `price_total`
- `location` / `municipality`
- `weight` / `total_weight`
- `ce_certified` / `ce_marking`
- `cabin_type` / `cab_type`
- `undercarriage` / `chassis`
- `description`

## Configuration

Edit `.env.local`:

```env
FINN_API_KEY=your-api-key-here
FINN_ORG_ID=your-org-id-here
```

## Caching Strategy

- **Search Results** (`/kjop`): Revalidates every 5 minutes
- **Ad Details** (`/kjop/[id]`): Static generation + 5 minute revalidation
- **Build Time**: All ads are pre-rendered
- **Runtime**: ISR updates pages as needed

## Troubleshooting

### No images showing?
- Check console logs for the image URLs
- Verify FINN.no is returning `rel="enclosure"` or `rel="image"` links
- Check if images are in the `link` array in the XML response

### API errors?
- Verify `FINN_API_KEY` is correct in `.env.local`
- Check console logs for error messages
- Ensure `FINN_ORG_ID` matches your organization

### Stale data?
- In dev: Hard refresh the page
- In production: Wait up to 5 minutes for revalidation
- Or trigger manual revalidation via Next.js API

## Files Modified

```
src/lib/
├── finn-api.ts          # API client with console logging
└── finn-mapper.ts       # Data mapping utilities

src/app/(site)/kjop/
├── page.tsx             # Listing page (fetches cards)
└── [id]/page.tsx        # Detail page (fetches ad detail)

src/views/
├── KjopView.tsx         # Listing view with image cards
└── MachineDetailView.tsx # Detail view
```
