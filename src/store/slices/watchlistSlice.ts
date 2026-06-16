import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WatchlistItem, Media } from "../../types/media";

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
    addToWatchlist: (state, action: PayloadAction<Media>) => {
      const exists = state.items.some(
        (item) => item.media.id === action.payload.id,
      );

      if (!exists) {
        state.items.push({
          media: action.payload,
          addedAt: Date.now(),
        });
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.media.id !== action.payload,
      );
    },
    clearWatchlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, clearWatchlist } =
  watchlistSlice.actions;

export default watchlistSlice.reducer;
