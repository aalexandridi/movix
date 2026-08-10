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
      const itemId = action.payload.episode?.id ?? action.payload.media.id;

      const exists = state.items.some((item) => {
        const existingId = item.episode?.id ?? item.media.id;
        return existingId === itemId;
      });

      if (!exists) {
        state.items.push({
          media: action.payload.media,
          episode: action.payload.episode || null,
          addedAt: Date.now(),
        });
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => (item.episode?.id ?? item.media.id) !== action.payload,
      );
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
  const id = episode?.id ?? media.id;

  return state.watchlist.items.some((item) => {
    const existingId = item.episode?.id ?? item.media.id;
    return existingId === id;
  });
};

export default watchlistSlice.reducer;
