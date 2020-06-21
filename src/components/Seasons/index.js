import React from "react";
import "./seasons.scss";

export default function Seasons({ data, selectedSeason, onSelectSeason }) {
  return (
    <div className="seasons__list">
      {Array.isArray(data) &&
        data.map(({ id, number }) => (
          <span
            className={`season ${
              Number(selectedSeason) === number ? "active" : ""
            }`}
            key={id}
            onClick={() => {
              onSelectSeason(id, number);
            }}
          >
            {`Season ${number}`}
          </span>
        ))}
    </div>
  );
}
