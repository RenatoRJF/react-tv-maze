import React from "react";
import "./seasons.scss";

export default function Seasons({ data }) {
  return (
    <div className="seasons__list">
      {data.map((season, i) => (
        <span className={`season ${i === 0 ? "active" : ""}`} key={season}>
          {season}
        </span>
      ))}
    </div>
  );
}
