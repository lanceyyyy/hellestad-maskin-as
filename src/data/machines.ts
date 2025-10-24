export type MachineSpecification = {
  modelYear: string;
  ceCertified: string;
  workingHours: string;
  weight: string;
  cabinType: string;
  undercarriage: string;
  additionalHydraulics: string;
  conformityDeclaration: string;
  maintenanceAgreement: string;
};

export type MachineDealer = {
  name: string;
  contact: string;
  phone: string;
};

export type MachineDetail = {
  title: string;
  year: number;
  price: string;
  priceExVat: string;
  location: string;
  image: string;
  description: string;
  specifications: MachineSpecification;
  dealer: MachineDealer;
};

export const MACHINE_DETAILS: Record<string, MachineDetail> = {
  "cat-d6r-lgp": {
    title: "Cat D6R LGP",
    year: 2005,
    price: "590 000 kr",
    priceExVat: "590 000 kr",
    location: "Flateby",
    image: "/1.jpg",
    description: [
      "Cat D6G LPG selges.",
      "",
      "Ripper.",
      "",
      "Bra understell.",
      "",
      "Ny turbo.",
    ].join("\n"),
    specifications: {
      modelYear: "2005",
      ceCertified: "Ja",
      workingHours: "16 000",
      weight: "22 500 kg",
      cabinType: "Lukket",
      undercarriage: "Fastspent ramme",
      additionalHydraulics: "Nei",
      conformityDeclaration: "Ja",
      maintenanceAgreement: "Nei",
    },
    dealer: {
      name: "Hellestad Maskin AS",
      contact: "Odd Arne Hellestad",
      phone: "97 65 02 23",
    },
  },
};

export function getMachineById(id: string) {
  return MACHINE_DETAILS[id];
}

// Note: FINN.no integration functions are in src/lib/finn-api.ts
// This file is kept for type definitions and backward compatibility
