import { EpisodeDetails, PaginatedResponse, TvShow } from "@/types/media";
import { createTmdbClient } from "./client";

export function createTvShowsService(locale: string) {
  const tmdb = createTmdbClient(locale);

  return {
    getPopular: (): Promise<PaginatedResponse<TvShow>> =>
      tmdb.fetch("/tv/popular", 3600),

    getTopRated: (): Promise<PaginatedResponse<TvShow>> =>
      tmdb.fetch("/tv/top_rated", 21600),

    getAiringToday: (): Promise<PaginatedResponse<TvShow>> =>
      tmdb.fetch("/tv/airing_today", 300),

    getImages: (id: number) => tmdb.fetch(`/tv/${id}/images`, 3600),

    getGenres: () => tmdb.fetch("/genre/tv/list", 3600),

    getTvShowDetails: (id: number | string) => tmdb.fetch(`/tv/${id}`, 3600),

    discoverShows: (query: string) =>
      tmdb.fetch("/discover/tv", 3600, `&${query}`),

    getSeasonDetails: (
      series_id: string | number,
      season_number: string | number,
    ) => tmdb.fetch(`/tv/${series_id}/season/${season_number}`, 3600),

    getEpisodeDetails: (
      series_id: string | number,
      season_number: string | number,
      episode_number: string | number,
    ): Promise<PaginatedResponse<EpisodeDetails>> =>
      tmdb.fetch(
        `/tv/${series_id}/season/${season_number}/episode/${episode_number}`,
        3600,
        "&append_to_response=credits",
      ),

    getRecommendations: (id: string, query?: string) =>
      tmdb.fetch(`/tv/${id}/recommendations`, 3600, `&${query}`),
  };
}
