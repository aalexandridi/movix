import Carousel from "@/components/ui/Carousel/Carousel";
import DetailsHeroContent from "@/components/ui/Carousel/DetailsHeroContent";
import Slide from "@/components/ui/Carousel/Slide";
import { getDetailsHeroData } from "@/services/tmdb/hero";
import { createMoviesService } from "@/services/tmdb/movies";
import { MovieDetails } from "@/types/media";
import { getLocale } from "next-intl/server";

export async function HeroCarousel({
  movieDetails,
}: {
  movieDetails: MovieDetails;
}) {
  const [locale] = await Promise.all([getLocale()]);

  // const moviesService = createMoviesService(locale);
  // const movieDetails = await moviesService.getDetails(id);
  const heroData = await getDetailsHeroData(movieDetails, locale);

  return (
    <Carousel>
      <Slide
        isFirstSlide={true}
        key={`slide-${movieDetails.id}`}
        backdropPath={movieDetails.backdrop_path}
        alt={movieDetails.id.toString()}
      >
        <DetailsHeroContent data={heroData} />
      </Slide>
    </Carousel>
  );
}
