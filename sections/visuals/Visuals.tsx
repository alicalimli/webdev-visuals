import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { MasonryGrid } from "@/components";
import {
  AiOutlineLoading3Quarters,
  AiOutlineClose,
  AiOutlineSearch,
} from "react-icons/ai";

import debounce from "lodash.debounce";
import useFetchVisuals from "./useFetchVisuals";
import FilterSelect from "./FilterSelect";

const filters = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "JavaScript",
    value: "javascript",
  },
  {
    label: "CSS",
    value: "css",
  },
  {
    label: "VSCode",
    value: "vscode",
  },
  {
    label: "HTML",
    value: "html",
  },
];

interface VisualsProps {}

const Visuals = ({}: VisualsProps) => {
  const {
    visuals,
    visualsCount,
    status,
    filter,
    nextPage,
    resetSearch,
    searchVisual,
    hasMore,
    changeFilter,
    searchTerm,
  } = useFetchVisuals();

  const loading = status === "loading";
  const observer = useRef<any>(null);

  const lastVisualRef = useCallback(
    (visual: any) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          nextPage();
        }
      });

      if (visual) observer.current.observe(visual);
    },
    [loading, hasMore]
  );

  const formRef = useRef<HTMLFormElement>(null);

  const onSearchResetBtn = () => {
    formRef?.current?.reset();

    resetSearch();
  };

  const handleInputChange = (e: any) => {
    searchVisual(e.target.value);
  };

  const renderFilters = filters.map(({ label, value }) => (
    <li key={value}>
      <button
        className={`
          ${
            value === filter
              ? "bg-accent-shaded border-transparent"
              : "bg-transparent border-slate-600/70"
          }
          text-md rounded-full p-1.5 px-6 text-white duration-200 hover:bg-opacity-80 border 
        `}
        onClick={() => {
          changeFilter(value);
        }}
      >
        {label}
      </button>
    </li>
  ));

  return (
    <div className="flex min-h-screen flex-col gap-8 px-vw-12 max-w-[1600px] mx-auto pt-12 xs:pt-24">
      <header className="flex flex-col gap-6 items-center justify-center">
        {" "}
        <h1 className="website-title font-bold fluid-3xl text-center text-slate-300">
          Web Development Visuals
        </h1>
        <div className="relative flex flex-col xs:flex-row xs:items-center w-full max-w-3xl bg-bg-secondary rounded-xl ">
          <div className="relative flex-1">
            <AiOutlineSearch className="absolute left-4 inset-0 my-auto text-xl" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search Visuals"
              className="input w-full bg-transparent p-3 pl-11 xs:p-5 xs:pl-11 text-white fluid-md rounded-xl "
            />
            {searchTerm ? (
              <button
                onClick={onSearchResetBtn}
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-bg-main rounded-full p-1.5 text-xl duration-100"
              >
                <AiOutlineClose className="text-sm" />
              </button>
            ) : null}
          </div>

          <div className="xs:ml-auto w-full h-0.5 xs:w-0.5 xs:h-8 bg-[#343a40]" />

          <FilterSelect changeFilter={changeFilter} />
        </div>
        {/* <ul className="flex items-end gap-2 overflow-x-auto">
          {renderFilters}
        </ul> */}
      </header>

      {visuals?.length ? (
        <MasonryGrid visuals={visuals} lastVisualRef={lastVisualRef} />
      ) : null}

      {loading ? (
        <AiOutlineLoading3Quarters className="mx-auto my-6 animate-spin text-4xl text-accent-primary" />
      ) : null}

      {!loading && visualsCount <= 0 ? (
        <div className="flex flex-col items-center gap-8">
          <img className="w-full max-w-xs" src="/no_results.svg" />
          <h2 className="text-2xl">No Results Found.</h2>
        </div>
      ) : null}
    </div>
  );
};

export default Visuals;
