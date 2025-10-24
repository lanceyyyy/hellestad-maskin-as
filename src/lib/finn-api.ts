/**
 * FINN.no API Client
 *
 * Server-side only client for fetching machinery ads from FINN.no
 * Uses Next.js fetch with proper caching strategies
 */

import { XMLParser } from "fast-xml-parser";

const API_ROOT = "https://cache.api.finn.no/iad";
const MARKET_URL = `${API_ROOT}/search/construction`;
const API_KEY = process.env.FINN_API_KEY || "b53924df-a2b1-4261-978d-1f41d739ed17";
const ORG_ID = process.env.FINN_ORG_ID || "1118319976";
const UA = "HellestadMaskin/1.0 (+https://hellestadmaskin.no)";

// XML parser configuration
const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  preserveOrder: false,
  trimValues: true,
});

// ========== Types ==========

export type FinnCard = {
  id: string;
  title: string;
  publicUrl: string;
  image?: string; // Main image from search feed
  images?: string[]; // All images from search feed
};

export type FinnAdDetail = {
  id: string;
  title: string;
  publicUrl: string;
  brand: string | null;
  model: string | null;
  year: string | null;
  hours: string | null;
  price: string | null;
  location: string | null;
  mainImage: string | null;
  images: string[];
  attributes: Record<string, any>;
};

// ========== HTTP Helper ==========

async function httpGet(url: string, params: Record<string, any> = {}, cacheOptions?: RequestInit["cache"]) {
  const urlObj = new URL(url);
  Object.entries(params).forEach(([k, v]) => {
    if (v != null) urlObj.searchParams.set(k, String(v));
  });

  const response = await fetch(urlObj, {
    headers: {
      "x-FINN-apikey": API_KEY,
      "User-Agent": UA,
    },
    cache: cacheOptions || "force-cache",
    next: cacheOptions === undefined ? { revalidate: 300 } : undefined, // 5 min revalidation by default
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status} ${response.statusText} for ${urlObj}\n${text.slice(0, 500)}`);
  }

  return response.text();
}

// ========== XML Parsing Helpers ==========

type FeedEntry = {
  id?: string;
  "atom:id"?: string;
  title?: string;
  "atom:title"?: string;
  link?: any;
  "atom:link"?: any;
};

function normalizeLinks(linkNode: any) {
  let arr = Array.isArray(linkNode) ? linkNode : linkNode ? [linkNode] : [];
  return arr
    .map((l) => (typeof l === "object" ? l : {}))
    .map((l) => ({
      rel: l["@_rel"] || null,
      href: l["@_href"] || null,
      type: l["@_type"] || null,
    }))
    .filter((l) => l.href);
}

const ID_FROM_TAG_RE = /:(?:ad:|id:)(\d+)$/;
const ID_FROM_URL_RE = /\/(\d{6,})$/;

function extractCoreFromFeedEntry(entry: FeedEntry): FinnCard | null {
  const title = entry.title || entry["atom:title"] || null;
  const links = normalizeLinks(entry.link || entry["atom:link"]);
  const publicLink = (links.find((l) => l.rel === "alternate") || links[0] || {}).href || null;

  let adId: string | null = null;
  const idStr = entry.id || entry["atom:id"];
  if (typeof idStr === "string") {
    const m = idStr.match(ID_FROM_TAG_RE);
    if (m) adId = m[1];
  }
  if (!adId && publicLink) {
    const m2 = publicLink.match(ID_FROM_URL_RE);
    if (m2) adId = m2[1];
  }

  if (!adId || !title) return null;

  // Extract images using the collectImages function
  const images = collectImages(entry);

  return {
    id: adId,
    title,
    publicUrl: publicLink || `https://www.finn.no/${adId}`,
    image: images[0] || undefined,
    images: images.length > 0 ? images : undefined,
  };
}

function parseSearchFeed(xmlText: string): FinnCard[] {
  const doc = xmlParser.parse(xmlText);
  const feed = doc.feed || doc["atom:feed"] || {};
  let entries = feed.entry || feed["atom:entry"] || [];
  if (!Array.isArray(entries)) entries = [entries].filter(Boolean);

  // Log raw entry structure for debugging (first entry only)
  if (entries.length > 0) {
    console.log("=== FINN.no Search Feed Entry Structure ===");
    console.log(JSON.stringify(entries[0], null, 2));
    console.log("===========================================");
  }

  const cards = entries
    .map(extractCoreFromFeedEntry)
    .filter((card: FinnCard | null): card is FinnCard => card !== null);

  // Log parsed cards
  console.log(`=== Parsed ${cards.length} FINN.no Cards ===`);
  if (cards.length > 0) {
    console.log("Sample card:", JSON.stringify(cards[0], null, 2));
  }
  console.log("===========================================");

  return cards;
}

function collectImages(entry: any): string[] {
  const images: string[] = [];

  // Method 1: Extract from media:content (primary method for FINN.no)
  const mediaContent = entry["media:content"];
  if (mediaContent) {
    if (Array.isArray(mediaContent)) {
      const mediaImages = mediaContent.map((m: any) => m["@_url"]).filter(Boolean);
      images.push(...mediaImages);
      console.log(`📸 Found ${mediaImages.length} images from media:content (array)`);
    } else if (mediaContent["@_url"]) {
      images.push(mediaContent["@_url"]);
      console.log(`📸 Found 1 image from media:content: ${mediaContent["@_url"].substring(0, 60)}...`);
    }
  }

  // Method 2: Extract from links (enclosure/image) - fallback
  const links = normalizeLinks(entry.link || entry["atom:link"]);
  const linkImages = links
    .filter((l) => l.rel === "enclosure" || l.rel === "image")
    .map((l) => l.href);
  if (linkImages.length > 0) {
    console.log(`📸 Found ${linkImages.length} images from links`);
  }
  images.push(...linkImages);

  // Remove duplicates
  const uniqueImages = Array.from(new Set(images));
  console.log(`📸 Total unique images: ${uniqueImages.length}`);
  return uniqueImages;
}

function collectAttributes(entry: any): Record<string, any> {
  const out: Record<string, any> = {};

  // Check for finn:adata structure (used in detail endpoint)
  const adata = entry["finn:adata"];
  if (adata && typeof adata === "object") {
    let fields = adata["finn:field"];
    if (fields) {
      if (!Array.isArray(fields)) fields = [fields];

      for (const field of fields) {
        if (!field || typeof field !== "object") continue;
        const name = field["@_name"];
        const value = field["@_value"] || field["#text"];
        if (name && value != null) {
          out[name] = value;
        }
      }
    }
  }

  // Also check for older attribute structure
  const keys = Object.keys(entry).filter(
    (k) =>
      k === "f:attributes" ||
      k === "finn:attributes" ||
      k === "attributes" ||
      k.endsWith(":attributes")
  );

  for (const key of keys) {
    const bucket = entry[key];
    if (!bucket || typeof bucket !== "object") continue;

    let items = bucket["f:attribute"] || bucket["finn:attribute"] || bucket["attribute"];
    if (!items) continue;
    if (!Array.isArray(items)) items = [items];

    for (const a of items) {
      if (!a || typeof a !== "object") continue;
      const name = a["@_name"] || a.name;
      const val =
        a["f:display-value"] ||
        a["f:value"] ||
        a["f:raw-value"] ||
        a["finn:display-value"] ||
        a["finn:value"] ||
        a["finn:raw-value"] ||
        null;
      if (name && val != null) out[name] = val;
    }
  }

  return out;
}

function parseAdEntry(xmlText: string): FinnAdDetail | null {
  const doc = xmlParser.parse(xmlText);
  const entry = doc["atom:entry"] || doc.entry || (doc.feed && doc.feed.entry) || {};

  // Log raw entry structure for debugging
  console.log("=== FINN.no Ad Detail Entry Structure ===");
  console.log(JSON.stringify(entry, null, 2));
  console.log("=========================================");

  const title = entry["atom:title"] || entry.title || null;
  if (!title) return null;

  const images = collectImages(entry);
  const attrs = collectAttributes(entry);

  // Log collected attributes
  console.log("=== Collected Attributes ===");
  console.log(JSON.stringify(attrs, null, 2));
  console.log("============================");

  // Extract ID from entry
  const idStr = entry["atom:id"] || entry.id;
  let adId: string | null = null;
  if (typeof idStr === "string") {
    const m = idStr.match(ID_FROM_TAG_RE);
    if (m) adId = m[1];
  }

  if (!adId) return null;

  // Extract price from finn:adata.finn:price structure
  let price: string | null = null;
  const adata = entry["finn:adata"];
  if (adata && adata["finn:price"]) {
    const priceArray = Array.isArray(adata["finn:price"]) ? adata["finn:price"] : [adata["finn:price"]];
    const mainPrice = priceArray.find((p: any) => p["@_name"] === "main");
    if (mainPrice && mainPrice["@_value"]) {
      price = mainPrice["@_value"];
    }
  }

  // Extract location from georss:point
  let location: string | null = null;
  const georss = entry["georss:point"];
  if (georss) {
    location = "Norge"; // Default for now, could parse coordinates later
  }

  const result = {
    id: adId,
    title,
    publicUrl: `https://www.finn.no/${adId}`,
    brand: attrs.make || attrs.brand || attrs.manufacturer || null,
    model: attrs.model || null,
    year: attrs.year || attrs.model_year || null,
    hours: attrs.hours_used || attrs.hours || attrs.operating_hours || null,
    price: price || attrs.price || attrs.price_total || null,
    location: location || attrs.location || attrs.municipality || null,
    mainImage: images[0] || null,
    images,
    attributes: attrs,
  };

  console.log("=== Parsed Ad Detail ===");
  console.log(JSON.stringify(result, null, 2));
  console.log("========================");

  return result;
}

// ========== Public API ==========

/**
 * Fetch all machinery cards for the organization
 * Uses ISR with 5 minute revalidation
 */
export async function fetchMachineryCards(): Promise<FinnCard[]> {
  try {
    console.log("=== Fetching FINN.no Machinery Cards ===");
    console.log(`URL: ${MARKET_URL}?orgId=${ORG_ID}&rows=1000&page=1`);

    const xmlText = await httpGet(MARKET_URL, {
      orgId: ORG_ID,
      rows: 1000,
      page: 1,
    });

    const cards = parseSearchFeed(xmlText);

    console.log(`✅ Successfully fetched ${cards.length} machinery cards`);
    console.log("========================================");

    return cards;
  } catch (error) {
    console.error("❌ Error fetching machinery cards:", error);
    return [];
  }
}

/**
 * Fetch detailed information for a specific ad
 * Uses ISR with 5 minute revalidation
 */
export async function fetchAdDetail(adId: string): Promise<FinnAdDetail | null> {
  try {
    console.log(`=== Fetching FINN.no Ad Detail: ${adId} ===`);
    console.log(`URL: ${API_ROOT}/ad/${adId}`);

    const xmlText = await httpGet(`${API_ROOT}/ad/${adId}`, {});

    console.log(`📦 Received XML response (length: ${xmlText.length})`);

    const ad = parseAdEntry(xmlText);

    if (ad) {
      console.log(`✅ Successfully fetched ad detail for: ${ad.title}`);
      console.log(`   - ID: ${ad.id}`);
      console.log(`   - Images: ${ad.images.length}`);
    } else {
      console.log(`⚠️ No ad data parsed for ID: ${adId}`);
      console.log(`📄 XML preview: ${xmlText.substring(0, 200)}...`);
    }
    console.log("========================================");

    return ad;
  } catch (error) {
    console.error(`❌ Error fetching ad ${adId}:`, error);
    if (error instanceof Error) {
      console.error(`   Message: ${error.message}`);
      console.error(`   Stack: ${error.stack}`);
    }
    return null;
  }
}

/**
 * Fetch all ad IDs for static generation
 */
export async function fetchAllAdIds(): Promise<string[]> {
  const cards = await fetchMachineryCards();
  return cards.map((card) => card.id);
}
