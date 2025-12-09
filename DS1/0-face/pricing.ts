/**
 * Currency label utilities for regional price display
 *
 * Note: This module provides currency symbols/labels based on language and region.
 * Consider moving this functionality into i18n.ts as it's region/locale-related.
 * Actual price values will be stored in a database or managed via Stripe.
 */

import type { LanguageCode } from "./i18n";

type PriceLabelOptions = {
  language: LanguageCode;
  country?: string;
};

// Simple price label mapping based on language/country
const PRICE_LABELS: Record<string, string> = {
  da: "kr.",
  nb: "kr.",
  sv: "kr.",
  de: "€",
  en: "$",
  pt: "€",
  es: "€",
  zh: "¥",
  ja: "¥",
  ko: "₩",
};

export function getPriceLabel(options: PriceLabelOptions): string {
  const { language, country } = options;

  // If country is provided, try to map it to a currency
  if (country) {
    const countryUpper = country.toUpperCase();
    // Add country-specific mappings if needed
    if (countryUpper === "US" || countryUpper === "USA") {
      return "$";
    }
    if (countryUpper === "GB" || countryUpper === "UK") {
      return "£";
    }
    if (countryUpper === "JP" || countryUpper === "JPN") {
      return "¥";
    }
    if (countryUpper === "CN" || countryUpper === "CHN") {
      return "¥";
    }
    if (countryUpper === "KR" || countryUpper === "KOR") {
      return "₩";
    }
  }

  // Fall back to language-based mapping
  const primaryLang = language.toLowerCase().split(/[-_]/)[0];
  return PRICE_LABELS[primaryLang] || "$";
}
