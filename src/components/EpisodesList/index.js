import React from "react";
import PropTypes from "prop-types";
import "./episodes-list.scss";
import { Link, useParams } from "react-router-dom";
import DefaultImage from "../../images/default.jpg";
import Loader from "../Loader";

export default function EpisodesList({ episodes, isLoading }) {
  const { showId, episodeNumber, seasonNumber } = useParams();

  return (
    <div className="episodes__list">
      {isLoading && <Loader />}

      {Array.isArray(episodes) &&
        episodes.map(({ id, image, name, number, season }) => {
          let isActive = number === 1;

          if (episodeNumber && Number(seasonNumber) === season) {
            isActive = Number(episodeNumber) === number;
          }

          if (number === null) return null;

          return (
            <Link
              className={`episode ${isActive ? "active" : ""}`}
              key={id}
              to={`/show/${showId}/season/${season}/episode/${number}`}
            >
              <div className="image">
                {image ? (
                  <img src={image?.medium} alt="episode" />
                ) : (
                  <img src={DefaultImage} alt="episode" />
                )}
              </div>

              <h4>{`${number} - ${name}`}</h4>
            </Link>
          );
        })}
    </div>
  );
}

EpisodesList.propTypes = {
  episodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.shape({
        medium: PropTypes.string,
        original: PropTypes.string,
      }),
      name: PropTypes.string.isRequired,
      season: PropTypes.number.isRequired,
      number: PropTypes.number,
    })
  ),
  isLoading: PropTypes.bool.isRequired,
};
