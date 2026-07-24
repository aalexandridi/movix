import { createPageMetadata } from "@/lib/metadata";
import { createMoviesService } from "@/services/tmdb/movies";
import { getLocale } from "next-intl/server";
import Carousel from "@/components/ui/Carousel/Carousel";
import { limitAndMergeUniqueById } from "@/utils/array";
import {
  createGenreMaps,
  getCurrentDate,
  sortByPopularity,
} from "@/utils/media";
import GenresBar from "@/components/ui/GenresBar/GenresBar";
import styles from "./MoviesPage.module.css";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import InfiniteMoviesGrid from "@/components/ui/MediaGrid/InfiniteMediaGrid";
import SlideLayout from "@/components/ui/Carousel/SlideLayout";
import MovieHeroContent from "@/components/ui/Carousel/MovieHeroContent";
import MediaHeroLayout from "@/components/layout/MediaHeroLayout/MediaHeroLayout";
export async function generateMetadata() {
  return createPageMetadata("movies");
}

const MoviesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string }>;
}) => {
  const [locale, { genre }] = await Promise.all([getLocale(), searchParams]);
  const moviesService = createMoviesService(locale);
  const genres = await moviesService.getFilters();
  const { idToName, nameToId } = createGenreMaps(genres.genres);

  const genreId = genre ? nameToId.get(genre) : null;

  const heroPromise = Promise.all([
    moviesService.getPopular(),
    moviesService.getNowPlaying(),
    moviesService.getTopRated(),
    moviesService.getUpcoming(),
  ]);

  const discoverPromise =
    genreId !== null
      ? moviesService.discoverMovies(
          `with_genres=${genreId}&sort_by=popularity.desc&primary_release_date.lte=${getCurrentDate()}`,
        )
      : Promise.resolve(null);

  const [
    [popularMovies, nowPlayingMovies, topRatedMovies, upcomingMovies],
    initial,
  ] = await Promise.all([heroPromise, discoverPromise]);

  const limited = limitAndMergeUniqueById(
    3,
    popularMovies.results,
    nowPlayingMovies.results,
    topRatedMovies.results,
    upcomingMovies.results,
  );

  const limitedSorted = sortByPopularity(limited);

  return (
    <MediaHeroLayout
      hero={
        <Carousel>
          {limitedSorted.map((movie) => (
            <SlideLayout
              key={movie.id}
              backdropPath={movie.backdrop_path}
              alt={movie.title}
            >
              <MovieHeroContent media={movie} genreMap={idToName} />
            </SlideLayout>
          ))}
        </Carousel>
      }
    >
      <GenresBar genres={genres.genres} />

      {genreId == null ? (
        <>
          <MediaGrid
            title="Popular"
            variant="carousel"
            media={popularMovies.results}
          />

          <MediaGrid
            title="Top Rated Movies"
            variant="carousel"
            media={topRatedMovies.results}
          />
        </>
      ) : (
        <InfiniteMoviesGrid
          key={genreId}
          initialMovies={initial.results}
          genre={genreId}
          mode="discover"
        />
      )}
    </MediaHeroLayout>
  );
};

export default MoviesPage;
