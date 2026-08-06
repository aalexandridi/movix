import { Episode, EpisodeDetails, TvDetails } from "@/types/media";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EpisodeDetailsPanelState {
  isOpen: boolean;
  episodeDetails: EpisodeDetails | null;
  tvShowDetails: TvDetails | null;
}

const initialState: EpisodeDetailsPanelState = {
  isOpen: false,
  episodeDetails: null,
  tvShowDetails: null,
};

export const episodeDetailsPanelSlice = createSlice({
  name: "episodeDetailsPanel",
  initialState,
  reducers: {
    openEpisodeDetails: (
      state,
      action: PayloadAction<{
        episodeDetails: EpisodeDetails;
        tvShowDetails: TvDetails;
      }>,
    ) => {
      state.isOpen = true;
      state.episodeDetails = action.payload.episodeDetails;
      state.tvShowDetails = action.payload.tvShowDetails;
    },

    closeEpisodeDetails: (state) => {
      state.isOpen = false;
      state.episodeDetails = null;
      state.tvShowDetails = null;
    },
  },
});

export const { openEpisodeDetails, closeEpisodeDetails } =
  episodeDetailsPanelSlice.actions;

export default episodeDetailsPanelSlice.reducer;
