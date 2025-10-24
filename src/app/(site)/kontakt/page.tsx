import type { Metadata } from "next";
import KontaktView from "@/views/KontaktView";

export const metadata: Metadata = {
  title: "Kontakt oss",
  description:
    "Ta kontakt med Hellestad Maskin AS for maskinhandel, prosjekter eller samarbeid.",
};

export default function KontaktPage() {
  return <KontaktView />;
}
