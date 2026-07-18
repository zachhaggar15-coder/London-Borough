export type MonetisationSlot =
  | "renterEssentials"
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

export const AMAZON_ASSOCIATE_TAG = "amazonaff01d8-21";
export const AMAZON_LINK_CODE = "ll2";
export const AMAZON_LINK_ID = "33f39801ccfd3e1d63322455af2c9615";
export const AMAZON_REF = "as_li_ss_tl";
export const AMAZON_DISCLOSURE =
  "As an Amazon Associate I earn from qualifying purchases.";

export const MONETISATION_PROVIDERS: MonetisationProvider[] = [
  {
    id: "amazon-uk",
    name: "Amazon UK",
    slots: ["renterEssentials"],
    active: true,
    disclosure: AMAZON_DISCLOSURE,
    href: "https://www.amazon.co.uk",
  },
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

export function amazonUkProductUrl(asin: string): string {
  const params = new URLSearchParams({
    linkCode: AMAZON_LINK_CODE,
    tag: AMAZON_ASSOCIATE_TAG,
    linkId: AMAZON_LINK_ID,
    ref_: AMAZON_REF,
  });

  return `https://www.amazon.co.uk/dp/${asin}?${params.toString()}`;
}

export const AMAZON_STORE_URL = `https://www.amazon.co.uk?&linkCode=${AMAZON_LINK_CODE}&tag=${AMAZON_ASSOCIATE_TAG}&linkId=${AMAZON_LINK_ID}&ref_=${AMAZON_REF}`;
