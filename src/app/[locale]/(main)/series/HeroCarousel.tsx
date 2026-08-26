import Carousel from "@/components/ui/Carousel/Carousel";
import HeroContent from "@/components/ui/Carousel/HeroContent";
import Slide from "@/components/ui/Carousel/Slide";
import { getHeroData } from "@/services/tmdb/hero";
import { createTvShowsService } from "@/services/tmdb/shows";
import { TvShow } from "@/types/media";
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

  const tvShowsService = createTvShowsService(locale);
  const genres = await tvShowsService.getGenres();
  const { idToName } = createGenreMaps(genres.genres);

  const heroPromise = Promise.all([
    tvShowsService.getPopular(),
    tvShowsService.getTopRated(),
    tvShowsService.getAiringToday(),
  ]);

  const [[popularShows, topRatedShows, airingTodayShows]] = await Promise.all([
    heroPromise,
  ]);

  const limited: TvShow[] = limitAndMergeUniqueById(
    3,
    popularShows.results,
    topRatedShows.results,
    airingTodayShows.results,
  );

  const limitedSorted: TvShow[] = sortByPopularity(limited);

  const heroData = await Promise.all(
    limitedSorted.map((media) => getHeroData(media, idToName, locale)),
  );
  return (
    <Carousel options={{ loop: true }} showDots={true}>
      {heroData.map((data, index) => (
        <Slide
          isFirstSlide={index === 0}
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
