/**
 * CDN Loader Utility
 * Automatically detects and loads translation JSON files from the same directory as the HTML file
 * for CDN users who want to use external translations
 */

type TranslationData = Record<string, string>;
type TranslationMap = Record<string, TranslationData>;

declare global {
  interface Window {
    DS_ONE_TRANSLATIONS?: TranslationMap;
    DS_ONE_TRANSLATIONS_FILE?: string;
  }
}

// Track if we've already attempted to load
let loadAttempted = false;

const DEFAULT_TRANSLATION_FILES = [
  "./keys.json",
  "./tekst.json",
  "./tekster.json",
  "./language.json",
  "./languages.json",
  "./translations.json",
  "./translate.json",
  "./i18n.json",
  "./locales.json",
  "./strings.json",
  "./text.json",
  "./texts.json",
];

function normalizeCandidate(path: string): string | null {
  if (!path) {
    return null;
  }
  const trimmed = path.trim();
  if (!trimmed) {
    return null;
  }

  if (
    trimmed.startsWith("./") ||
    trimmed.startsWith("../") ||
    trimmed.startsWith("/") ||
    /^https?:\/\//i.test(trimmed)
  ) {
    return trimmed;
  }

  return `./${trimmed}`;
}

function findAttributeCandidate(): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const scriptWithAttribute = document.querySelector(
    "script[data-ds-one-translations]"
  );
  const scriptCandidate = scriptWithAttribute?.getAttribute(
    "data-ds-one-translations"
  );
  if (scriptCandidate) {
    return scriptCandidate;
  }

  const metaCandidate = document
    .querySelector('meta[name="ds-one:translations"]')
    ?.getAttribute("content");
  if (metaCandidate) {
    return metaCandidate;
  }

  const linkCandidate = document
    .querySelector('link[rel="ds-one-translations"]')
    ?.getAttribute("href");
  if (linkCandidate) {
    return linkCandidate;
  }

  return null;
}

function resolveTranslationSources(): string[] {
  const candidates = new Set<string>();

  const windowCandidate =
    typeof window !== "undefined" ? window.DS_ONE_TRANSLATIONS_FILE : null;
  const attributeCandidate = findAttributeCandidate();

  const addCandidate = (candidate: string | null) => {
    const normalized = normalizeCandidate(candidate ?? "");
    if (normalized) {
      candidates.add(normalized);
    }
  };

  addCandidate(windowCandidate ?? null);
  addCandidate(attributeCandidate);

  // Always include defaults as fallback so existing behaviour keeps working
  DEFAULT_TRANSLATION_FILES.forEach((file) => addCandidate(file));

  return Array.from(candidates);
}

function validateTranslationMap(
  candidate: unknown
): candidate is TranslationMap {
  if (!candidate || typeof candidate !== "object") {
    return false;
  }

  return Object.values(candidate).every(
    (entry) => entry && typeof entry === "object"
  );
}

async function fetchTranslationFile(
  source: string
): Promise<TranslationMap | null> {
  try {
    console.log(`[DS one] Attempting to fetch translations from: ${source}`);
    const response = await fetch(source);

    if (!response.ok) {
      console.log(`[DS one] Failed to fetch ${source} (${response.status})`);
      return null;
    }

    const translations = await response.json();
    console.log(`[DS one] Successfully fetched JSON from ${source}`);

    if (!validateTranslationMap(translations)) {
      console.warn(
        `[DS one] Invalid translation format in ${source}. Expected object with language codes as keys.`
      );
      return null;
    }

    const languages = Object.keys(translations);
    if (languages.length === 0) {
      console.warn(`[DS one] No languages found in ${source}`);
      return null;
    }

    console.log(`[DS one] Valid translations found: ${languages.join(", ")}`);
    return translations;
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message.includes("Failed to fetch")
    ) {
      console.log(`[DS one] Network error fetching ${source}`);
      return null;
    }

    console.error(
      `[DS one] Error loading external translations from ${source}:`,
      error
    );
    return null;
  }
}

/**
 * Attempts to load translations from a JSON file in the same directory
 */
export async function loadExternalTranslations(): Promise<boolean> {
  // Only attempt once
  if (loadAttempted) {
    return false;
  }
  loadAttempted = true;

  if (typeof window === "undefined") {
    return false;
  }

  // Check if translations are already loaded (e.g., by the application)
  if (
    window.DS_ONE_TRANSLATIONS &&
    Object.keys(window.DS_ONE_TRANSLATIONS).length > 0
  ) {
    console.log(
      `[DS one] Translations already loaded (${Object.keys(window.DS_ONE_TRANSLATIONS).length} languages), skipping auto-load`
    );
    return true;
  }

  const sources = resolveTranslationSources();

  for (const source of sources) {
    const translations = await fetchTranslationFile(source);
    if (!translations) {
      continue;
    }

    window.DS_ONE_TRANSLATIONS = translations;

    const languages = Object.keys(translations);
    console.log(
      `[DS one] External translations loaded from ${source}: ${languages.length} language(s) – ${languages.join(", ")}`
    );

    window.dispatchEvent(new CustomEvent("translations-ready"));
    return true;
  }

  console.info(
    `[DS one] No external translations found. Looked in: ${sources.join(", ")}. Using bundled translations.`
  );

  return false;
}

// Auto-load translations when this module is imported (for CDN bundle)
if (typeof window !== "undefined") {
  // Wait a bit to ensure the DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      loadExternalTranslations();
    });
  } else {
    // DOM is already ready
    loadExternalTranslations();
  }
}
