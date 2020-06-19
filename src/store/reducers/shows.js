import {
  LOAD_SHOWS,
  LOAD_CURRENT_SHOW,
  LOAD_SEASONS,
  LOAD_EPISODES,
  SET_CURRENT_EPISODE,
} from "../types/shows";

const initialState = {
  shows: [],
  currentShow: null,
  seasons: [],
  episodes: {},
  currentEpisode: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SHOWS:
      return { ...state, shows: action.payload };

    case LOAD_CURRENT_SHOW:
      return { ...state, currentShow: action.payload };

    case LOAD_SEASONS:
      return { ...state, seasons: action.payload };

    case LOAD_EPISODES:
      return {
        ...state,
        episodes: {
          ...state.episodes,
          [action.payload.key]: action.payload.data,
        },
      };

    case SET_CURRENT_EPISODE:
      return { ...state, currentEpisode: action.payload };

    default:
      return state;
  }
}
