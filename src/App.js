import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./components/Main";
import EpisodeDetails from "./components/EpisodeDetails";
import ShowDetails from "./components/ShowDetails";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/show/:showId/season/:seasonNumber">
          <ShowDetails />
        </Route>
        <Route path="/episode/:id">
          <EpisodeDetails />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}
