"use client";

import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { fallbackLng, languages } from "./i18n/settings";

// Import translations
import translationEN from "./i18n/locales/en/translation.json";
import translationPT from "./i18n/locales/pt/translation.json";
import translationFR from "./i18n/locales/fr/translation.json";

// Initialize i18next for client-side
if (!i18next.isInitialized) {
  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: translationEN,
        },
        pt: {
          translation: translationPT,
        },
        fr: {
          translation: translationFR,
        },
      },
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
}

export default i18next;
