import type { LanguageCode } from "./i18n";
import type { ThemeType } from "./theme";

export type Preferences = {
  language?: LanguageCode;
  theme?: ThemeType;
  [key: string]: unknown;
};

export function savePreferences(preferences: Preferences): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const raw = window.localStorage?.getItem("ds-one:preferences");
    const existing = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
    const next = { ...existing, ...preferences };
    window.localStorage?.setItem("ds-one:preferences", JSON.stringify(next));
  } catch (error) {
    console.warn("ds-one: unable to persist preferences", error);
  }
}
