import GenresBar from "@/components/ui/GenresBar/GenresBar";
import { createPageMetadata } from "@/lib/metadata";
import MediaContainer from "@/components/layout/MediaContainer/MediaContainer";
import { HeroCarousel } from "./HeroCarousel";
import MediaGridSkeleton from "@/components/ui/MediaGrid/MediaGridSkeleton";
import { Suspense } from "react";
import GenresBarSkeleton from "@/components/ui/GenresBar/GenresBarSkeleton";
import { TrendingTvShows } from "./TrendingTvShows";
import { PopularTvShows } from "./PopularTvShows";
import { TopRatedTvShows } from "./TopRatedTvShows";
import { MediaByGenre } from "../../../../components/media/MediaByGenre";
import { getTranslations } from "next-intl/server";
export async function generateMetadata() {
  return createPageMetadata("series");
}

const SeriesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string }>;
}) => {
  const [{ genre }, c] = await Promise.all([
    searchParams,
    getTranslations("common"),
  ]);

  return (
    <MediaContainer
      hero={
        <Suspense
          fallback={<MediaGridSkeleton isHero={true} variant="carousel" />}
        >
          <HeroCarousel />
        </Suspense>
      }
    >
      <Suspense fallback={<GenresBarSkeleton />}>
        <GenresBar forMovies={false} />
      </Suspense>

      {!genre ? (
        <>
          <Suspense
            fallback={
              <MediaGridSkeleton
                title={c("trendingTvThisWeek")}
                variant="carousel"
                layoutClass="default"
              />
            }
          >
            <TrendingTvShows />
          </Suspense>

          <Suspense
            fallback={
              <MediaGridSkeleton
                title={c("popular")}
                variant="carousel"
                layoutClass="default"
              />
            }
          >
            <PopularTvShows />
          </Suspense>

          <Suspense
            fallback={
              <MediaGridSkeleton
                title={c("topRatedShows")}
                variant="carousel"
                layoutClass="default"
              />
            }
          >
            <TopRatedTvShows />
          </Suspense>
        </>
      ) : (
        <Suspense
          fallback={
            <MediaGridSkeleton
              variant="grid"
              count={10}
              layoutClass="default"
            />
          }
        >
          <MediaByGenre genre={genre} mediaType="tv"></MediaByGenre>
        </Suspense>
      )}
    </MediaContainer>
  );
};

export default SeriesPage;
