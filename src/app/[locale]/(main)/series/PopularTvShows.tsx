import MediaPosterCard from "@/components/ui/Cards/MediaPosterCard";
import MediaPosterCardSkeleton from "@/components/ui/Cards/MediaPosterCardSkeleton/MediaPosterCardSkeleton";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import { createTvShowsService } from "@/services/tmdb/shows";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function PopularTvShows() {
  const [locale, c] = await Promise.all([
    getLocale(),
    getTranslations("common"),
  ]);
  const service = createTvShowsService(locale);

  const media = await service.getPopular();

  return (
    <MediaGrid title={c("popular")} variant="carousel">
      {media.results.map((item) => (
        <Suspense
          key={"popularMovies" + item.id}
          fallback={<MediaPosterCardSkeleton></MediaPosterCardSkeleton>}
        >
          <MediaPosterCard media={item} />
        </Suspense>
      ))}
    </MediaGrid>
  );
}
