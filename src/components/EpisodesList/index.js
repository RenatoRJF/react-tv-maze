import React from "react";
import "./episodes-list.scss";

export default function EpisodesList({ episodes }) {
  return (
    <div className="episodes__list">
      {episodes.map(({ id, image, name }) => (
        <div className="episode" key={id}>
          <div className="image">
            <img src={image} alt="episode" />
          </div>

          <h4>{name}</h4>
        </div>
      ))}
    </div>
  );
}
