import { useContext } from "react";
import noImage from "./assets/no-image.svg";
import { TmdbContext } from "./TmdbContext";

function saveMovieToLocalStorage(movie) {
  localStorage.setItem("myList", JSON.stringify(movie));
}

export default function Modal({ onClose, children }) {
  const context = useContext(TmdbContext);
  let genriesStr = context.movieInfoForModalWindow.genre.join(", ");

  const listInMyList = JSON.parse(localStorage.getItem("myList")); // list from local storage
  let movieExistInMyList;
  if (listInMyList) {
    movieExistInMyList = listInMyList.find(
      (movie) => movie.id === context.movieInfoForModalWindow.id
    );
  }

  return (
    <div
      onClick={onClose}
      className={`overflow-y-auto w-4/5 h-full fixed z-40 top-0 m-auto  bg-contain bg-center bg-no-repeat  ${
        context.open ? "visible" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full md:h-full h-fit md:px-8 md:py-0 py-12 flex flex-col md:flex-row justify-center items-center gap-12 relative bg-black/90"
      >
        <div className=" flex justify-center items-center gap-4 absolute max-[500px]:top-4 max-[500px]:right-4 top-8 right-12">
          {!movieExistInMyList ? (
            <i
              onClick={() => {
                const listFromLocalStorage = JSON.parse(
                  localStorage.getItem("myList") || []
                );
                const newList = [
                  ...listFromLocalStorage,
                  context.movieInfoForModalWindow,
                ];
                context.setMyListInLocalStorage(newList);
                saveMovieToLocalStorage(newList);
              }}
              className="fa-solid fa-heart-circle-plus text-4xl text-teal-500 cursor-pointer"
            ></i>
          ) : (
            <i
              onClick={() => {
                const myList = JSON.parse(localStorage.getItem("myList"));
                const newList = myList.filter(
                  (movie) => movie.id !== context.movieInfoForModalWindow.id
                );
                saveMovieToLocalStorage(newList);
                context.setMoviesList(newList);
                context.setMyListInLocalStorage(newList);
              }}
              className="fa-solid fa-heart-circle-minus text-4xl text-rose-500 cursor-pointer"
            ></i>
          )}

          <i
            onClick={onClose}
            className="fa-regular fa-rectangle-xmark text-white text-4xl cursor-pointer hover:text-teal-500 transition-colors duration-300"
          ></i>
        </div>
        {/* poster */}
        <div className="w-1/2 max-w-[300px] md:1/3 border-8 border-yellow-600 md:mt-0 mt-10">
          <img
            className="w-full bg-gray-300"
            src={
              context.movieInfoForModalWindow.poster_path !== null
                ? `https://image.tmdb.org/t/p/w500/${context.movieInfoForModalWindow.poster_path}`
                : noImage
            }
            alt="movie-poster"
          />
        </div>
        {/* info */}
        <div className="flex flex-col gap-8 w-3/5 md:2/5">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center justify-start items-start md:gap-0 gap-8">
            {/* title/genries */}
            <div>
              <h1 className="text-3xl font-bold">
                {context.movieInfoForModalWindow.title}
              </h1>
              <p className="text-sm text-teal-500 font-semibold">
                Genres: {genriesStr}
              </p>
            </div>
            {/* rating */}
            <div className="text-nowrap text-xl font-bold text-yellow-500">
              {+context.movieInfoForModalWindow.rating}
              <i className="fa-solid fa-star text-xs"></i>
            </div>
          </div>
          {/* overview */}
          <div>{context.movieInfoForModalWindow.overview}</div>
        </div>
        {children}
      </div>
    </div>
  );
}
