import { LOAD_SHOWS, LOAD_CURRENT_SHOW } from "../types/shows";

const initialState = {
  shows: [],
  currentShow: null,
  currentSeason: 1,
  episodes: [],
  currentEpisode: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SHOWS:
      return { ...state, shows: action.payload };

    case LOAD_CURRENT_SHOW:
      return { ...state, currentShow: action.payload };

    default:
      return state;
  }
}
