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
}) {
  const { showId, seasonNumber } = useParams();
  const [currentSeason, setCurrentSeason] = useState(Number(seasonNumber));

  useEffect(
    function handleLoadSeasons() {
      (async () => {
        if (seasons?.length === 0) {
          await loadSeasons(showId);
        }
      })();
    },
    [loadSeasons, seasons, showId]
  );

  useEffect(
    function handleLoadEpisodes() {
      (async () => {
        const season = seasons.find(
          (season) => season.number === Number(currentSeason)
        );

        if (!episodes[currentSeason] && season) {
          await loadEpisodes(season.id, currentSeason);
        }
      })();
    },
    [currentSeason, episodes, loadEpisodes, seasons, setSeason]
  );

  const handleChangeSeason = useCallback(
    (seasonId, seasonNum) => {
      (async () => {
        setCurrentSeason(seasonNum);

        if (!episodes[seasonNum]) {
          await loadEpisodes(seasonId, seasonNum);
        }
      })();
    },
    [episodes, loadEpisodes]
  );

  return (
    <div className="layout">
      {children}

      <Seasons
        data={seasons}
        selectedSeason={currentSeason}
        onSelectSeason={handleChangeSeason}
      />

      <EpisodesList episodes={episodes[currentSeason]} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    seasons: state.seasons,
    episodes: state.episodes,
    currentSeason: state.currentSeason,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSeasons: (id) => dispatch(getSeasons(id)),
    loadEpisodes: (seasonId, seasonNumber) => {
      return dispatch(getEpisodes(seasonId, seasonNumber));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
