import api from "../../services/api";

import {
  LOAD_SHOWS,
  LOAD_CURRENT_SHOW,
  LOAD_SEASONS,
  LOAD_EPISODES,
  SET_CURRENT_EPISODE,
  SET_LOADER,
} from "../types/shows";
import showsData from "../../services/mock-shows";

export function loadShows(payload) {
  return {
    type: LOAD_SHOWS,
    payload,
  };
}

export function loadCurrentShow(payload) {
  return {
    type: LOAD_CURRENT_SHOW,
    payload,
  };
}

export function loadSeasons(payload) {
  return {
    type: LOAD_SEASONS,
    payload,
  };
}

export function loadEpisodes(payload) {
  return {
    type: LOAD_EPISODES,
    payload,
  };
}

export function setCurrentEpisode(payload) {
  return {
    type: SET_CURRENT_EPISODE,
    payload,
  };
}

export function setLoader(key, payload) {
  return {
    type: SET_LOADER,
    key,
    payload,
  };
}

export function fetchShows() {
  return (dispatch) => {
    dispatch(setLoader("shows", true));

    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(loadShows(showsData));
        dispatch(setLoader("shows", false));
        resolve();
      }, 1000);
    });
  };
}

export function getCurrentShow(showId) {
  return (dispatch) => {
    return api.get(`shows/${showId}`).then(({ data }) => {
      const { name, id, image, summary, type, genres } = data;

      dispatch(loadCurrentShow({ id, name, image, summary, type, genres }));
    });
  };
}

export function getSeasons(showId) {
  return (dispatch) => {
    return api.get(`shows/${showId}/seasons`).then(({ data }) => {
      const seasons = data.map(({ id, number }) => ({ id, number }));

      dispatch(loadSeasons({ key: showId, data: seasons }));
    });
  };
}

export function getEpisodes(seasonId, seasonNumber, showId) {
  return (dispatch) => {
    dispatch(setLoader("episodes", true));

    return api.get(`seasons/${seasonId}/episodes`).then(({ data }) => {
      const episodes = data.map(
        ({ id, name, number, image, summary, season }) => ({
          id,
          name,
          number,
          image,
          summary,
          season,
        })
      );

      dispatch(setLoader("episodes", false));

      dispatch(
        loadEpisodes({ key: `${seasonNumber}${showId}`, data: episodes })
      );
    });
  };
}

export function getEpisodeByNumber(showId, seasonNumber, episodeNumber) {
  return (dispatch) => {
    return api
      .get(
        `shows/${showId}/episodebynumber?season=${seasonNumber}&number=${episodeNumber}`
      )
      .then(({ data }) => {
        const { id, name, image, number, season, summary } = data;

        dispatch(
          setCurrentEpisode({ id, name, image, number, season, summary })
        );
      });
  };
}
