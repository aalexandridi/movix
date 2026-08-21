"use client";

import MediaCard from "@/components/ui/Cards/MediaCard";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import { MediaGridType } from "@/components/ui/MediaGrid/MediaGrid.types";
import { useAppSelector } from "@/store/hooks";

export default function WatchlistContainer({
  title,
  gridType = "grid",
}: {
  title: string;
  gridType: MediaGridType;
}) {
  const watchlist = useAppSelector((state) => state.watchlist.items);
  return (
    <>
      {watchlist.length > 0 && (
        <MediaGrid
          variant={gridType}
          title={title}
          layoutClass="episodes"
          className="my-4 py-4"
        >
          {watchlist.map((item) => (
            <MediaCard
              key={item.episode ? item.episode.id : item.media.id}
              media={item.media}
              episode={item.episode}
            />
          ))}
        </MediaGrid>
      )}
    </>
  );
}
