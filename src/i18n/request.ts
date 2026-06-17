import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale, Locale } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  const resolvedLocale: Locale = (locale as Locale) ?? defaultLocale;

  if (!locales.includes(resolvedLocale)) notFound();

  const messages = (await import(`./messages/${resolvedLocale}.json`)).default;

  return {
    locale: resolvedLocale,
    messages,
  };
});
