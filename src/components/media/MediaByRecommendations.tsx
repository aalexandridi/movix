import InfiniteMediaGrid from "@/components/ui/MediaGrid/InfiniteMediaGrid";
import { createMoviesService } from "@/services/tmdb/movies";
import { createTvShowsService } from "@/services/tmdb/shows";
import { getLocale } from "next-intl/server";

export async function MediaByRecommendations({
  id,
  mediaType,
  title,
}: {
  id: string;
  mediaType: "tv" | "movie";
  title?: string;
}) {
  const locale = await getLocale();
  const service =
    mediaType === "movie"
      ? createMoviesService(locale)
      : createTvShowsService(locale);
  const recommendations = await service.getRecommendations(id);

  return (
    <InfiniteMediaGrid
      title={title}
      initialMedia={recommendations.results}
      mode="recommendations"
      movieId={id}
      mediaType={mediaType}
    />
  );
}
