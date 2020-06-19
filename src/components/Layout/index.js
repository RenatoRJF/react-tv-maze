import React from "react";
import Seasons from "../Seasons";
import EpisodesList from "../EpisodesList";

export default function Layout({ children }) {
  return (
    <div className="layout">
      {children}

      <Seasons data={[]} />

      <EpisodesList episodes={[]} />
    </div>
  );
}
