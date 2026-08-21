"use client";

import { useEffect, useState } from "react";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import { MediaGridType } from "@/components/ui/MediaGrid/MediaGrid.types";
import { useAppSelector } from "@/store/hooks";
import { Media } from "@/types/media";
import MediaPosterCard from "@/components/ui/Cards/MediaPosterCard";
import MediaGridSkeleton from "@/components/ui/MediaGrid/MediaGridSkeleton";

export default function RecommendationsContainer({
  title,
  gridType = "carousel",
}: {
  title: string;
  gridType?: MediaGridType;
}) {
  const watchlist = useAppSelector((state) => state.watchlist.items);

  const [recommendations, setRecommendations] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (watchlist.length === 0) {
      return;
    }

    const controller = new AbortController();

    async function fetchRecommendations() {
      setLoading(true);
      try {
        const response = await fetch("/api/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ watchlist }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }

        const data: Media[] = await response.json();

        setRecommendations(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Failed to fetch recommendations:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();

    return () => controller.abort();
  }, [watchlist]);

  // Don't render anything when there's nothing to recommend.
  if (watchlist.length === 0) {
    return null;
  }

  if (loading) {
    return <MediaGridSkeleton variant="carousel" count={10} title={title} />;
  }

  return (
    <MediaGrid variant={gridType} title={title}>
      {recommendations.map((media) => (
        <MediaPosterCard
          key={`${media.media_type}-${media.id}`}
          media={media}
        />
      ))}
    </MediaGrid>
  );
}
