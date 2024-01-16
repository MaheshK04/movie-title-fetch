import React, { useState } from "react";
import { useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";
const API_URL = "https://omdbapi.com?apikey=daefecc2";

const movie1 = {
  Title: "Spiderman in Cannes",
  Year: "2016",
  imdbID: "tt5978586",
  Type: "movie",
  Poster: "N/A",
};
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);

    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    }
    else {
      setMovies([]);
    }
  };

  useEffect(() => {
    searchMovies("spiderman");
  }, []);
  return (
    <div className="app">
      <h1>Movie Posters</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        ></input>
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchItem)}></img>
      </div>

      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie}></MovieCard>
          ))}
        </div>
      ) : (
        <div>
          <h2>No movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
