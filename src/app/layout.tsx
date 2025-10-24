import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://www.hellestadmaskin.no";
const ogImage = "/og-image.svg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hellestad Maskin AS | Maskiner for kjøp og salg",
    template: "%s | Hellestad Maskin AS",
  },
  description:
    "Hellestad Maskin AS leverer kvalitetssikrede maskiner for kjøp, salg og prosjekter. Moderne maskinpark, erfarne fagfolk og personlig oppfølging.",
  keywords: [
    "anleggsmaskiner",
    "maskinhandel",
    "gravemaskin",
    "Hellestad Maskin",
    "maskinpark",
    "entreprenør",
    "anlegg",
  ],
  openGraph: {
    title: "Hellestad Maskin AS",
    description:
      "Moderne maskinleverandør med fokus på kvalitet, sikkerhet og personlig service.",
    url: siteUrl,
    siteName: "Hellestad Maskin AS",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Hellestad Maskin AS",
      },
    ],
    locale: "nb_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hellestad Maskin AS",
    description:
      "Moderne maskinleverandør med fokus på kvalitet, sikkerhet og personlig service.",
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" className={`${inter.variable} ${outfit.variable} light`} suppressHydrationWarning>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
