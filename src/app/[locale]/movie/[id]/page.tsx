import { createPageMetadata } from "@/lib/metadata";
import { createMoviesService } from "@/services/tmdb/movies";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

// export async function generateMetadata() {
//   return createPageMetadata("movie");
// }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const locale = await getLocale();
  const moviesService = createMoviesService(locale);

  const movie = await moviesService.getMovieById(id);

  return {
    title: movie.title,
    description: movie.overview,
  };
}

const MoviePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const locale = await getLocale();
  const moviesService = createMoviesService(locale);
  const movieDetails = await moviesService.getMovieById(id);
  console.log("movieDetails", movieDetails);
  return (
    <section>
      <h1>Movie {movieDetails.original_title}</h1>
    </section>
  );
};

export default MoviePage;
