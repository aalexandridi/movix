import SlideLayout from "@/components/ui/Carousel/SlideLayout";
import {
  Episode,
  PaginatedResponse,
  TvDetails,
  TvSeasonDetails,
  TvShow,
} from "@/types/media";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import MediaHeroLayout from "@/components/layout/MediaHeroLayout/MediaHeroLayout";
import { createTvShowsService } from "@/services/tmdb/shows";
import TvShowDetailsHeroContent from "@/components/ui/Carousel/TvShowDetailsHeroContent";
import Dropdown, { DropdownOption } from "@/components/ui/Dropdown/Dropdown";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import EpisodeCard from "@/components/ui/EpisodeCard/EpisodeCard";

import InfiniteMediaGrid from "@/components/ui/MediaGrid/InfiniteMediaGrid";
import Carousel from "@/components/ui/Carousel/Carousel";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const locale = await getLocale();
  const tvShowService = createTvShowsService(locale);

  const movie = await tvShowService.getTvShowDetails(id);

  return {
    title: movie.name,
    description: movie.overview,
  };
}

const TvShowPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ season?: string }>;
}) => {
  const [locale, { id }, { season }] = await Promise.all([
    getLocale(),
    params,
    searchParams,
  ]);
  const tvShowService = createTvShowsService(locale);
  const [showDetails, seasonDetails, recommendations]: [
    TvDetails,
    TvSeasonDetails,
    PaginatedResponse<TvShow>,
  ] = await Promise.all([
    tvShowService.getTvShowDetails(id),
    season
      ? tvShowService.getSeasonDetails(id, season)
      : tvShowService.getSeasonDetails(id, 1),
    tvShowService.getRecommendations(id),
  ]);
  //   const seasons = showDetails.number_of_seasons.array.forEach(element => {

  //   });
  const options: DropdownOption[] = Array.from(
    { length: showDetails.number_of_seasons },
    (_, index) => ({
      label: `Season ${index + 1}`,
      value: `${index + 1}`,
    }),
  );
  return (
    <MediaHeroLayout
      hero={
        <Carousel>
          <SlideLayout
            key={`slide-${showDetails.id}`}
            backdropPath={showDetails.backdrop_path}
            alt={showDetails.id.toString()}
          >
            <TvShowDetailsHeroContent media={showDetails} />
          </SlideLayout>
        </Carousel>
      }
    >
      <>
        {options.length > 1 && (
          <Dropdown
            value={season || "1"}
            options={options}
            param={"season"}
          ></Dropdown>
        )}
        <MediaGrid
          variant="carousel"
          layoutClass="episodes"
          resetKey={seasonDetails.id.toString()}
          title={options.length === 1 ? `Season ${options.length}` : ""}
        >
          {seasonDetails.episodes.map(
            (episode: Episode) =>
              episode.still_path && (
                <EpisodeCard
                  key={episode.id}
                  episode={episode}
                  tvShowDetails={showDetails}
                ></EpisodeCard>
              ),
          )}
        </MediaGrid>

        <InfiniteMediaGrid
          initialMedia={recommendations.results}
          mode="recommendations"
          movieId={id}
          mediaType="tvShow"
          title="You May Also Like"
        />
      </>
    </MediaHeroLayout>
  );
};

export default TvShowPage;
