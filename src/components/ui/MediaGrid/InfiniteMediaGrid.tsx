"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import { Media } from "@/types/media";
import MediaGridSkeleton from "./MediaGridSkeleton";
import { isMovie } from "@/utils/media";

type Props = {
  initialMedia: Media[];
  genre?: number;
  mode: "discover" | "recommendations" | "search" | "";
  movieId?: string;
  mediaType?: "movie" | "tvShow" | "mixed";
  query?: string;
  enableInfiniteScroll?: boolean;
};

export default function InfiniteMediaGrid({
  initialMedia,
  genre,
  mode,
  movieId,
  mediaType = "movie",
  query,
  enableInfiniteScroll = true,
}: Props) {
  const [movies, setMovies] = useState(initialMedia);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);

  // FETCH MORE
  const loadMore = useCallback(async () => {
    if (!enableInfiniteScroll) return;
    if (loading || !hasMore || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setLoading(true);

    try {
      const url =
        mode === "discover"
          ? `/api/${mediaType}/discover?page=${page}&genreId=${genre ?? ""}`
          : mode === "recommendations"
            ? `/api/${mediaType}/recommendations?movieId=${movieId}&page=${page}`
            : `/api/search?query=${query}&page=${page}`;

      const res = await fetch(url);

      const data = await res.json();

      if (!data.results.length) {
        setHasMore(false);
      }

      setMovies((prev) => {
        // avoid duplicates
        const existingIds = new Set(prev.map((m) => m.id));
        const filtered = data.results.filter(
          (m: Media) => !existingIds.has(m.id),
        );

        return [...prev, ...filtered];
      });

      setPage((p) => p + 1);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [
    enableInfiniteScroll,
    genre,
    hasMore,
    loading,
    mediaType,
    mode,
    movieId,
    page,
    query,
  ]);

  // INTERSECTION OBSERVER
  useEffect(() => {
    if (!enableInfiniteScroll) return;
    const el = observerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "800px" },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [page, genre, loading, loadMore, enableInfiniteScroll]);

  return (
    <>
      <MediaGrid variant="grid" media={movies} />

      {loading && (
        <div className="grid-skeleton-overlay">
          <MediaGridSkeleton count={7} />
        </div>
      )}

      <div ref={observerRef} />
    </>
  );
}
