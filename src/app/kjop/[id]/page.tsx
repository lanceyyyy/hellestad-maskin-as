import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MachineDetailView from "@/views/MachineDetailView";
import { fetchAdDetail, fetchAllAdIds } from "@/lib/finn-api";
import { mapFinnAdToMachine } from "@/lib/finn-mapper";

// Revalidate every 5 minutes
export const revalidate = 300;

// Allow dynamic params not generated at build time
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const ids = await fetchAllAdIds();
    return ids.map((id) => ({ id }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const finnAd = await fetchAdDetail(params.id);

    if (!finnAd) {
      return {
        title: "Maskin ikke funnet",
      };
    }

    return {
      title: `${finnAd.title} | Maskiner til salgs`,
      description: `Detaljer om ${finnAd.title} hos Hellestad Maskin AS.`,
    };
  } catch (error) {
    console.error("Error in generateMetadata:", error);
    return {
      title: "Maskin ikke funnet",
    };
  }
}

export default async function MachineDetailPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    // Fetch ad details from FINN.no API
    const finnAd = await fetchAdDetail(params.id);

    if (!finnAd) {
      notFound();
    }

    // Map FINN.no data to MachineDetail format
    const machine = mapFinnAdToMachine(finnAd);

    return <MachineDetailView machine={machine} finnData={finnAd} />;
  } catch (error) {
    console.error("Error in MachineDetailPage:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    notFound();
  }
}
