"use client";

import { useLanguageStore } from "@/store/languageStore";
import { translations } from "@/lib/translations";

export function useT() {
  const lang = useLanguageStore((s) => s.lang);
  return translations[lang];
}
