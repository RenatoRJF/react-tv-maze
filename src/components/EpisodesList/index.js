import React from "react";
import "./episodes-list.scss";

export default function EpisodesList({ episodes }) {
  return (
    <div className="episodes__list">
      {Array.isArray(episodes) &&
        episodes.map(({ id, image, name, number }) => (
          <div className="episode" key={id}>
            <div className="image">
              <img src={image?.medium} alt="episode" />
            </div>

            <h4>{`${number} - ${name}`}</h4>
          </div>
        ))}
    </div>
  );
}
