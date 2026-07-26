import MediaHeroLayout from "@/components/layout/MediaHeroLayout/MediaHeroLayout";
import InfiniteMediaGrid from "@/components/ui/MediaGrid/InfiniteMediaGrid";
import InfiniteMoviesGrid from "@/components/ui/MediaGrid/InfiniteMediaGrid";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import SearchInput from "@/components/ui/SearchInput/SearchInput";
import { createPageMetadata } from "@/lib/metadata";
import { createMoviesService } from "@/services/tmdb/movies";
import { createMultiService } from "@/services/tmdb/multi";
import { createTvShowsService } from "@/services/tmdb/shows";
import { mergeArrays, shuffleArray } from "@/utils/array";
import { getLocale } from "next-intl/server";
// import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  return createPageMetadata("search");
}

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  // const n = await getTranslations("navigation");
  const [locale, { query }] = await Promise.all([getLocale(), searchParams]);
  console.log("query====", query);
  // const locale = await getLocale();
  const multiService = createMultiService(locale);
  const moviesService = createMoviesService(locale);
  const seriesService = createTvShowsService(locale);

  // const [popularMovies, popularSeries] = await Promise.all([
  //   moviesService.getPopular(),
  //   seriesService.getPopular(),
  // ]);

  // const searchResults = query
  //   ? await multiService.searchMedia(query)
  //   : await Promise.resolve(null);

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
  // console.log("searchResults===", searchResults);
  return (
    <MediaHeroLayout className="mt-14">
      <SearchInput></SearchInput>
      {query ? (
        <InfiniteMediaGrid
          key={query}
          initialMovies={searchResults?.results ?? []}
          mode={"search"}
          query={query}
        ></InfiniteMediaGrid>
      ) : (
        <MediaGrid title="Popular" media={shuffledMedia} />
      )}
    </MediaHeroLayout>
  );
};

export default SearchPage;
