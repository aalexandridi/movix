export const locales = ["en", "el"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeMap: Record<string, string> = {
  en: "en-US",
  de: "de-DE",
  el: "el-GR",
};
