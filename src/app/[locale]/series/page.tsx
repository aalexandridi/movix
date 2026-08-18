import Slide from "@/components/ui/Carousel/Slide";
import GenresBar from "@/components/ui/GenresBar/GenresBar";
import MediaPosterCard from "@/components/ui/Cards/MediaPosterCard";
import InfiniteMediaGrid from "@/components/ui/MediaGrid/InfiniteMediaGrid";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import { createPageMetadata } from "@/lib/metadata";
import { createTvShowsService } from "@/services/tmdb/shows";
import { TvShow } from "@/types/media";
import { limitAndMergeUniqueById } from "@/utils/array";
import {
  createGenreMaps,
  getCurrentDate,
  getTitleOrName,
  sortByPopularity,
} from "@/utils/media";
import { getLocale, getTranslations } from "next-intl/server";
import Carousel from "@/components/ui/Carousel/Carousel";
import { getHeroData } from "@/services/tmdb/hero";
import HeroContent from "@/components/ui/Carousel/HeroContent";
import MediaContainer from "@/components/layout/MediaContainer/MediaContainer";
export async function generateMetadata() {
  return createPageMetadata("series");
}

const SeriesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string }>;
}) => {
  const [locale, { genre }, c] = await Promise.all([
    getLocale(),
    searchParams,
    getTranslations("common"),
  ]);
  const tvShowsService = createTvShowsService(locale);
  const genres = await tvShowsService.getGenres();
  const { idToName, nameToId } = createGenreMaps(genres.genres);
  const genreId = genre ? nameToId.get(genre) : null;
  const heroPromise = Promise.all([
    tvShowsService.getPopular(),
    tvShowsService.getTopRated(),
    tvShowsService.getAiringToday(),
  ]);

  const discoverPromise =
    genreId !== null
      ? tvShowsService.discoverShows(
          `with_genres=${genreId}&sort_by=popularity.desc&primary_release_date.lte=${getCurrentDate()}`,
        )
      : Promise.resolve(null);

  const [[popularShows, topRatedShows, airingTodayShows], initial] =
    await Promise.all([heroPromise, discoverPromise]);
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
      <GenresBar genres={genres.genres} />

      {genreId == null ? (
        <>
          <MediaGrid title={c("popular")} variant="carousel">
            {popularShows.results.map((item) => (
              <MediaPosterCard key={item.id} media={item} />
            ))}
          </MediaGrid>

          <MediaGrid title={c("topRatedShows")} variant="carousel">
            {topRatedShows.results.map((item) => (
              <MediaPosterCard key={item.id} media={item} />
            ))}
          </MediaGrid>
        </>
      ) : (
        <InfiniteMediaGrid
          key={genreId}
          initialMedia={initial.results}
          genre={genreId}
          mode="discover"
          mediaType="tvShow"
        />
      )}
    </MediaContainer>
  );
};

export default SeriesPage;
