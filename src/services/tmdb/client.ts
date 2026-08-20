import { tmdbConfig } from "@/lib/env";
import { localeMap, defaultLocale } from "@/i18n/config";

const baseUrl = tmdbConfig.baseUrl;
const apiToken = tmdbConfig.apiToken;

export function createTmdbClient(locale: string) {
  const language = localeMap[locale] ?? localeMap[defaultLocale];

  async function fetcher(
    path: string,
    revalidate = 3600,
    queries = "",
    id = "",
  ) {
    const res = await fetch(
      `${baseUrl}${path}${id}?language=${language}${queries}`,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
        next: { revalidate },
      },
    );

    if (!res.ok) {
      throw new Error("TMDB request failed");
    }

    return res.json();
  }

  return {
    fetch: fetcher,
  };
}
