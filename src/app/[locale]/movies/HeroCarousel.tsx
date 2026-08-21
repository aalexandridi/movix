import Carousel from "@/components/ui/Carousel/Carousel";
import HeroContent from "@/components/ui/Carousel/HeroContent";
import Slide from "@/components/ui/Carousel/Slide";
import { getHeroData } from "@/services/tmdb/hero";
import { createMoviesService } from "@/services/tmdb/movies";
import { limitAndMergeUniqueById } from "@/utils/array";
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
  const genres = await moviesService.getGenres();
  const { idToName } = createGenreMaps(genres.genres);

  const heroPromise = Promise.all([
    moviesService.getPopular(),
    moviesService.getNowPlaying(),
    moviesService.getTopRated(),
    moviesService.getUpcoming(),
  ]);
  const [[popularMovies, nowPlayingMovies, topRatedMovies, upcomingMovies]] =
    await Promise.all([heroPromise]);

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
  );
}
