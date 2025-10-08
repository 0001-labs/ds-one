import type { LanguageCode } from "./language";

type PriceLabelOptions = {
  language: LanguageCode;
  country?: string;
};

const defaultPriceByLanguage: Record<string, string> = {
  en: "$42", // life, the universe and everything
  de: "42 €",
  fr: "42 €",
  es: "42 €",
};

export function getPriceLabel({ language, country }: PriceLabelOptions): string {
  const normalized = language.toLowerCase();
  const base = defaultPriceByLanguage[normalized] ?? defaultPriceByLanguage.en;

  if (!country) {
    return base;
  }

  return `${base} (${country.toUpperCase()})`;
}
