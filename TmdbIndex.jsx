import Content from "./src/Content";
import FilterElements from "./src/FilterElements";
import Navbar from "./src/Navbar";
import Pagination from "./src/Pagination";
import { useState } from "react";
import { TmdbContext } from "./src/TmdbContext";

export default function TmdbIndex() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const [moviesList, setMoviesList] = useState([]);

  // create key in localStorage if it does not exist
  const checkLocalStorage = localStorage.getItem("myList");
  if (checkLocalStorage === null || checkLocalStorage === "")
    localStorage.setItem("myList", JSON.stringify([]));

  const [listUrl, setListUrl] = useState("movie/popular?");
  const [listTitle, setListTitle] = useState("popular movies");
  const [filters, setFilters] = useState({
    search: "",
    genre: "all",
  });
  const [open, setOpen] = useState(false);
  const [movieInfoForModalWindow, setMovieInfoForModalWindow] = useState({
    id: 0,
    poster_path: "",
    title: "",
    rating: 0,
    overview: "",
    genre: [],
    release_date: "",
  });
  const [myListInLocalStorage, setMyListInLocalStorage] = useState(
    JSON.parse(localStorage.getItem("myList"))
  );
  const [showPagination, setShowPagination] = useState(true);

  return (
    <TmdbContext.Provider
      value={{
        page,
        setPage,
        totalPages,
        setTotalPages,
        moviesList,
        setMoviesList,
        filters,
        setFilters,
        listUrl,
        setListUrl,
        setListTitle,
        open,
        setOpen,
        movieInfoForModalWindow,
        setMovieInfoForModalWindow,
        myListInLocalStorage,
        setMyListInLocalStorage,
        showPagination,
        setShowPagination,
      }}
    >
      <div className="tmdb-bg w-full text-white">
        <Navbar />
        <FilterElements />
        <div className="flex justify-center m-8 sm:text-7xl text-4xl text-center text-teal-500 font-bold tracking-widest ">
          <h1>{listTitle.toUpperCase()}</h1>
        </div>
        <Content />
        <Pagination />
      </div>
    </TmdbContext.Provider>
  );
}
