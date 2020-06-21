import {
  LOAD_SHOWS,
  LOAD_CURRENT_SHOW,
  LOAD_SEASONS,
  LOAD_EPISODES,
  SET_CURRENT_EPISODE,
  SET_LOADER,
} from "../types/shows";

const initialState = {
  shows: [],
  currentShow: null,
  seasons: {},
  episodes: {},
  currentEpisode: null,
  loader: {
    shows: false,
    episodes: false,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SHOWS:
      return { ...state, shows: action.payload };

    case LOAD_CURRENT_SHOW:
      return { ...state, currentShow: action.payload };

    case LOAD_SEASONS:
      return {
        ...state,
        seasons: {
          ...state.seasons,
          [action.payload.key]: action.payload.data,
        },
      };

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

    case SET_LOADER:
      return {
        ...state,
        loader: { ...state.loader, [action.key]: action.payload },
      };

    default:
      return state;
  }
}
