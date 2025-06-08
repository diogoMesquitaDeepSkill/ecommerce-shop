"use client";

import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { fallbackLng, languages } from "./i18n/settings";

// Initialize i18next for client-side
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: languages,
    fallbackLng,
    // debug: true,
    detection: {
      order: ["path", "cookie", "navigator"],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18next;
