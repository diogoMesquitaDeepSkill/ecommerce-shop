import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { getOptions, languages } from "./settings";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpBackend)
  .init({
    ...getOptions(),
    lng: undefined, // Let detect from browser
    detection: {
      order: ["path", "cookie", "navigator"],
    },
    preload: languages,
  });

export default i18next;
