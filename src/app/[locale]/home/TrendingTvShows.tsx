import MediaPosterCard from "@/components/ui/Cards/MediaPosterCard";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import { createTvShowsService } from "@/services/tmdb/shows";
import { sortByPopularity } from "@/utils/media";
import { getLocale, getTranslations } from "next-intl/server";

export async function TrendingTvShows() {
  const [locale, c] = await Promise.all([
    getLocale(),
    getTranslations("common"),
  ]);
  const tvShowService = createTvShowsService(locale);

  const trending = await tvShowService.getTrending("week");

  const media = sortByPopularity(trending.results);

  return (
    <MediaGrid title={c("trendingTvThisWeek")} variant="carousel">
      {media.map((item) => (
        <MediaPosterCard key={item.id} media={item} />
      ))}
    </MediaGrid>
  );
}
