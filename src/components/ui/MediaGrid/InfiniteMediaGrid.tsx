"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import { Media } from "@/types/media";
import MediaGridSkeleton from "./MediaGridSkeleton";

type Props = {
  initialMovies: Media[];
  genre?: number;
  mode: "discover" | "recommendations";
  movieId?: string;
};

export default function InfiniteMoviesGrid({
  initialMovies,
  genre,
  mode,
  movieId,
}: Props) {
  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);

  // FETCH MORE
  const loadMore = useCallback(async () => {
    if (loading || !hasMore || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setLoading(true);

    try {
      const url =
        mode === "discover"
          ? `/api/movie/discover?page=${page}&genreId=${genre ?? ""}`
          : `/api/movie/recommendations?movieId=${movieId}&page=${page}`;

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
  }, [genre, hasMore, loading, page]);

  // INTERSECTION OBSERVER
  useEffect(() => {
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
  }, [page, genre, loading, loadMore]);

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
