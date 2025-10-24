import KjopView from "@/views/KjopView";
import { fetchMachineryCards } from "@/lib/finn-api";

// Revalidate every 5 minutes
export const revalidate = 300;

export const metadata = {
  title: "Kjøp maskiner",
  description: "Bla gjennom vårt utvalg av anleggsmaskiner til salgs",
};

export default async function KjopPage() {
  // Fetch machinery cards from FINN.no
  const cards = await fetchMachineryCards();

  return <KjopView machines={cards} />;
}
