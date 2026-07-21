export type MonetisationSlot =
  | "rentalSearch"
  | "broadband"
  | "removals"
  | "utilities";

export type MonetisationProvider = {
  id: string;
  name: string;
  slots: MonetisationSlot[];
  active: boolean;
  disclosure: string;
  href?: string;
};

export const GOOGLE_ADSENSE_CLIENT_ID = "ca-pub-7917111630766281";
export const GOOGLE_ADSENSE_SCRIPT_URL =
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_ADSENSE_CLIENT_ID}`;

export const MONETISATION_PROVIDERS: MonetisationProvider[] = [
  {
    id: "rental-search",
    name: "Rental search provider",
    slots: ["rentalSearch"],
    active: false,
    disclosure: "Provider not configured.",
  },
  {
    id: "broadband",
    name: "Broadband setup provider",
    slots: ["broadband"],
    active: false,
    disclosure: "Provider not configured.",
  },
  {
    id: "removals",
    name: "Removals or moving quote provider",
    slots: ["removals"],
    active: false,
    disclosure: "Provider not configured.",
  },
  {
    id: "utilities",
    name: "Utilities setup provider",
    slots: ["utilities"],
    active: false,
    disclosure: "Provider not configured.",
  },
];

export function activeProvidersForSlot(
  slot: MonetisationSlot,
): MonetisationProvider[] {
  return MONETISATION_PROVIDERS.filter(
    (provider) => provider.active && provider.slots.includes(slot),
  );
}
