import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import Seasons from "../Seasons";
import EpisodesList from "../EpisodesList";
import { getSeasons, getEpisodes } from "../../store/actions/shows";

export function Layout({
  children,
  seasons,
  episodes,
  loadSeasons,
  loadEpisodes,
  setSeason,
  isLoading,
}) {
  const { showId, seasonNumber } = useParams();
  const [currentSeason, setCurrentSeason] = useState(Number(seasonNumber));

  useEffect(
    function handleLoadSeasons() {
      (async () => {
        if (seasons[showId] === undefined) {
          await loadSeasons(showId);
        }
      })();
    },
    [loadSeasons, seasons, showId]
  );

  useEffect(
    function handleLoadEpisodes() {
      (async () => {
        const season =
          Array.isArray(seasons[showId]) &&
          seasons[showId].find(
            (season) => season.number === Number(currentSeason)
          );

        if (episodes[`${currentSeason}${showId}`] === undefined && season) {
          await loadEpisodes(season.id, currentSeason, showId);
        }
      })();
    },
    [currentSeason, episodes, loadEpisodes, seasons, setSeason, showId]
  );

  const handleChangeSeason = useCallback(
    (seasonId, seasonNum) => {
      (async () => {
        setCurrentSeason(seasonNum);

        if (episodes[`${seasonNum}${showId}`] === undefined) {
          await loadEpisodes(seasonId, seasonNum, showId);
        }
      })();
    },
    [episodes, loadEpisodes, showId]
  );

  return (
    <div className="layout">
      {children}

      <Seasons
        data={seasons[showId] || []}
        selectedSeason={currentSeason}
        onSelectSeason={handleChangeSeason}
      />

      <EpisodesList
        episodes={episodes[`${currentSeason}${showId}`]}
        isLoading={isLoading}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    seasons: state.seasons,
    episodes: state.episodes,
    currentSeason: state.currentSeason,
    isLoading: state.loader.episodes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSeasons: (id) => dispatch(getSeasons(id)),
    loadEpisodes: (seasonId, seasonNumber, showId) => {
      return dispatch(getEpisodes(seasonId, seasonNumber, showId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
