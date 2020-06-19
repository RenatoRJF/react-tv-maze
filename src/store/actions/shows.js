import api from "../../services/api";

import { LOAD_SHOWS, LOAD_CURRENT_SHOW } from "../types/shows";
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

export function fetchShows() {
  return (dispatch) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(loadShows(showsData));
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
