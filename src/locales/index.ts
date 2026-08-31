import { Locale, TranslationDictionary } from "@/types/i18n";
import { en } from "./en";
import { hi } from "./hi";
import { or } from "./or";

export const dictionaries: Record<Locale, TranslationDictionary> = {
  en,
  hi,
  or,
};

export { en, hi, or };
