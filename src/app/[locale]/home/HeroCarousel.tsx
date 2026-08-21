import Carousel from "@/components/ui/Carousel/Carousel";
import HeroContent from "@/components/ui/Carousel/HeroContent";
import Slide from "@/components/ui/Carousel/Slide";
import { getHeroData } from "@/services/tmdb/hero";
import { createMoviesService } from "@/services/tmdb/movies";
import { createTvShowsService } from "@/services/tmdb/shows";
import { Movie, TvShow } from "@/types/media";
import { limitAndMergeArrays, shuffleArray } from "@/utils/array";
import {
  createGenreMaps,
  getTitleOrName,
  sortByPopularity,
} from "@/utils/media";
import { getLocale, getTranslations } from "next-intl/server";

export async function HeroCarousel() {
  const [locale, c] = await Promise.all([
    getLocale(),
    getTranslations("common"),
  ]);
  const moviesService = createMoviesService(locale);
  const tvShowService = createTvShowsService(locale);

  const [genresMovies, moviesTrending, tvTrending] = await Promise.all([
    moviesService.getFilters(),
    moviesService.getTrending("week"),
    tvShowService.getTrending("week"),
  ]);
  const { idToName } = createGenreMaps(genresMovies.genres);
  const movies = sortByPopularity(moviesTrending.results);
  const tvShows = sortByPopularity(tvTrending.results);
  const limitedSorted = limitAndMergeArrays<Movie | TvShow>(4, movies, tvShows);
  const heroHero = shuffleArray(limitedSorted);
  const finalHeroData = await Promise.all(
    heroHero.map((media) => getHeroData(media, idToName, locale)),
  );

  return (
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
  );
}
