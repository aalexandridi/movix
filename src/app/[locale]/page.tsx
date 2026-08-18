import Carousel from "@/components/ui/Carousel/Carousel";
import { createMoviesService } from "@/services/tmdb/movies";
import { createTvShowsService } from "@/services/tmdb/shows";
import { Movie, TvShow } from "@/types/media";
import { limitAndMergeArrays, shuffleArray } from "@/utils/array";
import {
  createGenreMaps,
  getCurrentDate,
  getTitleOrName,
  sortByPopularity,
} from "@/utils/media";
import { getLocale, getTranslations } from "next-intl/server";
import WatchlistContainer from "./watchlistContainer";
import { createMultiService } from "@/services/tmdb/multi";
import MediaPosterCard from "@/components/ui/Cards/MediaPosterCard";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import RecommendationsContainer from "./recommendationsContainer";
import { getHeroData } from "@/services/tmdb/hero";
import HeroContent from "@/components/ui/Carousel/HeroContent";
import MediaContainer from "@/components/layout/MediaContainer/MediaContainer";
import Slide from "@/components/ui/Carousel/Slide";
export default async function Home() {
  const [locale, c] = await Promise.all([
    getLocale(),
    getTranslations("common"),
  ]);
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
  const heroHero = shuffleArray(limitedSorted);
  const finalHeroData = await Promise.all(
    heroHero.map((media) => getHeroData(media, idToName, locale)),
  );
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
    <MediaContainer
      hero={
        <Carousel options={{ loop: true }} showDots={true}>
          {finalHeroData.map((data) => (
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
      <MediaGrid title={c("topToday")} variant="carousel">
        {topTen.map((item) => (
          <MediaPosterCard key={item.id} media={item} />
        ))}
      </MediaGrid>
      <RecommendationsContainer
        title={c("recommendedForYou")}
      ></RecommendationsContainer>
      <WatchlistContainer
        title={c("myList")}
        gridType={"carousel"}
      ></WatchlistContainer>
      <MediaGrid title={c("trendingMoviesThisWeek")} variant="carousel">
        {shuffleArray(movies).map((item) => (
          <MediaPosterCard key={item.id} media={item} />
        ))}
      </MediaGrid>
      <MediaGrid title={c("trendingTvThisWeek")} variant="carousel">
        {shuffleArray(tvShows).map((item) => (
          <MediaPosterCard key={item.id} media={item} />
        ))}
      </MediaGrid>
      <MediaGrid title={c("upcomingTheaters")} variant="carousel">
        {upcommingMovies.results.map((item) => (
          <MediaPosterCard key={item.id} media={item} />
        ))}
      </MediaGrid>
    </MediaContainer>
  );
}
