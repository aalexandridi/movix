import Carousel from "@/components/ui/Carousel/Carousel";
import MovieDetailsHeroContent from "@/components/ui/Carousel/MovieDetailsHeroContent";

import SlideLayout from "@/components/ui/Carousel/SlideLayout";
import { createMoviesService } from "@/services/tmdb/movies";
import {
  Episode,
  Movie,
  MovieDetails,
  PaginatedResponse,
  TvDetails,
  TvSeasonDetails,
  TvShow,
} from "@/types/media";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
// import MovieDetailsTabs from "./MovieDetailsTabs";
import MediaHeroLayout from "@/components/layout/MediaHeroLayout/MediaHeroLayout";
import { createTvShowsService } from "@/services/tmdb/shows";
import TvShowDetailsHeroContent from "@/components/ui/Carousel/TvShowDetailsHeroContent";
import Dropdown, { DropdownOption } from "@/components/ui/Dropdown/Dropdown";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import { details } from "framer-motion/client";
import EpisodeCard from "@/components/ui/EpisodeCard/EpisodeCard";
import styles from "../../../../components/ui/MediaGrid/MediaGrid.module.css";
import clsx from "clsx";
import InfiniteMediaGrid from "@/components/ui/MediaGrid/InfiniteMediaGrid";
// export async function generateMetadata() {
//   return createPageMetadata("movie");
// }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const locale = await getLocale();
  const tvShowService = createTvShowsService(locale);

  const movie = await tvShowService.getTvShowDetails(id);

  return {
    title: movie.title,
    description: movie.overview,
  };
}

const TvShowPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ season?: string }>;
}) => {
  const [locale, { id }, { season }] = await Promise.all([
    getLocale(),
    params,
    searchParams,
  ]);
  const tvShowService = createTvShowsService(locale);
  const [showDetails, seasonDetails, recommendations]: [
    TvDetails,
    TvSeasonDetails,
    PaginatedResponse<TvShow>,
  ] = await Promise.all([
    tvShowService.getTvShowDetails(id),
    season
      ? tvShowService.getSeasonDetails(id, season)
      : tvShowService.getSeasonDetails(id, 1),
    tvShowService.getRecommendations(id),
    // moviesService.getMovieRecommendations(id),
    // moviesService.getMovieCredits(id),
  ]);
  console.log("seasonDetails", seasonDetails);
  //   const seasons = showDetails.number_of_seasons.array.forEach(element => {

  //   });
  const options: DropdownOption[] = Array.from(
    { length: showDetails.number_of_seasons },
    (_, index) => ({
      label: `Season ${index + 1}`,
      value: `${index + 1}`,
    }),
  );
  return (
    <MediaHeroLayout
      hero={
        <Carousel>
          <SlideLayout
            key={`slide-${showDetails.id}`}
            backdropPath={showDetails.backdrop_path}
            alt={showDetails.id.toString()}
          >
            <TvShowDetailsHeroContent media={showDetails} />
          </SlideLayout>
        </Carousel>
      }
    >
      <>
        {options.length > 1 && (
          <Dropdown
            value={season || "1"}
            options={options}
            param={"season"}
          ></Dropdown>
        )}
        <MediaGrid
          variant="carousel"
          layoutClass="episodes"
          title={options.length === 1 ? `Season ${options.length}` : ""}
        >
          {seasonDetails.episodes.map(
            (episode: Episode) =>
              episode.still_path && (
                <div
                  key={episode.id}
                  className={clsx(styles.emblaSlide, "episodes")}
                >
                  <EpisodeCard details={episode}></EpisodeCard>
                </div>
              ),
          )}
        </MediaGrid>

        <InfiniteMediaGrid
          initialMedia={recommendations.results}
          mode="recommendations"
          movieId={id}
          mediaType="tvShow"
          title="You May Also Like"
        />

        {/* <MediaGrid
          media={[]}
          variant="carousel"
          details={seasonDetails}
          renderItem={(episode, details) => (
            <MediaCard2 details={details!} stillPath={details.} />
          )}
        /> */}
      </>
      {/* <MovieDetailsTabs
        details={movieDetails}
        recommendations={recommendations.results}
        cast={credits.cast}
        crew={credits.crew}
      /> */}
    </MediaHeroLayout>
  );
};

export default TvShowPage;
