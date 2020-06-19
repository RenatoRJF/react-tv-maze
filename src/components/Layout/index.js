import React, { useEffect, useState } from "react";
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
}) {
  const { showId, seasonNumber } = useParams();
  const [selectedSeason, setSelectedSeason] = useState(1);

  useEffect(() => {
    (async () => {
      if (seasons.length === 0) {
        await loadSeasons(showId);
      }

      const season = seasons.find(
        (season) => season.number === Number(seasonNumber)
      );

      if (!episodes[selectedSeason] && season) {
        loadEpisodes(season.id, seasonNumber);
      }
    })();
  }, [
    episodes,
    loadEpisodes,
    loadSeasons,
    seasonNumber,
    seasons,
    selectedSeason,
    showId,
  ]);

  return (
    <div className="layout">
      {children}

      <Seasons data={seasons} selectedSeason={selectedSeason} />
      <EpisodesList episodes={episodes[selectedSeason]} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    seasons: state.seasons,
    episodes: state.episodes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSeasons: (id) => dispatch(getSeasons(id)),
    loadEpisodes: (seasonId, seasonNumber) =>
      dispatch(getEpisodes(seasonId, seasonNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
