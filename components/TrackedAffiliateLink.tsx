"use client";

import { type ReactNode } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

type TrackedAffiliateLinkProps = {
  href: string;
  asin: string;
  location: string;
  productLabel: string;
  className?: string;
  children: ReactNode;
};

export default function TrackedAffiliateLink({
  href,
  asin,
  location,
  productLabel,
  className,
  children,
}: TrackedAffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className={className}
      onClick={() =>
        trackEvent(ANALYTICS_EVENTS.affiliateCtaClicked, {
          asin,
          location,
          product: productLabel,
        })
      }
    >
      {children}
    </a>
  );
}
