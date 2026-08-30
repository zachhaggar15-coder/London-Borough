import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo-data";
import {
  CONTACT_EMAIL,
  POLICY_LAST_UPDATED,
  SITE_NAME,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy policy & cookies",
  description:
    "How Where in London handles your data: what is and is not collected, the advertising and analytics cookies used, your UK GDPR rights, and how to withdraw consent.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: {
    title: "Privacy policy & cookies | Where in London",
    description:
      "What data Where in London collects, the cookies it uses, and how to control them.",
    url: `${SITE_URL}/privacy`,
    type: "article",
  },
};

const extLink =
  "text-emerald-400 hover:text-emerald-300 underline underline-offset-2";

export default function PrivacyPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Privacy policy",
        item: `${SITE_URL}/privacy`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <nav className="border-b border-slate-800 px-6 py-4">
          <div className="mx-auto max-w-5xl flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              {SITE_NAME}
            </Link>
            <span>/</span>
            <span className="text-slate-200">Privacy policy</span>
          </div>
        </nav>

        <main className="mx-auto max-w-3xl px-6 py-12">
          <header className="mb-10">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">
              Privacy policy &amp; cookies
            </h1>
            <p className="text-lg text-slate-300">
              This policy explains what {SITE_NAME} collects when you use the
              site, what it does not, which third parties are involved, and how
              to control all of it.
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Last updated{" "}
              <time dateTime={POLICY_LAST_UPDATED}>{POLICY_LAST_UPDATED}</time>
            </p>
          </header>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">Who is responsible</h2>
            <p className="text-slate-300">
              {SITE_NAME} is an independent website operated by a sole
              individual based in the United Kingdom, acting as the data
              controller for the purposes of UK GDPR and the Data Protection Act
              2018. For any privacy question or request, contact{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className={extLink}>
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">
              The short version
            </h2>
            <ul className="space-y-2 text-slate-300 list-disc pl-5">
              <li>There are no user accounts, and you are never asked to register.</li>
              <li>
                Nothing you type into the neighbourhood finder is sent to or
                stored on a server tied to you.
              </li>
              <li>
                Your shortlist is saved in your own browser, not in a database.
              </li>
              <li>
                Advertising cookies are only set if you accept them, and you can
                change your mind at any time.
              </li>
              <li>Your data is never sold.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">
              What is stored on your device
            </h2>
            <div className="space-y-4 text-slate-300">
              <p>
                <strong className="text-slate-100">Your shortlist.</strong> When
                you save neighbourhoods, the list is written to your browser
                &rsquo;s local storage so it survives a refresh. It stays on your
                device, is never transmitted to this site, and clearing your
                browser data removes it.
              </p>
              <p>
                <strong className="text-slate-100">Your cookie choice.</strong>{" "}
                Your answer to the consent banner is stored locally so you are
                not asked on every page. This is strictly necessary to honour
                your preference and cannot be switched off.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">
              Advertising (Google AdSense)
            </h2>
            <div className="space-y-4 text-slate-300">
              <p>
                This site is funded by advertising served by Google. Google is an
                independent data controller for the advertising it delivers.
              </p>
              <p>
                <strong className="text-slate-100">
                  Advertising scripts and cookies load only after you accept
                  them.
                </strong>{" "}
                If you decline, or have not yet answered the banner, the Google
                advertising script is not loaded and no advertising cookies are
                set by it.
              </p>
              <p>
                If you accept, Google and its partners may use cookies and
                similar technologies to serve ads, measure their performance, and
                limit how often you see the same ad. Google&rsquo;s use of
                advertising cookies enables it and its partners to serve ads
                based on your visit to this and other sites. This may involve
                processing an online identifier and your approximate location
                derived from your IP address.
              </p>
              <p>
                You can opt out of personalised advertising at any time through{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className={extLink}
                >
                  Google Ads Settings
                </a>
                , and review how Google handles data from sites that use its
                services in{" "}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className={extLink}
                >
                  Google&rsquo;s partner-sites notice
                </a>{" "}
                and its{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className={extLink}
                >
                  privacy policy
                </a>
                . Broader industry opt-outs are available at{" "}
                <a
                  href="https://optout.aboutads.info/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className={extLink}
                >
                  aboutads.info
                </a>{" "}
                and{" "}
                <a
                  href="https://www.youronlinechoices.com/uk/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className={extLink}
                >
                  Your Online Choices
                </a>
                .
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">Analytics</h2>
            <p className="text-slate-300">
              The site uses Vercel Web Analytics to count page views and see
              which guides are useful. It is privacy-focused: it does not set
              cookies, does not use a persistent cross-site identifier, and does
              not track you across other websites. It reports aggregate figures
              such as page paths, referrers, country and device type. There is no
              Google Analytics on this site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">
              Hosting and server logs
            </h2>
            <div className="space-y-4 text-slate-300">
              <p>
                The site is hosted by Vercel Inc., which processes requests on
                its infrastructure and keeps standard operational logs. See the{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className={extLink}
                >
                  Vercel privacy policy
                </a>
                .
              </p>
              <p>
                A small number of interactive features call this site&rsquo;s own
                API. To stop those endpoints being abused, requests are
                rate-limited using a one-way SHA-256 hash of connection details
                such as IP address and browser user-agent. The hash is held in
                memory only, expires within minutes, is never written to a
                database, and cannot be reversed to identify you. The lawful
                basis is legitimate interests — keeping the service available.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">
              What is never collected
            </h2>
            <p className="text-slate-300">
              There is no account system, so no names, passwords or email
              addresses are collected by the site itself. The salary, commute and
              lifestyle inputs you enter into the neighbourhood finder are
              processed in your browser to produce your results and are not
              stored against you. If you use the contact form, it composes a
              message in your own email application — the form does not send
              anything to this site, and only what you actually choose to send
              reaches the inbox above.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">Legal bases</h2>
            <ul className="space-y-2 text-slate-300 list-disc pl-5">
              <li>
                <strong className="text-slate-100">Consent</strong> — advertising
                cookies and any non-essential storage. Withdrawable at any time.
              </li>
              <li>
                <strong className="text-slate-100">Legitimate interests</strong>{" "}
                — cookieless aggregate analytics, abuse prevention, and keeping
                the site secure and available.
              </li>
              <li>
                <strong className="text-slate-100">
                  Strictly necessary
                </strong>{" "}
                — remembering your cookie choice.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">
              Changing or withdrawing consent
            </h2>
            <p className="text-slate-300">
              Use the <strong className="text-slate-100">Cookie settings</strong>{" "}
              link in the footer of any page to reopen the banner and change your
              answer. Declining stops the advertising script loading on
              subsequent pages. To remove cookies already set by Google, clear
              cookies for this site in your browser settings, and use the Google
              opt-out links above.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">Your rights</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                Under UK GDPR you have the right to access, rectification,
                erasure, restriction, objection, and data portability, and the
                right to withdraw consent at any time. Because the site holds no
                account and no identifiable records about visitors, most requests
                can be answered simply by explaining what is described here.
              </p>
              <p>
                To make a request, email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className={extLink}>
                  {CONTACT_EMAIL}
                </a>
                . If you are unhappy with the response, you can complain to the{" "}
                <a
                  href="https://ico.org.uk/make-a-complaint/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className={extLink}
                >
                  Information Commissioner&rsquo;s Office
                </a>
                , the UK supervisory authority.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">
              International transfers
            </h2>
            <p className="text-slate-300">
              Google and Vercel are US-headquartered and may process data outside
              the UK. Both rely on recognised safeguards for such transfers,
              including the UK extension to the EU-US Data Privacy Framework
              and/or standard contractual clauses.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">Children</h2>
            <p className="text-slate-300">
              This site is aimed at adults looking for somewhere to live and is
              not directed at children. No personal data is knowingly collected
              from anyone under 13.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold">
              Changes to this policy
            </h2>
            <p className="text-slate-300">
              If this policy changes materially, the date at the top will be
              updated and the consent banner will be shown again where the change
              affects what you previously agreed to.
            </p>
          </section>

          <section className="rounded-xl border border-slate-700 bg-slate-900 p-8">
            <h2 className="mb-2 text-xl font-semibold">Questions</h2>
            <p className="mb-6 text-slate-300">
              Anything here unclear, or want to make a data-protection request?
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-emerald-500"
              >
                Contact page
              </Link>
              <Link
                href="/terms"
                className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm text-slate-300 transition-colors hover:text-white"
              >
                Terms of use
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
