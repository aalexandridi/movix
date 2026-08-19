import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./slices/watchlistSlice";
import episodeDetailsPanelReducer from "./slices/EpisodeDetailsPanelSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedWatchlistReducer = persistReducer(
  persistConfig,
  watchlistReducer,
);

export const makeStore = () => {
  return configureStore({
    reducer: {
      watchlist: persistedWatchlistReducer,
      episodeDetailsPanel: episodeDetailsPanelReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }),
  });
};

// export const persistor = persistStore(makeStore);
// export type RootState = ReturnType<typeof makeStore.getState>;
// export type AppDispatch = typeof makeStore.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
