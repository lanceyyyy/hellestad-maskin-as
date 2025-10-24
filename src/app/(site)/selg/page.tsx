import type { Metadata } from "next";
import SelgView from "@/views/SelgView";

export const metadata: Metadata = {
  title: "Selg maskiner",
  description:
    "Send oss informasjon om maskinen du \u00F8nsker \u00E5 selge, s\u00E5 hjelper vi deg videre.",
};

export default function SelgPage() {
  return <SelgView />;
}
