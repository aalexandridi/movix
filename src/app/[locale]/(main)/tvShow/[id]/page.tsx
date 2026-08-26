import Slide from "@/components/ui/Carousel/Slide";
import { Episode, TvDetails, TvSeasonDetails } from "@/types/media";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { createTvShowsService } from "@/services/tmdb/shows";
import Dropdown, { DropdownOption } from "@/components/ui/Dropdown/Dropdown";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import Carousel from "@/components/ui/Carousel/Carousel";
import { getDetailsHeroData } from "@/services/tmdb/hero";
import DetailsHeroContent from "@/components/ui/Carousel/DetailsHeroContent";
import MediaCard from "@/components/ui/Cards/MediaCard";
import MediaContainer from "@/components/layout/MediaContainer/MediaContainer";
import { Suspense } from "react";
import MediaGridSkeleton from "@/components/ui/MediaGrid/MediaGridSkeleton";
import { MediaByRecommendations } from "@/components/media/MediaByRecommendations";
import { getCurrentDate } from "@/utils/media";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const locale = await getLocale();
  const tvShowService = createTvShowsService(locale);

  const movie = await tvShowService.getDetails(id);

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
  const [showDetails, seasonDetails]: [TvDetails, TvSeasonDetails] =
    await Promise.all([
      tvShowService.getDetails(id),
      season
        ? tvShowService.getSeasonDetails(id, season)
        : tvShowService.getSeasonDetails(id, 1),
    ]);

  const currentDate = new Date(getCurrentDate()).getTime();

  const activeSeasons = showDetails.seasons.filter(
    ({ air_date, season_number }) =>
      new Date(air_date).getTime() <= currentDate && season_number > 0,
  );

  const options: DropdownOption[] = activeSeasons.map((_, index) => ({
    label: `${c("season")} ${index + 1}`,
    value: `${index + 1}`,
  }));
  const heroData = await getDetailsHeroData(showDetails, locale);
  return (
    <MediaContainer
      hero={
        <Carousel>
          <Slide
            isFirstSlide={true}
            key={`slide-${showDetails.id}`}
            backdropPath={showDetails.backdrop_path}
            alt={showDetails.id.toString()}
          >
            <DetailsHeroContent data={heroData} />
          </Slide>
        </Carousel>
      }
    >
      <p className="mb-3 -mt-10 flex sm:hidden sm:mt-0">
        {heroData.description}
      </p>

      <div className="flex gap-2 flex sm:hidden mb-8">
        {heroData.genres.map((genre) => (
          <span key={genre.id}>{genre.name}</span>
        ))}
      </div>
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
            ),
        )}
      </MediaGrid>

      <Suspense
        fallback={
          <MediaGridSkeleton
            title={c("alsoLike")}
            variant="grid"
            count={14}
            layoutClass="default"
          />
        }
      >
        <MediaByRecommendations
          title={c("alsoLike")}
          id={id}
          mediaType={"tv"}
        ></MediaByRecommendations>
      </Suspense>
    </MediaContainer>
  );
};

export default TvShowPage;
