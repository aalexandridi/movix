import { createPageMetadata } from "@/lib/metadata";
import { createMoviesService } from "@/services/tmdb/movies";
import { getLocale, getTranslations } from "next-intl/server";
import { limitAndMergeUniqueById } from "@/utils/array";
import {
  createGenreMaps,
  getCurrentDate,
  getTitleOrName,
  sortByPopularity,
} from "@/utils/media";
import GenresBar from "@/components/ui/GenresBar/GenresBar";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import Slide from "@/components/ui/Carousel/Slide";
import InfiniteMediaGrid from "@/components/ui/MediaGrid/InfiniteMediaGrid";
import MediaPosterCard from "@/components/ui/Cards/MediaPosterCard";
import Carousel from "@/components/ui/Carousel/Carousel";
import { getHeroData } from "@/services/tmdb/hero";
import HeroContent from "@/components/ui/Carousel/HeroContent";
import MediaContainer from "@/components/layout/MediaContainer/MediaContainer";
export async function generateMetadata() {
  return createPageMetadata("movies");
}

const MoviesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string }>;
}) => {
  const [locale, { genre }, c] = await Promise.all([
    getLocale(),
    searchParams,
    getTranslations("common"),
  ]);
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

  const heroData = await Promise.all(
    limitedSorted.map((media) => getHeroData(media, idToName, locale)),
  );

  return (
    <MediaContainer
      hero={
        <Carousel options={{ loop: true }} showDots={true}>
          {heroData.map((data) => (
            <Slide
              key={data.media.id}
              media={data.media}
              backdropPath={data.media.backdrop_path}
              alt={getTitleOrName(data.media)}
            >
              <HeroContent data={data} playLabel={c("play")} />
            </Slide>
          ))}
        </Carousel>
      }
    >
      {/* <MediaGrid variant="carousel">
        <GenresBar genres={genres.genres} />
      </MediaGrid> */}
      <GenresBar genres={genres.genres} />

      {genreId == null ? (
        <>
          <MediaGrid title={c("popular")} variant="carousel">
            {popularMovies.results.map((item) => (
              <MediaPosterCard key={item.id} media={item} />
            ))}
          </MediaGrid>

          <MediaGrid title={c("topRatedMovies")} variant="carousel">
            {topRatedMovies.results.map((item) => (
              <MediaPosterCard key={item.id} media={item} />
            ))}
          </MediaGrid>
        </>
      ) : (
        initial && (
          <InfiniteMediaGrid
            key={genreId}
            initialMedia={initial.results}
            genre={genreId}
            mode="discover"
          />
        )
      )}
    </MediaContainer>
  );
};

export default MoviesPage;
