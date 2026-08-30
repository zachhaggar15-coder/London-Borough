import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { SITE_URL } from "@/lib/seo-data";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact — corrections, feedback and data questions",
  description:
    "Get in touch with Where in London. Report a wrong rent figure or commute time, suggest an area to add, ask about the data, or make a privacy request.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact Where in London",
    description:
      "Report a correction, suggest an area, ask about the data, or make a privacy request.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: `${SITE_URL}/contact`,
      },
    ],
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${SITE_NAME}`,
    url: `${SITE_URL}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      email: CONTACT_EMAIL,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: CONTACT_EMAIL,
        availableLanguage: "English",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <nav className="border-b border-slate-800 px-6 py-4">
          <div className="mx-auto max-w-5xl flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              {SITE_NAME}
            </Link>
            <span>/</span>
            <span className="text-slate-200">Contact</span>
          </div>
        </nav>

        <main className="mx-auto max-w-3xl px-6 py-12">
          <header className="mb-10">
            <p className="mb-3 text-sm uppercase tracking-wide text-emerald-400">
              Get in touch
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight">Contact</h1>
            <p className="text-lg text-slate-300">
              {SITE_NAME} is run by one person, and the fastest way to improve it
              is people telling me what it gets wrong. Corrections are read and
              acted on.
            </p>
          </header>

          <section className="mb-10 rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="mb-1 text-sm text-slate-400">Email</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-lg font-medium text-emerald-400 transition-colors hover:text-emerald-300"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="mt-3 text-sm text-slate-400">
              I aim to reply within a few days. There is no phone line and no
              postal address — this is a small independent site, not a company.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-2 text-xl font-semibold">Send a message</h2>
            <p className="mb-6 text-sm text-slate-400">
              Fill this in and it will open a pre-written email in your own mail
              app, ready for you to review and send.
            </p>
            <ContactForm />
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold">
              Especially useful to hear about
            </h2>
            <ul className="space-y-3 text-slate-300 list-disc pl-5">
              <li>
                <strong className="text-slate-100">Rent figures</strong> that do
                not match what you are actually seeing advertised in an area.
              </li>
              <li>
                <strong className="text-slate-100">Commute times</strong> that
                are wrong, or routes that have changed since a line or station
                opened, closed or was renamed.
              </li>
              <li>
                <strong className="text-slate-100">Area descriptions</strong>{" "}
                that misrepresent a neighbourhood — especially if you live there.
              </li>
              <li>
                <strong className="text-slate-100">Missing areas</strong> you
                expected to find and did not.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">Privacy requests</h2>
            <p className="text-slate-300">
              To exercise any of your data-protection rights under UK GDPR, email
              the address above with &ldquo;Privacy request&rdquo; in the
              subject. The{" "}
              <Link
                href="/privacy"
                className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
              >
                privacy policy
              </Link>{" "}
              sets out what is and is not collected, and how to withdraw
              consent for advertising cookies.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">
              What I cannot help with
            </h2>
            <p className="text-slate-300">
              I cannot find you a flat, put you in touch with a landlord or
              agent, arrange viewings, or give financial, legal or immigration
              advice. This site is a research tool for narrowing down areas — the
              actual property search happens elsewhere.
            </p>
          </section>

          <section className="rounded-xl border border-slate-700 bg-slate-900 p-8 text-center">
            <h2 className="mb-2 text-xl font-semibold">
              Looking for how the data works?
            </h2>
            <p className="mb-6 text-slate-300">
              Most data questions are already answered in detail on the
              methodology page.
            </p>
            <Link
              href="/methodology"
              className="inline-block rounded-lg bg-emerald-600 px-6 py-3 font-medium transition-colors hover:bg-emerald-500"
            >
              Read the methodology →
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
