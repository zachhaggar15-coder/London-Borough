"use client";

import { OPEN_COOKIE_SETTINGS_EVENT } from "@/components/CookieConsent";

/** Footer control that reopens the consent banner so a choice can be changed. */
export default function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))
      }
      className="transition-colors hover:text-white"
    >
      Cookie settings
    </button>
  );
}
