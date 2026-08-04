import { Episode } from "@/types/media";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EpisodeDetailsPanelState {
  isOpen: boolean;
  episode: Episode | null;
}

const initialState: EpisodeDetailsPanelState = {
  isOpen: false,
  episode: null,
};

export const episodeDetailsPanelSlice = createSlice({
  name: "episodeDetailsPanel",
  initialState,
  reducers: {
    openEpisodeDetails: (state, action: PayloadAction<Episode>) => {
      state.isOpen = true;
      state.episode = action.payload;
    },

    closeEpisodeDetails: (state) => {
      state.isOpen = false;
      state.episode = null;
    },
  },
});

export const { openEpisodeDetails, closeEpisodeDetails } =
  episodeDetailsPanelSlice.actions;

export default episodeDetailsPanelSlice.reducer;
