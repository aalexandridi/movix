import { createPageMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";
import GenresBar from "@/components/ui/GenresBar/GenresBar";
import MediaContainer from "@/components/layout/MediaContainer/MediaContainer";
import MediaGridSkeleton from "@/components/ui/MediaGrid/MediaGridSkeleton";
import { Suspense } from "react";
import { HeroCarousel } from "./HeroCarousel";
import { PopularMovies } from "./PopularMovies";
import { TopRatedMovies } from "./TopRatedMovies";
import { MediaByGenre } from "../../../../components/media/MediaByGenre";
import { TrendingMovies } from "./TrendingMovies";
import GenresBarSkeleton from "@/components/ui/GenresBar/GenresBarSkeleton";
export async function generateMetadata() {
  return createPageMetadata("movies");
}

const MoviesPage = async ({
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
          fallback={
            <MediaGridSkeleton
              isHero={true}
              variant="carousel"
              count={10}
              layoutClass="default"
            />
          }
        >
          <HeroCarousel />
        </Suspense>
      }
    >
      <Suspense fallback={<GenresBarSkeleton />}>
        <GenresBar forMovies={true} />
      </Suspense>
      {!genre ? (
        <>
          <Suspense
            fallback={
              <MediaGridSkeleton
                title={c("trendingMoviesThisWeek")}
                variant="carousel"
                count={10}
                layoutClass="default"
              />
            }
          >
            <TrendingMovies />
          </Suspense>
          <Suspense
            fallback={
              <MediaGridSkeleton
                variant="carousel"
                count={10}
                layoutClass="default"
                title={c("popular")}
              />
            }
          >
            <PopularMovies />
          </Suspense>

          <Suspense
            fallback={
              <MediaGridSkeleton
                variant="carousel"
                count={10}
                layoutClass="default"
                title={c("topRatedMovies")}
              />
            }
          >
            <TopRatedMovies />
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
          <MediaByGenre genre={genre} mediaType="movie"></MediaByGenre>
        </Suspense>
      )}
    </MediaContainer>
  );
};

export default MoviesPage;
