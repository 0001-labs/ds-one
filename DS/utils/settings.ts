import type { LanguageCode } from "./language";
import type { ThemeType } from "./theme";

export type Settings = {
  language?: LanguageCode;
  theme?: ThemeType;
  [key: string]: unknown;
};

export function saveSettings(settings: Settings): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const raw = window.localStorage?.getItem("ds-one:settings");
    const existing = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
    const next = { ...existing, ...settings };
    window.localStorage?.setItem("ds-one:settings", JSON.stringify(next));
  } catch (error) {
    console.warn("ds-one: unable to persist settings", error);
  }
}
