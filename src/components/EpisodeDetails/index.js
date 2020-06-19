import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import SanitizedHTML from "react-sanitized-html";

import { getEpisodeByNumber } from "../../store/actions/shows";
import Layout from "../Layout";
import DefaultImage from "../../images/default.jpg";
import "./episode-details.scss";

export function EpisodeDetails({ getEpisode, episode }) {
  const { showId, seasonNumber, episodeNumber } = useParams();
  const { image, name, summary } = episode || {};

  useEffect(() => {
    getEpisode(showId, seasonNumber, episodeNumber);
  }, [episodeNumber, getEpisode, seasonNumber, showId]);

  return (
    <Layout>
      <div className="episode__details">
        {episode && (
          <>
            <div className="episode__image">
              {!image ? (
                <img src={DefaultImage} alt="episode" />
              ) : (
                <img src={image?.original} alt="episode" />
              )}
            </div>

            <h1 className="episode__title">{name}</h1>

            <SanitizedHTML
              className="episode__description"
              allowedAttributes={{ a: ["href"] }}
              allowedTags={["a", "p", "em", "i", "strong", "span"]}
              html={summary || "No description"}
            />
          </>
        )}
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    episode: state.currentEpisode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEpisode: (showId, seasonNumber, episodeNumber) => {
      return dispatch(getEpisodeByNumber(showId, seasonNumber, episodeNumber));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeDetails);
