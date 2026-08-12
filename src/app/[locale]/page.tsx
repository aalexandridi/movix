import MediaHeroLayout from "@/components/layout/MediaHeroLayout/MediaHeroLayout";
import Carousel from "@/components/ui/Carousel/Carousel";
import MovieHeroContent from "@/components/ui/Carousel/MovieHeroContent";
import SlideLayout from "@/components/ui/Carousel/SlideLayout";
import TvShowHeroContent from "@/components/ui/Carousel/TvShowHeroContent";
import { createMoviesService } from "@/services/tmdb/movies";
import { createTvShowsService } from "@/services/tmdb/shows";
import { Movie, TvShow } from "@/types/media";
import { limitAndMergeArrays, shuffleArray } from "@/utils/array";
import {
  createGenreMaps,
  getCurrentDate,
  isMovie,
  sortByPopularity,
} from "@/utils/media";
import { getLocale } from "next-intl/server";
import WatchlistContainer from "./watchlistContainer";
import { createMultiService } from "@/services/tmdb/multi";
import MediaCard from "@/components/ui/MediaCard/MediaCard";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import RecommendationsContainer from "./recommendationsContainer";
export default async function Home() {
  const locale = await getLocale();
  const moviesService = createMoviesService(locale);
  const tvShowService = createTvShowsService(locale);
  const multiService = createMultiService(locale);
  const genresMovies = await moviesService.getFilters();
  const { idToName, nameToId } = createGenreMaps(genresMovies.genres);
  const [moviesTrending, tvTrending, multiTrending, upcommingMovies] =
    await Promise.all([
      moviesService.getTrending("week"),
      tvShowService.getTrending("week"),
      multiService.getTrending("day"),
      // moviesService.getUpcoming(),
      moviesService.discoverMovies(
        `sort_by=popularity.desc&primary_release_date.gte=${getCurrentDate()}`,
      ),
    ]);
  const movies = sortByPopularity(moviesTrending.results);
  const tvShows = sortByPopularity(tvTrending.results);
  const limitedSorted = limitAndMergeArrays<Movie | TvShow>(4, movies, tvShows);
  const finalHero = shuffleArray(limitedSorted);

  const candidates = multiTrending.results.filter(
    (item) =>
      (item.media_type === "movie" || item.media_type === "tv") &&
      item.backdrop_path,
  );
  const topTen = limitAndMergeArrays<Movie | TvShow>(
    10,
    sortByPopularity(candidates),
  );

  return (
    <MediaHeroLayout
      hero={
        <Carousel options={{ loop: true }} showDots={true}>
          {finalHero.map((movie) => (
            <SlideLayout
              key={movie.id}
              media={movie}
              backdropPath={movie.backdrop_path}
              alt={movie.id.toString()}
            >
              {isMovie(movie) ? (
                <MovieHeroContent media={movie} genreMap={idToName} />
              ) : (
                <TvShowHeroContent media={movie} genreMap={idToName} />
              )}
            </SlideLayout>
          ))}
        </Carousel>
      }
    >
      <MediaGrid title="Top 10 Today" variant="carousel">
        {topTen.map((item) => (
          <MediaCard key={item.id} media={item} />
        ))}
      </MediaGrid>
      <RecommendationsContainer
        title={"Recommended For You"}
      ></RecommendationsContainer>
      <WatchlistContainer
        title={"My List"}
        gridType={"carousel"}
      ></WatchlistContainer>
      <MediaGrid title="Trending Movies This Week" variant="carousel">
        {shuffleArray(movies).map((item) => (
          <MediaCard key={item.id} media={item} />
        ))}
      </MediaGrid>
      <MediaGrid title="Trending Tv Shows This Week" variant="carousel">
        {shuffleArray(tvShows).map((item) => (
          <MediaCard key={item.id} media={item} />
        ))}
      </MediaGrid>
      <MediaGrid title="Upcoming in Theaters" variant="carousel">
        {upcommingMovies.results.map((item) => (
          <MediaCard key={item.id} media={item} />
        ))}
      </MediaGrid>
    </MediaHeroLayout>
  );
}
