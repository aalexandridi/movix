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
import { useRouter } from "@/i18n/routing";
import PlusIcon from "@/components/icons/plus";
import CheckIcon from "@/components/icons/check-icon";
import InfoIcon from "@/components/icons/info-icon";
import { useLocale, useTranslations } from "next-intl";

export default function MenuDots({
  episode = null,
  media,
}: {
  episode?: Episode | null;
  media: MediaDetails | Media;
}) {
  const locale = useLocale();
  const c = useTranslations("common");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [openLeft, setOpenLeft] = useState(false);
  const dispatch = useAppDispatch();

  const isOnWatchlist = useAppSelector((state) =>
    selectIsOnWatchlist(state, media, episode),
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (!open || !ref.current || !popupRef.current) return;

    const frame = requestAnimationFrame(() => {
      if (!ref.current || !popupRef.current) return;

      const trigger = ref.current.getBoundingClientRect();
      const popup = popupRef.current.getBoundingClientRect();

      const rightEdge = trigger.left + popup.width;
      const leftEdge = trigger.right - popup.width;

      if (rightEdge > window.innerWidth && leftEdge >= 0) {
        setOpenLeft(true);
      } else {
        setOpenLeft(false);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  const onOpenEpisodeDetails = async () => {
    if (isTvShowDetails(media) && episode) {
      setOpen(false);
      const url = `/api/tv/${media.id}/season/${episode?.season_number}/episode/${episode.episode_number}?locale=${locale}`;
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
        ref={popupRef}
        className={`
          absolute
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
          ${openLeft ? "right-0" : "left-0"}
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
            flex
            items-center
            gap-2.5
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
          <span className="relative flex h-4 w-4 items-center justify-center">
            <span
              className={`absolute transition-all duration-300 ${
                isOnWatchlist ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
              }`}
            >
              <PlusIcon width={16} height={16} />
            </span>

            <span
              className={`absolute transition-all duration-300 ${
                isOnWatchlist ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
              }`}
            >
              <CheckIcon width={26} height={26} />
            </span>
          </span>
          {isOnWatchlist ? c("removeFromList") : c("addToList")}
        </button>
        {episode ? (
          <button
            onClick={onOpenEpisodeDetails}
            className="
              flex
              items-center
              gap-2.5
              block
              w-full
              px-4
              py-3
              text-left
              transition
              hover:bg-neutral-800
            "
          >
            <InfoIcon width={22} height={22}></InfoIcon>
            {c("episodeDetails")}
          </button>
        ) : (
          <button
            onClick={onMoreInfo}
            className="
              flex
              items-center
              gap-2.5
              block
              w-full
              px-4
              py-3
              text-left
              transition
              hover:bg-neutral-800
            "
          >
            <InfoIcon width={22} height={22}></InfoIcon>
            {c("moreInfo")}
          </button>
        )}
      </div>
    </div>
  );
}
