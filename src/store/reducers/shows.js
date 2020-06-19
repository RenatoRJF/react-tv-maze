import { LOAD_SHOWS } from "../types/shows";

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

    default:
      return state;
  }
}
