import { useContext, useState } from "react";
import { TmdbContext } from "./TmdbContext";

export default function Navbar() {
  function setStatesOnNavbarLinkClicked(
    searchText,
    listTitle,
    listUrl,
    showPagination
  ) {
    context.setPage(1);
    context.setFilters({ search: searchText });
    context.setListTitle(`${listTitle} movies`);
    context.setListUrl(listUrl);
    setOpen(false);
    context.setOpen(false);
    context.setShowPagination(showPagination);
  }

  const context = useContext(TmdbContext);

  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full lg:w-4/5 flex md:justify-around items-center md:pl-0 pl-8 p-2 first-letter: m-auto box-border relative">
      <div 
        onClick={() => {setStatesOnNavbarLinkClicked("", "popular", "movie/popular?", true);}}
        className="bg-white rounded-full p-4 hover:opacity-60 cursor-pointer">
        <img
          className="w-16 h-16 bg-white"
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          alt="TMDB logo"
        />
      </div>
      <ul
        className={`md:w-auto w-full flex flex-col md:flex-row max-md:absolute max-md:z-30 z-0 right-0 ${
          open ? "right-[0]" : "top-[-400px] z-10"
        }  top-0 justify-center items-center text-center min-[860px]:gap-12 min-[800px]:gap-10 gap-8 text-2xl font-bold max-md:bg-teal-900 py-8 px-2 rounded-b-3xl transition-all duration-500`}
      >
        <li
          onClick={() => {
            setStatesOnNavbarLinkClicked(
              "",
              "Top Rated",
              "movie/top_rated?",
              true
            );
          }}
          className="cursor-pointer hover:scale-125  hover:text-teal-500 transition-all duration-300"
        >
          Top Rated
        </li>
        <li
          onClick={() => {
            setStatesOnNavbarLinkClicked("", "popular", "movie/popular?", true);
          }}
          className="cursor-pointer hover:scale-125  hover:text-teal-500 transition-all duration-300"
        >
          Popular
        </li>
        <li
          onClick={() => {
            setStatesOnNavbarLinkClicked(
              "",
              "Trending",
              "trending/movie/day?",
              true
            );
          }}
          className="cursor-pointer hover:scale-125  hover:text-teal-500 transition-all duration-300"
        >
          Trending
        </li>
        <li
          onClick={() => {
            setStatesOnNavbarLinkClicked(
              "",
              "Upcoming",
              "movie/upcoming?",
              true
            );
          }}
          className="cursor-pointer hover:scale-125  hover:text-teal-500 transition-all duration-300"
        >
          Upcoming
        </li>
        <li
          onClick={() => {
            setStatesOnNavbarLinkClicked("", "My list", "", false);
            context.setMoviesList(context.myListInLocalStorage);
          }}
          className="cursor-pointer hover:scale-125  hover:text-teal-500 transition-all duration-300"
        >
          My List
        </li>
      </ul>

      <div
        onClick={() => setOpen(!open)}
        className="text-3xl absolute md:hidden max-[400px]:right-5 top-4 right-4 z-40 "
      >
        {open ? (
          <i className="fa-regular fa-rectangle-xmark text-white cursor-pointer"></i>
        ) : (
          <i className="fa-solid fa-bars text-white cursor-pointer"></i>
        )}
      </div>
    </nav>
  );
}
