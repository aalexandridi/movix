import { createTmdbClient } from "./client";

export function createMultiService(locale: string) {
  const tmdb = createTmdbClient(locale);
  return {
    searchMedia: (query: string, extraQuery?: string) =>
      tmdb.fetch(
        "/search/multi",
        3600,
        `&query=${encodeURIComponent(query)}${extraQuery ? `&${extraQuery}` : ""}`,
      ),
  };
}
