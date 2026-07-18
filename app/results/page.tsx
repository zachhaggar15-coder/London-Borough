import type { Metadata } from "next";
import Link from "next/link";
import SharedResultsClient from "@/components/SharedResultsClient";
import { SITE_URL } from "@/lib/seo-data";

type Props = {
  searchParams: Promise<{ state?: string }>;
};

export const metadata: Metadata = {
  title: "Shared Where in London results",
  description:
    "A shared Where in London recommendation shortlist based on commute, rent and lifestyle preferences.",
  alternates: { canonical: `${SITE_URL}/results` },
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

export default async function ResultsPage({ searchParams }: Props) {
  const { state } = await searchParams;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            Where in London
          </Link>
          <span>/</span>
          <span className="text-slate-200">Shared results</span>
        </div>
      </nav>
      <main className="mx-auto max-w-5xl px-6 py-12">
        <SharedResultsClient state={state ?? null} />
      </main>
    </div>
  );
}
