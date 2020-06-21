import React from "react";
import "./loader.scss";

export default function Loader() {
  return (
    <div className="loader">
      {[1, 2, 3, 4].map((item) => (
        <span key={String(item)} />
      ))}
    </div>
  );
}
