import React from "react";
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
