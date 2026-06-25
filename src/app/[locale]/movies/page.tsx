import { createPageMetadata } from "@/lib/metadata";
import { createMoviesService } from "@/services/tmdb/movies";
import { getTranslations, getLocale } from "next-intl/server";
import Carousel from "@/components/ui/Carousel/Carousel";
import Slide from "@/components/ui/Carousel/Slide";
import { Media } from "@/types/media";
import { limitAndMergeUniqueById } from "@/utils/array";
import { sortByPopularity, toGenreMap } from "@/utils/media";

export async function generateMetadata() {
  return createPageMetadata("movies");
}

const MoviesPage = async () => {
  const n = await getTranslations("navigation");
  const locale = await getLocale();

  const moviesService = createMoviesService(locale);

  const [
    popularMovies,
    nowPlayingMovies,
    topRatedMovies,
    upcomingMovies,
    genres,
  ] = await Promise.all([
    moviesService.getPopular(),
    moviesService.getNowPlaying(),
    moviesService.getTopRated(),
    moviesService.getUpcoming(),
    moviesService.getFilters(),
  ]);

  const limited = limitAndMergeUniqueById(
    3,
    popularMovies.results,
    nowPlayingMovies.results,
    topRatedMovies.results,
    upcomingMovies.results,
  );
  // console.log("limited", limited);
  const limtedSorted = sortByPopularity(limited);
  console.log("sorted", sortByPopularity(limited));
  const genreMap = toGenreMap(genres.genres);

  return (
    <section>
      <Carousel>
        {limtedSorted.map((movie: Media) => (
          <Slide key={movie.id} media={movie} genreMap={genreMap} />
        ))}
      </Carousel>
    </section>
  );
};

export default MoviesPage;
