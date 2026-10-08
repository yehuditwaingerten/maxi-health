"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/store/languageStore";

export default function LanguageSync() {
  const lang = useLanguageStore((s) => s.lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  }, [lang]);

  return null;
}
