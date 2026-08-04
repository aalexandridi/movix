import MediaHeroLayout from "@/components/layout/MediaHeroLayout/MediaHeroLayout";
import SlideLayout from "@/components/ui/Carousel/SlideLayout";
import TvShowHeroContent from "@/components/ui/Carousel/TvShowHeroContent";
import GenresBar from "@/components/ui/GenresBar/GenresBar";
import MediaCard from "@/components/ui/MediaCard/MediaCard";
import InfiniteMediaGrid from "@/components/ui/MediaGrid/InfiniteMediaGrid";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import { createPageMetadata } from "@/lib/metadata";
import { createTvShowsService } from "@/services/tmdb/shows";
import { TvShow } from "@/types/media";
import { limitAndMergeUniqueById } from "@/utils/array";
import {
  createGenreMaps,
  getCurrentDate,
  sortByPopularity,
} from "@/utils/media";
import { getLocale, getTranslations } from "next-intl/server";
import Carousel from "@/components/ui/Carousel/Carousel";
export async function generateMetadata() {
  return createPageMetadata("series");
}

const SeriesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string }>;
}) => {
  const n = await getTranslations("navigation");
  const [locale, { genre }] = await Promise.all([getLocale(), searchParams]);
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
  return (
    <MediaHeroLayout
      hero={
        <Carousel options={{ loop: true }} showDots={true}>
          {limitedSorted.map((show: TvShow) => (
            <SlideLayout
              key={show.id}
              backdropPath={show.backdrop_path}
              alt={show.name}
            >
              <TvShowHeroContent media={show} genreMap={idToName} />
            </SlideLayout>
          ))}
        </Carousel>
      }
    >
      <GenresBar genres={genres.genres} />

      {genreId == null ? (
        <>
          <MediaGrid title="Popular" variant="carousel">
            {popularShows.results.map((item) => (
              <MediaCard key={item.id} media={item} />
            ))}
          </MediaGrid>

          <MediaGrid title="Top Rated Movies" variant="carousel">
            {topRatedShows.results.map((item) => (
              <MediaCard key={item.id} media={item} />
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
    </MediaHeroLayout>
  );
};

export default SeriesPage;
