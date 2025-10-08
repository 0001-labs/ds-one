import type { LanguageCode } from "./language";
import { getNotionText, setNotionText } from "./language";

/**
 * Legacy helper that mimics the behaviour of the old Notion bridge.
 * It first tries to read an entry from the in-memory Notion cache and
 * falls back to the provided default value when nothing is available.
 */
export async function getText(
  key: string,
  language: LanguageCode,
  defaultValue = ""
): Promise<string> {
  if (!key) {
    return defaultValue;
  }

  const text = await getNotionText(key, language);
  if (text) {
    return text;
  }

  return defaultValue;
}

/**
 * Allows seeding the in-memory Notion cache from outside of the design system.
 */
export function registerNotionText(
  key: string,
  value: string,
  language: LanguageCode
): void {
  setNotionText(key, value, language);
}
