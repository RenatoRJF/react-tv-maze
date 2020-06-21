import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import SanitizedHTML from "react-sanitized-html";
import { animateScroll as scroll } from "react-scroll";
import { connect } from "react-redux";

import { getEpisodeByNumber } from "../../store/actions/shows";
import Layout from "../Layout";
import Breadcrumb from "../Breadcrumb";
import DefaultImage from "../../images/default.jpg";
import "./episode-details.scss";

export function EpisodeDetails({ getEpisode, episode }) {
  const { showId, seasonNumber, episodeNumber } = useParams();
  const { pathname } = useLocation();
  const { image, name, summary } = episode || {};

  useEffect(() => {
    scroll.scrollToTop();
  }, [pathname]);

  useEffect(() => {
    getEpisode(showId, seasonNumber, episodeNumber);
  }, [episodeNumber, getEpisode, seasonNumber, showId]);

  return (
    <Layout>
      <div className="episode__details">
        <Breadcrumb
          routes={[
            { name: "Home", path: "/" },
            {
              name: "Show page",
              path: `/show/${showId}/season/${seasonNumber}`,
            },
          ]}
        />

        {episode && (
          <>
            <div className="episode__image">
              {!image ? (
                <img src={DefaultImage} alt="episode" />
              ) : (
                <img src={image?.original} alt="episode" />
              )}
            </div>

            <div className="episode__summary">
              <h1 className="episode__title">{name}</h1>

              <SanitizedHTML
                className="episode__description"
                allowedAttributes={{ a: ["href"] }}
                allowedTags={["a", "p", "em", "i", "strong", "span"]}
                html={summary || "No description"}
              />
            </div>
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
