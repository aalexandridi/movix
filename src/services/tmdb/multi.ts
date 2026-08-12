import { PaginatedResponse, Media } from "@/types/media";
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
    getTrending: (
      timeWindow: "week" | "day",
    ): Promise<PaginatedResponse<Media>> =>
      tmdb.fetch(`/trending/all/${timeWindow}`, 3600),
  };
}
