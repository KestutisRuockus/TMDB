import { useContext } from "react";
import { TmdbContext } from "./TmdbContext";

export default function Pagination() {
  const context = useContext(TmdbContext);
  const allPages = [];
  for (let i = 1; i <= context.totalPages; i++) {
    allPages.push(i);
  }

  return (
    <>
      {context.showPagination ? (
        <ul className=" text-black flex justify-center items-center gap-8 pb-8">
          <i
            onClick={() => {
              context.page != allPages[0]
                ? context.setPage(context.page - 1)
                : "";
            }}
            className="fa-solid fa-angles-left cursor-pointer text-orange-500 transition-all duration-300"
          ></i>
          {allPages.map((number) =>
            number < context.page - 2 || number > context.page + 2 ? (
              ""
            ) : (
              <li
                onClick={() => {
                  context.setPage(number);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`cursor-pointer ${
                  number === context.page
                    ? "text-orange-500 font-bold text-lg cursor-text"
                    : ""
                }`}
                key={`page-${number}`}
              >
                {number}
              </li>
            )
          )}
          <i
            onClick={() => {
              context.page != allPages[allPages.length - 1]
                ? context.setPage(context.page + 1)
                : "";
            }}
            className="fa-solid fa-angles-right cursor-pointer text-orange-500 transition-all duration-300"
          ></i>
        </ul>
      ) : (
        ""
      )}
    </>
  );
}
