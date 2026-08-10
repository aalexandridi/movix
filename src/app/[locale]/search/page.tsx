import MediaHeroLayout from "@/components/layout/MediaHeroLayout/MediaHeroLayout";
import MediaCard from "@/components/ui/MediaCard/MediaCard";
import InfiniteMediaGrid from "@/components/ui/MediaGrid/InfiniteMediaGrid";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import SearchInput from "@/components/ui/SearchInput/SearchInput";
import { createPageMetadata } from "@/lib/metadata";
import { createMoviesService } from "@/services/tmdb/movies";
import { createMultiService } from "@/services/tmdb/multi";
import { createTvShowsService } from "@/services/tmdb/shows";
import { mergeArrays, shuffleArray } from "@/utils/array";
import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  return createPageMetadata("search");
}

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const [locale, { query }] = await Promise.all([getLocale(), searchParams]);
  const multiService = createMultiService(locale);
  const moviesService = createMoviesService(locale);
  const seriesService = createTvShowsService(locale);

  const popularPromise = query
    ? Promise.resolve(null)
    : Promise.all([moviesService.getPopular(), seriesService.getPopular()]);

  const searchPromise = query
    ? multiService.searchMedia(query)
    : Promise.resolve(null);

  const [popularData, searchResults] = await Promise.all([
    popularPromise,
    searchPromise,
  ]);

  const media = popularData
    ? mergeArrays(popularData[0].results, popularData[1].results)
    : [];

  const shuffledMedia = shuffleArray(media);
  return (
    <MediaHeroLayout className="mt-14">
      <SearchInput></SearchInput>
      {query ? (
        <InfiniteMediaGrid
          key={query}
          initialMedia={searchResults?.results ?? []}
          mode={"search"}
          query={query}
          mediaGridLayout="episodes"
          mediaCardType={2}
        ></InfiniteMediaGrid>
      ) : (
        <MediaGrid title="Popular">
          {shuffledMedia.map((item) => (
            <MediaCard key={item.id} media={item} />
          ))}
        </MediaGrid>
      )}
    </MediaHeroLayout>
  );
};

export default SearchPage;
