/**
 * FINN.no Data Mapper
 *
 * Maps FINN.no API data to our internal MachineDetail format
 */

import type { FinnAdDetail, FinnCard } from "./finn-api";
import type { MachineDetail, MachineSpecification, MachineDealer } from "@/data/machines";

/**
 * Strip HTML tags and convert to plain text with spaces
 */
function stripHtml(html: string): string {
  if (!html) return "";

  return html
    // Convert <p> and <br> tags to spaces
    .replace(/<\/p>\s*<p>/g, " ")
    .replace(/<\/?p>/g, " ")
    .replace(/<br\s*\/?>/g, " ")
    // Remove any remaining HTML tags
    .replace(/<[^>]+>/g, "")
    // Decode common HTML entities
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // Clean up excessive whitespace - replace multiple spaces with single space
    .replace(/\s+/g, " ")
    .trim();
}

// Default dealer information
const DEFAULT_DEALER: MachineDealer = {
  name: "Hellestad Maskin AS",
  contact: "Odd Arne Hellestad",
  phone: "976 50 223",
};

/**
 * Map FINN.no ad to MachineDetail format
 */
export function mapFinnAdToMachine(ad: FinnAdDetail): MachineDetail {
  // Parse price
  const priceMatch = ad.price?.match(/[\d\s]+/);
  const priceValue = priceMatch ? priceMatch[0].replace(/\s/g, "") : "0";
  const formattedPrice = `${parseInt(priceValue).toLocaleString("no-NO")} kr`;

  // Parse year
  const yearMatch = ad.year?.match(/\d{4}/);
  const year = yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear();

  // Build specifications from FINN attributes
  const specifications: MachineSpecification = {
    modelYear: ad.year || ad.attributes.year || "Ukjent",
    ceCertified: ad.attributes.ce_marked === "true" ? "Ja" : ad.attributes.ce_marked === "false" ? "Nei" : "Ukjent",
    workingHours: ad.hours || ad.attributes.hours_used || ad.attributes.operating_hours || "Ukjent",
    weight: ad.attributes.weight || ad.attributes.total_weight || "Ukjent",
    cabinType: ad.attributes.cab || ad.attributes.cabin_type || ad.attributes.cab_type || "Ukjent",
    undercarriage: ad.attributes.chassis_variant || ad.attributes.undercarriage || ad.attributes.chassis || "Ukjent",
    additionalHydraulics: ad.attributes.additional_hydraulics === "true" ? "Ja" : ad.attributes.additional_hydraulics === "false" ? "Nei" : "Ukjent",
    conformityDeclaration: ad.attributes.statement_of_compliance || ad.attributes.conformity_declaration || "Ukjent",
    maintenanceAgreement: ad.attributes.service_contract || ad.attributes.maintenance_agreement || "Nei",
  };

  // Build description from attributes
  const descriptionParts: string[] = [];

  // Add the main description from FINN.no (strip HTML tags)
  if (ad.attributes.description) {
    const cleanDescription = stripHtml(ad.attributes.description);
    if (cleanDescription) {
      descriptionParts.push(cleanDescription);
    }
  }

  // Add basic info if description is missing
  if (descriptionParts.length === 0) {
    if (ad.brand && ad.model) {
      descriptionParts.push(`${ad.brand} ${ad.model}`);
    }
    if (ad.year) {
      descriptionParts.push(`Årsmodell: ${ad.year}`);
    }
    if (ad.hours) {
      descriptionParts.push(`Arbeidstimer: ${ad.hours}`);
    }
  }

  return {
    title: ad.title,
    year,
    price: formattedPrice,
    priceExVat: formattedPrice,
    location: ad.location || "Norge",
    image: ad.mainImage || "/placeholder.svg",
    description: descriptionParts.join("\n"),
    specifications,
    dealer: DEFAULT_DEALER,
  };
}

/**
 * Map FINN.no card to simplified machine info for listing page
 */
export function mapFinnCardToSimple(card: FinnCard) {
  return {
    id: card.id,
    title: card.title,
    publicUrl: card.publicUrl,
    slug: card.id, // Use FINN ID as slug
  };
}
