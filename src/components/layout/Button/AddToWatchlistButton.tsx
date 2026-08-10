"use client";

import Button from "@/components/layout/Button/button";
import PlusIcon from "@/components/icons/plus";
import { useAppDispatch } from "@/store/hooks";
import {
  addToWatchlist,
  removeFromWatchlist,
  selectIsOnWatchlist,
} from "@/store/slices/watchlistSlice";
import { Media, MediaDetails } from "@/types/media";
import { useAppSelector } from "@/store/hooks";
import CheckIcon from "@/components/icons/check-icon";
export default function AddToWatchlistButton({
  media,
  showText = true,
}: {
  media: MediaDetails | Media;
  showText?: boolean;
}) {
  const isOnWatchlist = useAppSelector((state) =>
    selectIsOnWatchlist(state, media),
  );
  const dispatch = useAppDispatch();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (isOnWatchlist) {
      dispatch(removeFromWatchlist(media.id));
    } else {
      dispatch(addToWatchlist({ media }));
    }
  };
  return (
    <Button
      variant="secondary"
      fontWeight="500"
      icon={
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
      }
      onClick={onClick}
    >
      {showText ? "My list" : ""}
    </Button>
  );
}
