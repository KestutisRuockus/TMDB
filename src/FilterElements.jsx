import { useContext, useEffect, useState } from "react";
import { TmdbContext } from "./TmdbContext";

export default function FilterElements() {
  const [moviesGenriesList, setMoviesGenriesList] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWUzMmVlNTM2Y2JiMTg5MDJhYjUyNDkxMzFmNGU3ZiIsInN1YiI6IjYyZDcyMTQ2NmJlYWVhMDA0YzM1NjI2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gICniYLTW8OBAczVNLw7ATkeVoZTL7ivc73FQDuJzhg",
      },
    };

    fetch("https://api.themoviedb.org/3/genre/movie/list", options)
      .then((response) => response.json())
      .then((data) => setMoviesGenriesList(data.genres));
  }, []);

  const context = useContext(TmdbContext);

  function getMoviesByGenre(e) {
    const filteredListTitle = moviesGenriesList.filter(
      (genre) => genre.id === e.target.value
    );

    context.setPage(1);
    context.setListTitle(
      e.target.value === "all"
        ? "popular movies"
        : `${filteredListTitle} movies`
    );
    context.setFilters({
      genre: e.target.value,
    });
    context.setListTitle(
      `${
        moviesGenriesList.find((genre) => genre.id == e.target.value).name
      } movies`
    );
    context.setListUrl(
      e.target.value === "all"
        ? "movie/upcoming?"
        : `discover/movie?${import.meta.env.REACT_API_KEY}&with_genres=${
            e.target.value
          }&`
    );
  }

  function searchText(e) {
    context.setFilters({ search: e.target.value });
  }

  const handleSearch = () => {
    if (context.filters.search !== "") {
      context.setPage(1);
      context.setListTitle(`'${context.filters.search}' results`);
      context.setListUrl(
        `search/movie?query=${context.filters.search}&`
      );
      context.setFilters({ search: "" });
    }
  } 

  return (
    <div className="flex gap-2 flex-wrap justify-center items-center pb-8">
      {/* Search elements */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <input
          onKeyDown={(e) => {
            if(e.key === 'Enter') {
              handleSearch();
            }
          }}
          value={context.filters.search}
          onChange={searchText}
          className="px-2 mr-2 rounded-md border-4 border-teal-500 text-[#0d253f] font-semibold focus:outline-none"
          type="text"
          placeholder="Search"
        />
        <button
          onClick={handleSearch}
          className="text-[#0d253f] font-bold rounded-md bg-white px-4 border-4 border-teal-500 hover:bg-sky-950 hover:text-white transition-all duration-300"
        >
          Search
        </button>
      </div>
      {/* Select genre element */}
      <div>
        <select
          onChange={getMoviesByGenre}
          className="text-[#0d253f] font-bold rounded-md bg-white px-2 border-4 border-teal-500 hover:bg-sky-950 hover:text-white focus:outline-none transition-all duration-300"
        >
          {moviesGenriesList.map((genre) => (
            <option
              onChange={getMoviesByGenre}
              id={genre.id}
              key={`genre-${genre.id}`}
              value={genre.id}
            >
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
