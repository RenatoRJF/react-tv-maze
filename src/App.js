import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./components/Main";
import EpisodeDetails from "./components/EpisodeDetails";
import ShowDetails from "./components/ShowDetails";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/show/:showId/season/:seasonNumber" exact>
          <ShowDetails />
        </Route>
        <Route
          path="/show/:showId/season/:seasonNumber/episode/:episodeNumber"
          exact
        >
          <EpisodeDetails />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}
