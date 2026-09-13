export const REVIEWED_SHORTLIST_PRICE_GBP = 39;

export const REVIEWED_SHORTLIST_ENABLED =
  process.env.NEXT_PUBLIC_REVIEWED_SHORTLIST_ENABLED === "true";

export const REVIEWED_SHORTLIST_PRIORITIES = [
  "Commute reliability",
  "Rent value",
  "Green space",
  "Nightlife and social life",
  "Quiet streets",
  "Schools and family life",
  "Accessibility",
  "Pet-friendly housing",
] as const;

export type ReviewedShortlistRequest = {
  email: string;
  monthlyBudgetGbp: number;
  propertyType: "room" | "one-bed" | "two-bed-plus";
  workplace: string;
  officePattern: "mostly-remote" | "hybrid" | "mostly-office";
  commuteToleranceMinutes: number;
  household: "solo" | "couple" | "flatmates" | "family";
  moveTiming: string;
  priorities: string[];
  dealbreakers: string;
  shortlistedAreas: string[];
  sourcePath: string;
  website: string;
};

export function parseReviewedShortlistRequest(
  value: unknown,
): ReviewedShortlistRequest | null {
  if (!value || typeof value !== "object") return null;
  const input = value as Partial<ReviewedShortlistRequest>;
  const propertyTypes = new Set(["room", "one-bed", "two-bed-plus"]);
  const officePatterns = new Set(["mostly-remote", "hybrid", "mostly-office"]);
  const households = new Set(["solo", "couple", "flatmates", "family"]);
  const allowedPriorities = new Set<string>(REVIEWED_SHORTLIST_PRIORITIES);

  if (
    typeof input.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email) ||
    input.email.length > 254 ||
    typeof input.monthlyBudgetGbp !== "number" ||
    input.monthlyBudgetGbp < 300 ||
    input.monthlyBudgetGbp > 20_000 ||
    !propertyTypes.has(input.propertyType ?? "") ||
    typeof input.workplace !== "string" ||
    input.workplace.trim().length < 2 ||
    input.workplace.length > 120 ||
    !officePatterns.has(input.officePattern ?? "") ||
    typeof input.commuteToleranceMinutes !== "number" ||
    input.commuteToleranceMinutes < 15 ||
    input.commuteToleranceMinutes > 120 ||
    !households.has(input.household ?? "") ||
    typeof input.moveTiming !== "string" ||
    input.moveTiming.length > 80 ||
    typeof input.dealbreakers !== "string" ||
    input.dealbreakers.length > 1_000 ||
    typeof input.sourcePath !== "string" ||
    input.sourcePath.length > 200 ||
    typeof input.website !== "string" ||
    input.website.length > 0 ||
    !Array.isArray(input.priorities) ||
    input.priorities.length < 1 ||
    input.priorities.length > 5 ||
    !input.priorities.every(
      (priority) => typeof priority === "string" && allowedPriorities.has(priority),
    ) ||
    !Array.isArray(input.shortlistedAreas) ||
    input.shortlistedAreas.length > 4 ||
    !input.shortlistedAreas.every(
      (area) => typeof area === "string" && /^[a-z0-9-]{1,60}$/.test(area),
    )
  ) {
    return null;
  }

  return {
    email: input.email.trim().toLowerCase(),
    monthlyBudgetGbp: Math.round(input.monthlyBudgetGbp),
    propertyType: input.propertyType as ReviewedShortlistRequest["propertyType"],
    workplace: input.workplace.trim(),
    officePattern: input.officePattern as ReviewedShortlistRequest["officePattern"],
    commuteToleranceMinutes: Math.round(input.commuteToleranceMinutes),
    household: input.household as ReviewedShortlistRequest["household"],
    moveTiming: input.moveTiming.trim(),
    priorities: [...new Set(input.priorities)],
    dealbreakers: input.dealbreakers.trim(),
    shortlistedAreas: [...new Set(input.shortlistedAreas)],
    sourcePath: input.sourcePath.startsWith("/") ? input.sourcePath : "/",
    website: "",
  };
}
