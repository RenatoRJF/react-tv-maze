import { LOAD_SHOWS } from "../types/shows";
import showsData from "../../services/mock-shows";

export function loadShows(payload) {
  return {
    type: LOAD_SHOWS,
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
