import { useContext, useEffect, useState } from "react";
import noImage from "./assets/no-image.svg";
import { TmdbContext } from "./TmdbContext";

export default function MovieCard(movie) {
  const context = useContext(TmdbContext);
  const [movieId, setMovieId] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWUzMmVlNTM2Y2JiMTg5MDJhYjUyNDkxMzFmNGU3ZiIsInN1YiI6IjYyZDcyMTQ2NmJlYWVhMDA0YzM1NjI2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gICniYLTW8OBAczVNLw7ATkeVoZTL7ivc73FQDuJzhg",
      },
    };

    if (movieId) {
      fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options)
        .then((response) => response.json())
        .then((data) => {
          const genriesList = [];
          for (const genre in data.genres) {
            genriesList.push(data.genres[genre].name);
          }
          context.setMovieInfoForModalWindow({
            id: data.id,
            poster_path: data.poster_path,
            title: data.title,
            rating: data.vote_average.toFixed(1),
            overview: data.overview,
            genre: genriesList,
            release_date: data.release_date,
          });
        });
    }
  }, [movieId]);

  return (
    <div
      onClick={() => {
        setMovieId(movie.movie.id);

        context.setOpen(true);
      }}
      id={movie.movie.id}
      className="flex flex-col bg-gradient-to-r from-cyan-500 to-teal-500 w-44 h-80 rounded-xl cursor-pointer hover:scale-125 transition-all duration-300"
    >
      <div className="bg-slate-200 h-2/3 rounded-xl">
        <img
          className="w-full h-full rounded-t-lg"
          src={
            movie.movie.poster_path !== null
              ? `https://image.tmdb.org/t/p/w500/${movie.movie.poster_path}`
              : noImage
          }
          alt="movie cover"
        />
      </div>

      <div className="h-1/3 flex flex-col gap-2 justify-center pl-3 rounded-xl relative">
        <h1 className="text-lg font-bold text-black max-h-16 overflow-hidden leading-4 pb-1">
          {movie.movie.title}
        </h1>
        <p className="text-slate-600 font-meidum">{movie.movie.release_date}</p>
        <div className="text-nowrap font-bold text-yellow-500 absolute right-2 bottom-2 bg-black px- rounded-lg text-xs pr-2">
          <p className="pl-1 pr-0 mr-[0.35rem]">{movie.movie.vote_average ? +movie.movie.vote_average.toFixed(1) : movie.movie.rating}</p>
          <i className="fa-solid fa-star text-[0.5rem] pl-1 absolute bottom-1 right-1"></i>
        </div>
      </div>

    </div>
  );
}