import { createPageMetadata } from "@/lib/metadata";
import { createMoviesService } from "@/services/tmdb/movies";
import { getTranslations, getLocale } from "next-intl/server";
import Carousel from "@/components/ui/Carousel/Carousel";
import Slide from "@/components/ui/Carousel/Slide";
import { Media } from "@/types/media";
import { limitAndMergeUniqueById } from "@/utils/array";

export async function generateMetadata() {
  return createPageMetadata("movies");
}

const MoviesPage = async () => {
  const n = await getTranslations("navigation");
  const locale = await getLocale();

  const moviesService = createMoviesService(locale);

  const [popularMovies, nowPlayingMovies, topRatedMovies, upcomingMovies] =
    await Promise.all([
      moviesService.getPopular(),
      moviesService.getNowPlaying(),
      moviesService.getTopRated(),
      moviesService.getUpcoming(),
    ]);

  const limited = limitAndMergeUniqueById(
    3,
    popularMovies.results,
    nowPlayingMovies.results,
    topRatedMovies.results,
    upcomingMovies.results,
  );

  return (
    <section>
      <Carousel>
        {limited.map((movie: Media) => (
          <Slide key={movie.id} media={movie} />
        ))}
      </Carousel>
    </section>
  );
};

export default MoviesPage;
