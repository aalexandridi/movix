import { getTranslations } from "next-intl/server";
import WatchlistContainer from "./home/Watchlist";
import MediaContainer from "@/components/layout/MediaContainer/MediaContainer";
import { Suspense } from "react";
import MediaGridSkeleton from "@/components/ui/MediaGrid/MediaGridSkeleton";
import { TopToday } from "./home/TopToday";
import { TrendingMovies } from "./home/TrendingMovies";
import { TrendingTvShows } from "./home/TrendingTvShows";
import { UpcomingMovies } from "./home/UpcomingMovies";
import { HeroCarousel } from "./home/HeroCarousel";
import RecommendationsContainer from "./home/Recommendations";
export default async function Home() {
  const c = await getTranslations("common");

  return (
    <MediaContainer
      hero={
        <Suspense
          fallback={
            <MediaGridSkeleton
              isHero={true}
              variant="carousel"
              count={8}
              layoutClass="default"
            />
          }
        >
          <HeroCarousel />
        </Suspense>
      }
    >
      <Suspense
        fallback={
          <MediaGridSkeleton
            variant="carousel"
            count={8}
            layoutClass="default"
          />
        }
      >
        <TopToday />
      </Suspense>

      <Suspense fallback={<MediaGridSkeleton count={10} />}>
        <RecommendationsContainer
          title={c("recommendedForYou")}
        ></RecommendationsContainer>
      </Suspense>

      <Suspense fallback={<MediaGridSkeleton count={10} />}>
        <WatchlistContainer
          title={c("myList")}
          gridType={"carousel"}
        ></WatchlistContainer>
      </Suspense>

      <Suspense
        fallback={
          <MediaGridSkeleton
            variant="carousel"
            count={8}
            layoutClass="default"
          />
        }
      >
        <TrendingMovies />
      </Suspense>

      <Suspense
        fallback={
          <MediaGridSkeleton
            variant="carousel"
            count={8}
            layoutClass="default"
          />
        }
      >
        <TrendingTvShows />
      </Suspense>

      <Suspense
        fallback={
          <MediaGridSkeleton
            variant="carousel"
            count={8}
            layoutClass="default"
          />
        }
      >
        <UpcomingMovies />
      </Suspense>
    </MediaContainer>
  );
}
