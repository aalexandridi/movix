import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./slices/watchlistSlice";
import episodeDetailsPanelReducer from "./slices/EpisodeDetailsPanelSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      watchlist: watchlistReducer,
      episodeDetailsPanel: episodeDetailsPanelReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
