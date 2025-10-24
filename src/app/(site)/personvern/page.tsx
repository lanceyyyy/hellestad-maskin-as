import type { Metadata } from "next";
import PersonvernView from "@/views/PersonvernView";

export const metadata: Metadata = {
  title: "Personvern",
  description:
    "Les hvordan Hellestad Maskin AS h\u00E5ndterer personopplysninger og ivaretar ditt personvern.",
};

export default function PersonvernPage() {
  return <PersonvernView />;
}
