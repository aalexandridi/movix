import { Media, WatchlistItem } from "@/types/media";

import { isMovie } from "@/utils/media";
import { createMoviesService } from "./movies";
import { createTvShowsService } from "./shows";
import { shuffleArray } from "@/utils/array";

export function createRecommendationService(locale: string) {
  const movieService = createMoviesService(locale);
  const tvService = createTvShowsService(locale);

  const getRecommendations = async (
    watchlist: WatchlistItem[],
    limit = 10,
  ): Promise<Media[]> => {
    const sources = watchlist.filter((item) => !item.episode);

    if (sources.length === 0) {
      return [];
    }

    const watchlistIds = new Set(sources.map((item) => item.media.id));

    const recommendationResults = await Promise.all(
      sources.map(async (item) => {
        const media = item.media;

        if (isMovie(media)) {
          return movieService.getRecommendations(media.id);
        }

        return tvService.getRecommendations(media.id);
      }),
    );

    // Merge all TMDB results
    const recommendations = recommendationResults.flatMap(
      (result) => result.results,
    );

    // Remove things already in the watchlist
    const filtered = recommendations.filter(
      (media) => !watchlistIds.has(media.id),
    );

    // Remove duplicates.
    // media_type is important because a movie and TV show can theoretically
    // have the same TMDB ID.
    const unique = Array.from(
      new Map(
        filtered.map((media) => [`${media.media_type}-${media.id}`, media]),
      ).values(),
    );

    // Shuffle
    // for (let i = unique.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1));

    //   [unique[i], unique[j]] = [unique[j], unique[i]];
    // }

    const shuffled = shuffleArray(unique);

    return shuffled.slice(0, limit);
  };

  return {
    getRecommendations,
  };
}
