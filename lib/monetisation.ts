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
export const AMAZON_LINK_ID = "e52bf7af8a9a046c0c577e25c1ff7df2";
export const AMAZON_SHORT_URL = "https://amzn.to/3RqSy4O";
export const AMAZON_REF = "as_li_ss_tl";
export const AMAZON_DISCLOSURE =
  "As an Amazon Associate I earn from qualifying purchases.";
export const GOOGLE_ADSENSE_CLIENT_ID = "ca-pub-7917111630766281";
export const GOOGLE_ADSENSE_SCRIPT_URL =
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_ADSENSE_CLIENT_ID}`;

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

/**
 * Tagged Amazon UK search link.
 *
 * Used for product categories that do not yet have a confirmed ASIN. Search
 * links carry the associate tag and never 404, so they are safe to ship. Swap
 * them for `amazonUkProductUrl(asin)` once a specific product is chosen.
 */
export function amazonUkSearchUrl(query: string): string {
  const params = new URLSearchParams({
    k: query,
    linkCode: AMAZON_LINK_CODE,
    tag: AMAZON_ASSOCIATE_TAG,
    ref_: AMAZON_REF,
  });

  return `https://www.amazon.co.uk/s?${params.toString()}`;
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
