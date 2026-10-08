import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Lang = "en" | "he";

interface LanguageStore {
  lang: Lang;
  toggleLang: () => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      lang: "he",
      toggleLang: () => set({ lang: get().lang === "en" ? "he" : "en" }),
    }),
    { name: "maxi-lang" }
  )
);
