// Define the supported languages using ISO codes (extensible)
export type LanguageCode = string;

// Define the structure of our translation data
type TranslationData = {
  [key: string]: string;
};

type TranslationMap = Record<string, TranslationData>;

// Import the JSON directly to ensure it's bundled
import translationKeys from "./keys.json";

// Primary language list – prioritise the 10 requested languages when cycling
const LANGUAGE_PRIORITY_ORDER = [
  "da",
  "nb",
  "sv",
  "pt",
  "es",
  "zh",
  "ko",
  "ja",
  "en",
  "de",
] as const;

const LANGUAGE_PRIORITY_LOOKUP = new Map<string, number>(
  LANGUAGE_PRIORITY_ORDER.map((code, index) => [code, index])
);

// Fallback language names if Intl.DisplayNames is not available
const FALLBACK_LANGUAGE_NAMES: Record<string, string> = {
  da: "Danish",
  "da-dk": "Danish",
  nb: "Norwegian",
  "nb-no": "Norwegian",
  sv: "Swedish",
  "sv-se": "Swedish",
  de: "German",
  "de-de": "German",
  en: "English",
  "en-us": "English",
  pt: "Portuguese",
  "pt-pt": "Portuguese",
  "pt-br": "Portuguese (Brazil)",
  es: "Spanish",
  "es-es": "Spanish",
  "es-mx": "Spanish (Mexico)",
  zh: "Chinese",
  "zh-hans": "Chinese (Simplified)",
  "zh-hant": "Chinese (Traditional)",
  ja: "Japanese",
  "ja-jp": "Japanese",
  ko: "Korean",
  "ko-kr": "Korean",
};

const DISPLAY_NAME_CACHE = new Map<string, Intl.DisplayNames>();
let displayNameFallbackWarningShown = false;

// Declare window property for external translations
declare global {
  interface Window {
    DS_ONE_TRANSLATIONS?: Record<string, TranslationData>;
    DS_ONE_TRANSLATIONS_FILE?: string;
  }
}

// Get translation data - prioritize external, fall back to bundled
function getTranslationData(): TranslationMap {
  // Check for externally loaded translations first (CDN usage)
  if (typeof window !== "undefined" && window.DS_ONE_TRANSLATIONS) {
    return window.DS_ONE_TRANSLATIONS;
  }

  // Fall back to bundled translations
  return translationKeys as TranslationMap;
}

// Cached translation data - use getter to always get fresh data
let translationData = getTranslationData();

type NotionCache = Map<string, string>;

const notionStore = new Map<LanguageCode, NotionCache>();
const defaultLanguage: LanguageCode = "en-US";

function extractPrimarySubtag(code: LanguageCode): string {
  if (!code) {
    return "";
  }
  return code.toLowerCase().split(/[-_]/)[0] ?? "";
}

function getLanguagePriority(code: LanguageCode): number {
  const primary = extractPrimarySubtag(code);
  const priority = LANGUAGE_PRIORITY_LOOKUP.get(primary);

  if (typeof priority === "number") {
    return priority;
  }

  return LANGUAGE_PRIORITY_ORDER.length;
}

function sortLanguageCodes(codes: LanguageCode[]): LanguageCode[] {
  return [...codes].sort((a, b) => {
    const priorityA = getLanguagePriority(a);
    const priorityB = getLanguagePriority(b);

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    return a.localeCompare(b);
  });
}

function getDisplayNameForLocale(
  locale: string,
  code: LanguageCode
): string | undefined {
  const normalizedLocale = locale?.replace("_", "-");
  if (!normalizedLocale) {
    return undefined;
  }

  try {
    let displayNames = DISPLAY_NAME_CACHE.get(normalizedLocale);

    if (!displayNames) {
      displayNames = new Intl.DisplayNames([normalizedLocale], {
        type: "language",
      });
      DISPLAY_NAME_CACHE.set(normalizedLocale, displayNames);
    }

    const cleanedCode = code.replace("_", "-");

    // Try full tag first
    const fullMatch = displayNames.of(cleanedCode);
    if (fullMatch && fullMatch !== cleanedCode) {
      return fullMatch;
    }

    // Then the primary subtag
    const baseMatch = displayNames.of(extractPrimarySubtag(cleanedCode));
    if (baseMatch) {
      return baseMatch;
    }
  } catch (error) {
    // Intl.DisplayNames may not be supported; fall back gracefully
    if (!displayNameFallbackWarningShown) {
      console.info(
        "[DS one] Intl.DisplayNames is not available, using fallback language names."
      );
      displayNameFallbackWarningShown = true;
    }
  }

  return undefined;
}

function getFallbackDisplayName(code: LanguageCode): string | undefined {
  const normalized = code.toLowerCase().replace("_", "-");
  const direct = FALLBACK_LANGUAGE_NAMES[normalized];

  if (direct) {
    return direct;
  }

  const primary = extractPrimarySubtag(normalized);
  return FALLBACK_LANGUAGE_NAMES[primary];
}

export function getLanguageDisplayName(
  code: LanguageCode,
  options: { locale?: string } = {}
): string {
  if (!code) {
    return "";
  }

  const localesToTry: string[] = [];

  if (options.locale) {
    localesToTry.push(options.locale);
  }

  if (typeof navigator !== "undefined") {
    if (Array.isArray(navigator.languages)) {
      localesToTry.push(...navigator.languages);
    }
    if (navigator.language) {
      localesToTry.push(navigator.language);
    }
  }

  localesToTry.push(defaultLanguage);
  localesToTry.push("en");

  const tried = new Set<string>();

  for (const locale of localesToTry) {
    if (!locale || tried.has(locale)) {
      continue;
    }
    tried.add(locale);

    const displayName = getDisplayNameForLocale(locale, code);
    if (displayName) {
      return displayName;
    }
  }

  const fallback = getFallbackDisplayName(code);
  if (fallback) {
    return fallback;
  }

  // Fall back to the primary subtag in uppercase
  const primary = extractPrimarySubtag(code);
  return primary ? primary.toUpperCase() : code;
}

const BROWSER_LANGUAGE_PREFERENCES: Record<string, LanguageCode> = {
  da: "da-DK",
  "da-dk": "da-DK",
  no: "nb-NO",
  nb: "nb-NO",
  "nb-no": "nb-NO",
  nn: "nn-NO",
  "nn-no": "nn-NO",
  sv: "sv-SE",
  "sv-se": "sv-SE",
  pt: "pt-PT",
  "pt-pt": "pt-PT",
  "pt-br": "pt-BR",
  es: "es-ES",
  "es-es": "es-ES",
  "es-mx": "es-MX",
  zh: "zh-Hans",
  "zh-cn": "zh-Hans",
  "zh-hans": "zh-Hans",
  "zh-tw": "zh-Hant",
  "zh-hant": "zh-Hant",
  ko: "ko-KR",
  "ko-kr": "ko-KR",
  ja: "ja-JP",
  "ja-jp": "ja-JP",
  en: "en-US",
  "en-us": "en-US",
  "en-gb": "en-GB",
  de: "de-DE",
  "de-de": "de-DE",
};

function resolvePreferredLanguage(languageTag: string): LanguageCode | null {
  if (!languageTag) {
    return null;
  }

  const normalized = languageTag.toLowerCase().replace("_", "-");

  const directMatch = BROWSER_LANGUAGE_PREFERENCES[normalized];
  if (directMatch) {
    return directMatch;
  }

  const primary = extractPrimarySubtag(normalized);
  const primaryMatch = BROWSER_LANGUAGE_PREFERENCES[primary];
  if (primaryMatch) {
    return primaryMatch;
  }

  return languageTag as LanguageCode;
}

// Helper function to get browser language
export function getBrowserLanguage(): LanguageCode {
  if (typeof navigator === "undefined") {
    return defaultLanguage;
  }

  const browserLang = navigator.language;

  if (browserLang) {
    const resolved = resolvePreferredLanguage(browserLang);
    if (resolved) {
      return resolved;
    }
  }

  if (Array.isArray(navigator.languages)) {
    for (const candidate of navigator.languages) {
      const resolved = resolvePreferredLanguage(candidate);
      if (resolved) {
        return resolved;
      }
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

// Listen for external translations being loaded
if (typeof window !== "undefined") {
  window.addEventListener("translations-ready", () => {
    // Refresh translation data from external source
    translationData = getTranslationData();

    // Dispatch that translations are loaded
    window.dispatchEvent(new CustomEvent("translations-loaded"));
    (window as any).notionDataLoaded = true;

    // Dispatch language-changed to update all components
    const currentLang = currentLanguage.value;
    window.dispatchEvent(
      new CustomEvent("language-changed", {
        detail: { language: currentLang },
        bubbles: true,
        composed: true,
      })
    );
  });
}

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

export function hasTranslation(
  key: string,
  language: LanguageCode = currentLanguage.value
): boolean {
  if (!key) {
    return false;
  }

  const langData = translationData?.[language];
  if (langData && Object.prototype.hasOwnProperty.call(langData, key)) {
    return true;
  }

  if (
    language !== defaultLanguage &&
    translationData?.[defaultLanguage] &&
    Object.prototype.hasOwnProperty.call(translationData[defaultLanguage], key)
  ) {
    return true;
  }

  return false;
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

// Get available languages - dynamically detect from loaded data
export function getAvailableLanguages(): Promise<LanguageCode[]> {
  // Always get fresh translation data
  const currentData = getTranslationData();

  if (currentData && Object.keys(currentData).length > 0) {
    const languages = Object.keys(currentData) as LanguageCode[];
    return Promise.resolve(sortLanguageCodes(languages));
  }
  return Promise.resolve([defaultLanguage]);
}

// Synchronous version for immediate use
export function getAvailableLanguagesSync(): LanguageCode[] {
  const currentData = getTranslationData();

  if (currentData && Object.keys(currentData).length > 0) {
    return sortLanguageCodes(Object.keys(currentData) as LanguageCode[]);
  }
  return [defaultLanguage];
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
