import { signal } from "@lit-labs/signals";

// Define the supported languages using ISO codes
export type LanguageCode = "en-US" | "da-DK" | "ja-JP";

// Define the structure of our translation data
type TranslationData = {
  [key: string]: string;
};

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

// Create a reactive signal for the current language
export const currentLanguage = signal<LanguageCode>(
  storedLanguage || getBrowserLanguage()
);

// Translation data - will be set from window or imported
let translationData: Record<LanguageCode, TranslationData> | null = null;

// Check if we can import translations (for bundled versions)
// In bundled contexts, translations might be directly imported
// In example contexts, they'll be loaded from window.DS_ONE_TRANSLATIONS
if (typeof window !== "undefined") {
  // Try to load from window immediately
  const checkWindow = () => {
    const windowTranslations = (window as any).DS_ONE_TRANSLATIONS;
    if (windowTranslations && typeof windowTranslations === "object") {
      translationData = windowTranslations as Record<
        LanguageCode,
        TranslationData
      >;
      console.log(
        "DS one: Loaded translations from window.DS_ONE_TRANSLATIONS"
      );

      // Mark as loaded
      if (!(window as any).notionDataLoaded) {
        window.dispatchEvent(new CustomEvent("translations-loaded"));
        (window as any).notionDataLoaded = true;
      }
    }
  };

  // Try immediate load
  checkWindow();

  // Listen for dynamic loading
  window.addEventListener("translations-ready", checkWindow);

  // Initialize translations with a slight delay to give components time to set up
  setTimeout(() => {
    checkWindow();

    // Dispatch language-changed with current language
    const currentLang = currentLanguage.get();
    window.dispatchEvent(
      new CustomEvent("language-changed", {
        detail: { language: currentLang },
        bubbles: true,
        composed: true,
      })
    );
  }, 100);
}

// Get translation by key
export function translate(key: string): string {
  const lang = currentLanguage.get();

  if (!translationData) {
    return key;
  }

  // Check if key exists in current language
  if (translationData[lang]?.[key]) {
    return translationData[lang][key];
  }

  // Try fallback to English
  if (lang !== defaultLanguage && translationData[defaultLanguage]?.[key]) {
    return translationData[defaultLanguage][key];
  }

  console.warn(`[translate] No translation found for key "${key}"`);
  return key;
}

// Get text - synchronous version for components
export function getText(key: string): string {
  return translate(key);
}

// Get text from Notion data (async for compatibility)
export async function getNotionText(
  key: string,
  language: LanguageCode = currentLanguage.get()
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
  language: LanguageCode = currentLanguage.get()
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

// Load translations programmatically
export function loadTranslations(
  language: LanguageCode,
  translations: TranslationData
): void {
  if (!translationData) {
    translationData = {} as Record<LanguageCode, TranslationData>;
  }

  const existing = translationData[language] ?? {};
  translationData[language] = { ...existing, ...translations };

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("translations-loaded", {
        detail: { language },
      })
    );
  }
}

// Set language
export function setLanguage(language: LanguageCode): void {
  if (language === currentLanguage.get()) {
    return;
  }

  currentLanguage.set(language);

  if (typeof window !== "undefined") {
    try {
      window.localStorage?.setItem("ds-one:language", language);
    } catch (error) {
      console.warn("ds-one: unable to persist language preference", error);
    }

    window.dispatchEvent(
      new CustomEvent("language-changed", {
        detail: { language },
        bubbles: true,
        composed: true,
      })
    );
  }
}
