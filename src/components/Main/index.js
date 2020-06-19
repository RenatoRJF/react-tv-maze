import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchShows } from "../../store/actions/shows";

import "./main.scss";

function App({ loadShows, shows = [] }) {
  useEffect(() => {
    loadShows();
  }, [loadShows]);

  return (
    <div className="main">
      <header className="main__header">
        <h1>shows</h1>
      </header>

      <div className="shows__list">
        {shows.map((show) => (
          <Link
            key={show.id}
            to={`/show/${show.id}/season/1`}
            className="shows__card"
          >
            <img src={show.image} alt="show" />
            <h4>{show.title}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    shows: state.shows,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadShows: () => dispatch(fetchShows()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
