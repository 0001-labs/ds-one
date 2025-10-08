import { signal } from "@lit-labs/signals";

// Define the supported languages using ISO codes
export type LanguageCode = "en-US" | "da-DK" | "ja-JP";

// Define the structure of our translation data
type TranslationData = {
  [key: string]: string;
};

// Import the JSON directly to ensure it's bundled
import translationKeys from "./keys.json";

// Cached translation data - initialize immediately with the imported data
const translationData = translationKeys as Record<
  LanguageCode,
  TranslationData
>;

type NotionCache = Map<string, string>;

const notionStore = new Map<LanguageCode, NotionCache>();
const defaultLanguage: LanguageCode = "en-US";

// Helper function to get browser language
export function getBrowserLanguage(): LanguageCode {
  if (typeof navigator === "undefined") {
    return defaultLanguage;
  }

  const browserLang = navigator.language;

  const supportedLanguages: Record<string, LanguageCode> = {
    da: "da-DK",
    ja: "ja-JP",
    en: "en-US",
  };

  for (const [prefix, langCode] of Object.entries(supportedLanguages)) {
    if (browserLang.startsWith(prefix)) {
      return langCode;
    }
  }

  return defaultLanguage;
}

// Get stored language from localStorage
const storedLanguage =
  typeof window !== "undefined"
    ? ((window.localStorage?.getItem(
        "ds-one:language"
      ) as LanguageCode | null) ?? undefined)
    : undefined;

// Create a reactive signal for the current language (Portfolio pattern)
export const currentLanguage = {
  value:
    (localStorage.getItem("language") as LanguageCode) || getBrowserLanguage(),
  set: function (lang: LanguageCode) {
    this.value = lang;
    localStorage.setItem("language", lang);
    window.dispatchEvent(
      new CustomEvent("language-changed", {
        detail: { language: lang },
        bubbles: true,
        composed: true,
      })
    );
  },
};

// Initialize translations on module load
// Use setTimeout to give other parts of the app time to set up event listeners first
setTimeout(() => {
  // Since we directly imported the data, just dispatch the events
  window.dispatchEvent(new CustomEvent("translations-loaded"));
  (window as any).notionDataLoaded = true;

  // Also dispatch language-changed with the current language
  const currentLang = currentLanguage.value;

  window.dispatchEvent(
    new CustomEvent("language-changed", {
      detail: { language: currentLang },
      bubbles: true,
      composed: true,
    })
  );
}, 100);

// Get translation by key
export function translate(key: string): string {
  const lang = currentLanguage.value;

  // Check if key exists in current language
  if (translationData?.[lang]?.[key]) {
    return translationData[lang][key];
  }

  // Try fallback to English
  if (lang !== defaultLanguage && translationData?.[defaultLanguage]?.[key]) {
    return translationData[defaultLanguage][key];
  }

  console.warn(`[translate] No translation found for key "${key}"`);
  return key;
}

// Get text - synchronous version for components
export function getText(key: string): string {
  return translate(key);
}

// Get text from translation data (async for compatibility)
export async function getNotionText(
  key: string,
  language: LanguageCode = currentLanguage.value
): Promise<string | null> {
  if (!key) {
    return null;
  }

  if (!translationData || !translationData[language]) {
    return null;
  }

  const text = translationData[language][key];
  if (text) {
    return text;
  }

  // Fallback to English
  if (language !== defaultLanguage && translationData[defaultLanguage]?.[key]) {
    return translationData[defaultLanguage][key];
  }

  return null;
}

// Store Notion text (for dynamic updates)
export function setNotionText(
  key: string,
  value: string,
  language: LanguageCode = currentLanguage.value
): void {
  if (!key) return;

  const bucket = getLanguageBucket(language);
  bucket.set(key, value);
}

function getLanguageBucket(language: LanguageCode): NotionCache {
  if (!notionStore.has(language)) {
    notionStore.set(language, new Map());
  }
  return notionStore.get(language)!;
}

// Get available languages
export function getAvailableLanguages(): Promise<LanguageCode[]> {
  if (translationData) {
    return Promise.resolve(Object.keys(translationData) as LanguageCode[]);
  }
  return Promise.resolve([defaultLanguage]);
}

// Load translations programmatically (for compatibility)
export function loadTranslations(
  language: LanguageCode,
  translations: TranslationData
): void {
  // Since we have static data, this is mainly for compatibility
  console.log(
    `Loading additional translations for ${language}:`,
    Object.keys(translations).length,
    "keys"
  );
}

// Set language (Portfolio pattern)
export function setLanguage(language: LanguageCode): void {
  // Update the language in localStorage first
  localStorage.setItem("language", language);

  // Then update the signal - this should trigger effects in components
  // that are subscribed to the signal
  currentLanguage.set(language);

  // Dispatch a custom event so non-signal-based components can update
  window.dispatchEvent(
    new CustomEvent("language-changed", {
      detail: { language },
      bubbles: true,
      composed: true,
    })
  );
}
