import React from "react";
import "./main.scss";

function App() {
  const shows = [
    {
      id: 6771,
      title: "The Powerpuff Girls",
      image:
        "https://static.tvmaze.com/uploads/images/medium_portrait/60/151357.jpg",
    },
    {
      id: 2102,
      title: "Dragon Ball",
      image:
        "https://static.tvmaze.com/uploads/images/medium_portrait/11/29189.jpg",
    },
    {
      id: 590,
      title: "Pokémon",
      image:
        "https://static.tvmaze.com/uploads/images/medium_portrait/97/243593.jpg",
    },
    {
      id: 555,
      title: "Avatar: The Last Airbender",
      image:
        "https://static.tvmaze.com/uploads/images/medium_portrait/79/199224.jpg",
    },
    {
      id: 672,
      title: "Phineas and Ferb",
      image:
        "https://static.tvmaze.com/uploads/images/medium_portrait/5/14778.jpg",
    },
    {
      id: 13822,
      title: "Stitch!",
      image:
        "https://static.tvmaze.com/uploads/images/medium_portrait/47/118712.jpg",
    },
  ];

  return (
    <div className="main">
      <header className="main__header">
        <h1>shows</h1>
      </header>

      <div className="shows__list">
        {shows.map((show) => (
          <div className="shows__card" key={show.id}>
            <img src={show.image} alt="show" />
            <h4>{show.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
