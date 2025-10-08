import { signal } from "@lit-labs/signals";

export type LanguageCode = string;

type TranslationMap = Record<string, string>;

type NotionCache = Map<string, string>;

const translationStore = new Map<LanguageCode, TranslationMap>();
const notionStore = new Map<LanguageCode, NotionCache>();

const defaultLanguage: LanguageCode = "en";

const storedLanguage =
  typeof window !== "undefined"
    ? window.localStorage?.getItem("ds-one:language") ?? undefined
    : undefined;

export const currentLanguage = signal<LanguageCode>(
  storedLanguage || defaultLanguage
);

function getLanguageBucket(language: LanguageCode): NotionCache {
  const normalized = normalizeLanguage(language);
  if (!notionStore.has(normalized)) {
    notionStore.set(normalized, new Map());
  }
  return notionStore.get(normalized)!;
}

function normalizeLanguage(language: LanguageCode): LanguageCode {
  return language.toLowerCase();
}

export function translate(
  key: string,
  language: LanguageCode = currentLanguage.get()
): string {
  const normalized = normalizeLanguage(language);
  const languageTranslations = translationStore.get(normalized);

  if (languageTranslations && key in languageTranslations) {
    return languageTranslations[key];
  }

  const fallbackTranslations = translationStore.get(defaultLanguage);
  if (fallbackTranslations && key in fallbackTranslations) {
    return fallbackTranslations[key];
  }

  return key;
}

export async function getNotionText(
  key: string,
  language: LanguageCode = currentLanguage.get()
): Promise<string | null> {
  if (!key) {
    return null;
  }

  const bucket = getLanguageBucket(language);
  return bucket.get(key) ?? null;
}

export function setNotionText(
  key: string,
  value: string,
  language: LanguageCode = currentLanguage.get()
): void {
  if (!key) {
    return;
  }

  const bucket = getLanguageBucket(language);
  bucket.set(key, value);
}

export function getAvailableLanguages(): Promise<LanguageCode[]> {
  if (translationStore.size === 0) {
    return Promise.resolve([currentLanguage.get()]);
  }

  return Promise.resolve(Array.from(translationStore.keys()));
}

export function loadTranslations(
  language: LanguageCode,
  translations: TranslationMap
): void {
  const normalized = normalizeLanguage(language);
  const existing = translationStore.get(normalized) ?? {};
  translationStore.set(normalized, { ...existing, ...translations });

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("translations-loaded", {
        detail: { language: normalized },
      })
    );
  }
}

// Auto-load translations from window.DS_ONE_TRANSLATIONS if available
if (typeof window !== "undefined") {
  const loadFromWindow = () => {
    const translations = (window as any).DS_ONE_TRANSLATIONS;
    if (translations && typeof translations === "object") {
      // Load all languages from the translations object
      Object.keys(translations).forEach((key) => {
        const value = translations[key];
        if (typeof value === "object") {
          // value is { en: "text", da: "tekst", ja: "テキスト" }
          Object.keys(value).forEach((lang) => {
            const langTranslations = translationStore.get(lang) || {};
            langTranslations[key] = value[lang];
            translationStore.set(lang, langTranslations);
          });
        }
      });
      console.log("DS one: Loaded translations from window.DS_ONE_TRANSLATIONS");
    }
  };

  // Try to load immediately
  loadFromWindow();

  // Also listen for when translations are loaded dynamically
  window.addEventListener("translations-ready", loadFromWindow);
}

export function setLanguage(language: LanguageCode): void {
  const normalized = normalizeLanguage(language);

  if (normalized === currentLanguage.get()) {
    return;
  }

  currentLanguage.set(normalized);

  if (typeof window !== "undefined") {
    try {
      window.localStorage?.setItem("ds-one:language", normalized);
    } catch (error) {
      console.warn("ds-one: unable to persist language preference", error);
    }

    window.dispatchEvent(
      new CustomEvent("language-changed", {
        detail: { language: normalized },
      })
    );
  }
}

export function getBrowserLanguage(): LanguageCode {
  if (typeof navigator !== "undefined" && navigator.language) {
    return normalizeLanguage(navigator.language.split("-")[0]);
  }

  return defaultLanguage;
}
