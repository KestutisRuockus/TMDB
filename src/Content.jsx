import { useEffect, useContext, useState } from "react";
import MovieCard from "./MovieCard";
import { TmdbContext } from "./TmdbContext";
import Modal from "./Modal";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_AUTHORIZATION,
  },
};

export default function Content() {
  const context = useContext(TmdbContext);
  const [filteredMoviesList, setFilteredMoviesList] = useState([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/${context.listUrl}page=${context.page}`;
    if (context.listUrl !== "") {
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          context.setMoviesList(data.results);
          context.setTotalPages(data.total_pages);
        })
        .catch((err) => console.error(err));
    }
  }, [context.page, context.listUrl, context.filters.genre]);

  useEffect(() => {
    setFilteredMoviesList(context.moviesList);
  }, [
    context.filters.search,
    context.moviesList,
    context.myListInLocalStorage,
  ]);

  return (
    <div className="flex flex-wrap justify-center m-auto my-8 py-8 md:gap-8 gap-3 md:w-4/5 w-full min-h-screen rounded-md relative z-10">
      {filteredMoviesList.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
      <Modal onClose={() => context.setOpen(false)} />
    </div>
  );
}
