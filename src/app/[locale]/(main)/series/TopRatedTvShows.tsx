import MediaPosterCard from "@/components/ui/Cards/MediaPosterCard";
import MediaPosterCardSkeleton from "@/components/ui/Cards/MediaPosterCardSkeleton/MediaPosterCardSkeleton";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import { createTvShowsService } from "@/services/tmdb/shows";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function TopRatedTvShows() {
  const [locale, c] = await Promise.all([
    getLocale(),
    getTranslations("common"),
  ]);
  const service = createTvShowsService(locale);

  const media = await service.getTopRated();

  return (
    <MediaGrid title={c("topRatedShows")} variant="carousel">
      {media.results.map((item) => (
        <Suspense
          key={"topRatedShows" + item.id}
          fallback={<MediaPosterCardSkeleton></MediaPosterCardSkeleton>}
        >
          <MediaPosterCard key={item.id} media={item} />
        </Suspense>
      ))}
    </MediaGrid>
  );
}
