import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WatchlistItem, Media, MediaDetails, Episode } from "../../types/media";
import { RootState } from "../store";

type WatchlistState = {
  items: WatchlistItem[];
};

const initialState: WatchlistState = {
  items: [],
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (
      state,
      action: PayloadAction<{
        media: Media | MediaDetails;
        episode?: Episode | null;
      }>,
    ) => {
      const { media, episode = null } = action.payload;

      const exists = state.items.some((item) => {
        if (episode) {
          return item.episode?.id === episode.id;
        }

        return item.episode === null && item.media.id === media.id;
      });

      if (!exists) {
        state.items.push({
          media,
          episode,
          addedAt: Date.now(),
        });
      }
    },
    removeFromWatchlist: (
      state,
      action: PayloadAction<{
        media?: Media | MediaDetails;
        episode?: Episode | null;
      }>,
    ) => {
      const { media, episode } = action.payload;

      if (episode) {
        // Remove only this specific episode
        state.items = state.items.filter(
          (item) => item.episode?.id !== episode.id,
        );
        return;
      }

      if (media) {
        // Remove only the standalone media entry.
        // Do NOT remove episodes belonging to this media.
        state.items = state.items.filter(
          (item) => !(item.episode === null && item.media.id === media.id),
        );
      }
    },
    clearWatchlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, clearWatchlist } =
  watchlistSlice.actions;

// export const selectWatchlistItems = (state: RootState) => state.watchlist.items;

export const selectIsOnWatchlist = (
  state: RootState,
  media: Media | MediaDetails,
  episode?: Episode | null,
) => {
  if (episode) {
    return state.watchlist.items.some(
      (item) => item.episode?.id === episode.id,
    );
  }

  return state.watchlist.items.some(
    (item) => item.episode == null && item.media.id === media.id,
  );
};

export default watchlistSlice.reducer;
