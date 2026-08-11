"use client";
import MenuDotsIcon from "@/components/icons/dots";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useRef, useState } from "react";
import { openEpisodeDetails } from "@/store/slices/EpisodeDetailsPanelSlice";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "@/store/slices/watchlistSlice";
import { Episode, Media, MediaDetails } from "@/types/media";
import { isMovie, isTvShowDetails } from "@/utils/media";
import { selectIsOnWatchlist } from "@/store/slices/watchlistSlice";
import { useRouter } from "next/navigation";
export default function MenuDots({
  episode = null,
  media,
}: {
  episode?: Episode | null;
  media: MediaDetails | Media;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const watchlist = useAppSelector((state) => state.watchlist.items);
  console.log(watchlist);
  // const isOnWatchlist = watchlist.some(
  //   (item) => (item.episode?.id ?? item.media.id) === episode.id,
  // );
  const isOnWatchlist = useAppSelector((state) =>
    selectIsOnWatchlist(state, media, episode),
  );
  console.log("isOnWatchlist==", isOnWatchlist);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const onOpenEpisodeDetails = async () => {
    if (isTvShowDetails(media) && episode) {
      const url = `/api/tvShow/${media.id}/season/${episode?.season_number}/episode/${episode.episode_number}`;
      const response = await fetch(url);
      const episodeDetails = await response.json();
      dispatch(openEpisodeDetails({ episodeDetails, tvShowDetails: media }));
    }
  };

  const toggleWatchlist = () => {
    setOpen(false);
    if (isOnWatchlist) {
      if (episode) dispatch(removeFromWatchlist({ episode }));
      else dispatch(removeFromWatchlist({ media }));
    } else {
      dispatch(addToWatchlist({ media, episode }));
    }
  };

  const onMoreInfo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setOpen(false);

    const href = isMovie(media) ? `/movie/${media.id}` : `/tvShow/${media.id}`;

    router.push(href);
  };
  return (
    <div className="relative z-3" ref={ref}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpen(!open);
        }}
      >
        <MenuDotsIcon></MenuDotsIcon>
      </button>
      <div
        className={`
          absolute
          left-0
          top-full
          z-50
          w-max
          max-h-80
          overflow-y-auto
          rounded-xl
          border
          border-neutral-700
          bg-neutral-900
          shadow-xl
          transition-all
          duration-200
          ${
            open
              ? "pointer-events-auto opacity-100 translate-y-0"
              : "pointer-events-none opacity-0 -translate-y-2"
          }
      `}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleWatchlist();
          }}
          className="
            block
            whitespace-nowrap
            w-full
            px-4
            py-3
            text-left
            transition
            hover:bg-neutral-800
          "
        >
          {isOnWatchlist ? "Remove from list" : "Add to my list"}
        </button>
        {episode ? (
          <button
            onClick={onOpenEpisodeDetails}
            className="
      block
      w-full
      px-4
      py-3
      text-left
      transition
      hover:bg-neutral-800
    "
          >
            Episode Details
          </button>
        ) : (
          <button
            onClick={onMoreInfo}
            className="
      block
      w-full
      px-4
      py-3
      text-left
      transition
      hover:bg-neutral-800
    "
          >
            More Info
          </button>
        )}

        {/* <button
          onClick={() => onOpenEpisodeDetails()}
          className="
          w-full
            block
            whitespace-nowrap
            px-4
            py-3
            text-left
            transition
            hover:bg-neutral-800
          "
        >
          {episode ? "Episode Details" : "More Info"}
        </button> */}
      </div>
    </div>
  );
}
