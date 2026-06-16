import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./slices/watchlistSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      watchlist: watchlistReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
