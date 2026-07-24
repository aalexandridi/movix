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

  const limtedSorted = sortByPopularity(limited);

  return (
    <section className={styles.hero}>
      <Carousel>
        {limtedSorted.map((movie) => (
          <SlideLayout
            key={`slide-${movie.id}`}
            backdropPath={movie.backdrop_path}
            alt={movie.id.toString()}
          >
            <MovieHeroContent
              media={movie}
              genreMap={idToName}
            ></MovieHeroContent>
          </SlideLayout>
        ))}
      </Carousel>

      <section className={styles.content}>
        <div className={styles.overlay} />
        <div className={styles.content2}>
          <GenresBar genres={genres.genres} />
          {genreId == null && (
            <>
              <MediaGrid
                title={"Popular"}
                variant="carousel"
                media={popularMovies.results}
              />
              <MediaGrid
                title={"Top Rated Movies"}
                variant="carousel"
                media={topRatedMovies.results}
              />
            </>
          )}

          {genreId !== null && (
            <InfiniteMoviesGrid
              key={genre ?? "all"}
              initialMovies={initial.results}
              genre={genreId}
            />
          )}
        </div>
      </section>

      {/* <section className={styles.content}>
        <div className={styles.overlay} />
        <GenresBar genres={genres.genres} />
        <MediaGrid variant="carousel" media={popularMovies.results} />
      </section> */}
    </section>
  );
};

export default MoviesPage;
