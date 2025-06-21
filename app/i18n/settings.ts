export const languages = ["en", "pt", "fr"] as const;
export const fallbackLng = "en";

export type Language = (typeof languages)[number]; 