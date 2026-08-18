"use client";

import MediaCard from "@/components/ui/Cards/MediaCard";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import { useAppSelector } from "@/store/hooks";

export default function MyStuffContent() {
  const watchlist = useAppSelector((state) => state.watchlist.items);
  return (
    <MediaGrid layoutClass="episodes" className="my-4 py-4">
      {watchlist.map((item) => (
        <MediaCard
          key={item.episode ? item.episode.id : item.media.id}
          media={item.media}
          episode={item.episode}
        ></MediaCard>
      ))}
    </MediaGrid>
  );
}
