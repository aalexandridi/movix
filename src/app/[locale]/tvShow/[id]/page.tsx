import Slide from "@/components/ui/Carousel/Slide";
import {
  Episode,
  PaginatedResponse,
  TvDetails,
  TvSeasonDetails,
  TvShow,
} from "@/types/media";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { createTvShowsService } from "@/services/tmdb/shows";
import Dropdown, { DropdownOption } from "@/components/ui/Dropdown/Dropdown";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import InfiniteMediaGrid from "@/components/ui/MediaGrid/InfiniteMediaGrid";
import Carousel from "@/components/ui/Carousel/Carousel";
import { getDetailsHeroData } from "@/services/tmdb/hero";
import DetailsHeroContent from "@/components/ui/Carousel/DetailsHeroContent";
import MediaCard from "@/components/ui/Cards/MediaCard";
import MediaContainer from "@/components/layout/MediaContainer/MediaContainer";

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
  const [locale, { id }, { season }, c] = await Promise.all([
    getLocale(),
    params,
    searchParams,
    getTranslations("common"),
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
      label: `${c("season")} ${index + 1}`,
      value: `${index + 1}`,
    }),
  );
  const heroData = await getDetailsHeroData(showDetails, locale);
  return (
    <MediaContainer
      hero={
        <Carousel>
          <Slide
            key={`slide-${showDetails.id}`}
            backdropPath={showDetails.backdrop_path}
            alt={showDetails.id.toString()}
          >
            <DetailsHeroContent data={heroData} />
          </Slide>
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
                <MediaCard
                  key={episode.id}
                  episode={episode}
                  media={showDetails}
                  hasLink={false}
                  insideShow={true}
                ></MediaCard>
                // <EpisodeCard
                //   key={episode.id}
                //   episode={episode}
                //   tvShowDetails={showDetails}
                // ></EpisodeCard>
              ),
          )}
        </MediaGrid>

        <InfiniteMediaGrid
          initialMedia={recommendations.results}
          mode="recommendations"
          movieId={id}
          mediaType="tvShow"
          title={c("alsoLike")}
        />
      </>
    </MediaContainer>
  );
};

export default TvShowPage;
