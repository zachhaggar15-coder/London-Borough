"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site-config";

const TOPICS = [
  { value: "correction", label: "A correction — something on the site is wrong" },
  { value: "area", label: "Suggest an area or destination to add" },
  { value: "feedback", label: "General feedback on the site" },
  { value: "data", label: "Question about the data or methodology" },
  { value: "privacy", label: "Privacy or data-protection request" },
  { value: "other", label: "Something else" },
] as const;

type Topic = (typeof TOPICS)[number]["value"];

const TOPIC_SUBJECTS: Record<Topic, string> = {
  correction: "Correction",
  area: "Area suggestion",
  feedback: "Site feedback",
  data: "Data / methodology question",
  privacy: "Privacy request",
  other: "Enquiry",
};

/**
 * Static-hosting-friendly contact form: composes a pre-filled email and hands
 * it to the visitor's own mail client. Nothing is transmitted to or stored on
 * this site, which keeps the privacy position simple (see /privacy).
 */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState<Topic>("correction");
  const [pageUrl, setPageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [opened, setOpened] = useState(false);

  const canSubmit = message.trim().length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const subject = `[Where in London] ${TOPIC_SUBJECTS[topic]}`;
    const bodyLines = [
      message.trim(),
      "",
      "---",
      name.trim() ? `From: ${name.trim()}` : null,
      pageUrl.trim() ? `Page: ${pageUrl.trim()}` : null,
      `Topic: ${TOPIC_SUBJECTS[topic]}`,
    ].filter(Boolean);

    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = href;
    setOpened(true);
  }

  const fieldClass =
    "w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="contact-topic"
          className="mb-1.5 block text-sm font-medium text-slate-200"
        >
          What is this about?
        </label>
        <select
          id="contact-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value as Topic)}
          className={fieldClass}
        >
          {TOPICS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-name"
          className="mb-1.5 block text-sm font-medium text-slate-200"
        >
          Your name{" "}
          <span className="font-normal text-slate-500">(optional)</span>
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          placeholder="So I know who I am replying to"
          className={fieldClass}
        />
      </div>

      <div>
        <label
          htmlFor="contact-page"
          className="mb-1.5 block text-sm font-medium text-slate-200"
        >
          Which page?{" "}
          <span className="font-normal text-slate-500">(optional)</span>
        </label>
        <input
          id="contact-page"
          type="text"
          value={pageUrl}
          onChange={(e) => setPageUrl(e.target.value)}
          placeholder="e.g. /neighbourhoods/brixton"
          className={fieldClass}
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium text-slate-200"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="The more specific the better — if a figure looks wrong, tell me what you think it should be and why."
          className={fieldClass}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
        >
          Open in your email app
        </button>
        <p className="text-xs text-slate-500">
          This opens your own email client — nothing is sent or stored by this
          site.
        </p>
      </div>

      {opened && (
        <p
          role="status"
          className="rounded-lg border border-emerald-800 bg-emerald-950/50 px-4 py-3 text-sm text-emerald-200"
        >
          Your email app should have opened with the message ready to send. If
          nothing happened, email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          directly.
        </p>
      )}
    </form>
  );
}
