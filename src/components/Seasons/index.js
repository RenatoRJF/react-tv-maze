import React from "react";
import "./seasons.scss";

export default function Seasons({ data }) {
  return (
    <div className="seasons__list">
      {data.map(({ id, number }, i) => (
        <span className={`season ${i === 0 ? "active" : ""}`} key={id}>
          {`Season ${number}`}
        </span>
      ))}
    </div>
  );
}
