"use client";

import { useState } from "react";
import {
  REVIEWED_SHORTLIST_PRICE_GBP,
  REVIEWED_SHORTLIST_PRIORITIES,
} from "@/lib/commercial";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

type Props = { shortlistedAreas: string[]; sourcePath: string };

export default function ReviewedShortlistForm({
  shortlistedAreas,
  sourcePath,
}: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const priorities = form.getAll("priorities").map(String);
    if (priorities.length < 1 || priorities.length > 5) {
      setStatus("error");
      setMessage("Choose between one and five priorities.");
      return;
    }
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/reviewed-shortlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          monthlyBudgetGbp: Number(form.get("monthlyBudgetGbp")),
          propertyType: form.get("propertyType"),
          workplace: form.get("workplace"),
          officePattern: form.get("officePattern"),
          commuteToleranceMinutes: Number(form.get("commuteToleranceMinutes")),
          household: form.get("household"),
          moveTiming: form.get("moveTiming"),
          priorities,
          dealbreakers: form.get("dealbreakers"),
          shortlistedAreas,
          sourcePath,
          website: form.get("website"),
        }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Request failed.");
      setStatus("sent");
      trackEvent(ANALYTICS_EVENTS.shortlistRequestSubmitted, {
        source: sourcePath,
        area_count: shortlistedAreas.length,
        price_gbp: REVIEWED_SHORTLIST_PRICE_GBP,
      });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Request failed.");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-xl border border-emerald-700/60 bg-emerald-950/30 p-6">
        <h2 className="text-xl font-semibold text-white">Request received</h2>
        <p className="mt-2 text-slate-300">
          You have not been charged. We will review the details and email you
          about availability and next steps before any payment is requested.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" htmlFor="email">
          <input id="email" name="email" type="email" required maxLength={254} className={inputClass} />
        </Field>
        <Field label="Monthly housing budget" htmlFor="monthlyBudgetGbp">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">£</span>
            <input id="monthlyBudgetGbp" name="monthlyBudgetGbp" type="number" min={300} max={20000} step={50} required className={inputClass} />
          </div>
        </Field>
        <Field label="Property type" htmlFor="propertyType">
          <select id="propertyType" name="propertyType" defaultValue="one-bed" className={inputClass}>
            <option value="room">Room in a share</option>
            <option value="one-bed">One-bed home</option>
            <option value="two-bed-plus">Two bedrooms or more</option>
          </select>
        </Field>
        <Field label="Household" htmlFor="household">
          <select id="household" name="household" defaultValue="solo" className={inputClass}>
            <option value="solo">Moving alone</option>
            <option value="couple">Couple</option>
            <option value="flatmates">Flatmates</option>
            <option value="family">Family</option>
          </select>
        </Field>
        <Field label="Workplace or regular destination" htmlFor="workplace" hint="An area or station is enough; do not enter a full address.">
          <input id="workplace" name="workplace" required minLength={2} maxLength={120} className={inputClass} />
        </Field>
        <Field label="Office pattern" htmlFor="officePattern">
          <select id="officePattern" name="officePattern" defaultValue="hybrid" className={inputClass}>
            <option value="mostly-remote">Mostly remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="mostly-office">Mostly in the office</option>
          </select>
        </Field>
        <Field label="Maximum one-way commute" htmlFor="commuteToleranceMinutes">
          <select id="commuteToleranceMinutes" name="commuteToleranceMinutes" defaultValue="45" className={inputClass}>
            {[30, 45, 60, 75, 90].map((minutes) => (
              <option key={minutes} value={minutes}>{minutes} minutes</option>
            ))}
          </select>
        </Field>
        <Field label="When do you expect to move?" htmlFor="moveTiming">
          <input id="moveTiming" name="moveTiming" maxLength={80} placeholder="For example, November or within 3 months" className={inputClass} />
        </Field>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-slate-200">Your priorities — choose up to five</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {REVIEWED_SHORTLIST_PRIORITIES.map((priority) => (
            <label key={priority} className="flex items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300">
              <input type="checkbox" name="priorities" value={priority} />
              {priority}
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Deal-breakers or important context" htmlFor="dealbreakers" hint="Avoid full addresses, financial account details or other sensitive information.">
        <textarea id="dealbreakers" name="dealbreakers" maxLength={1000} rows={5} className={inputClass} />
      </Field>

      <div className="absolute -left-[10000px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {shortlistedAreas.length > 0 && (
        <p className="rounded-md bg-slate-900 px-3 py-2 text-xs text-slate-400">
          Starting areas: {shortlistedAreas.map(prettyArea).join(", ")}.
        </p>
      )}

      <label className="flex items-start gap-2 text-sm text-slate-300">
        <input type="checkbox" required className="mt-1" />
        <span>
          I understand this submits a request only. It does not charge me or
          guarantee availability; payment would be agreed separately.
        </span>
      </label>

      {status === "error" && (
        <p role="alert" className="rounded-md border border-red-800 bg-red-950/30 px-3 py-2 text-sm text-red-200">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-500 disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request the £39 review"}
      </button>
    </form>
  );
}

const inputClass =
  "mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none";

function Field({ label, htmlFor, hint, children }: { label: string; htmlFor: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-medium text-slate-200">{label}</label>
      {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
      {children}
    </div>
  );
}

function prettyArea(area: string): string {
  return area.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
