import React, { useCallback, useRef } from "react";
import { MasonryGrid } from "@/components";
import { AiOutlineLoading3Quarters, AiOutlineClose } from "react-icons/ai";

import useFetchVisuals from "./useFetchVisuals";

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

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const searchVal = e.target[0].value;
    searchVisual(searchVal);
  };

  const onSearchResetBtn = () => {
    formRef?.current?.reset();

    resetSearch();
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
    <div className="flex min-h-screen flex-col gap-4 px-vw-32">
      <header className="flex flex-col gap-4">
        {" "}
        <form ref={formRef} onSubmit={handleSubmit} className="relative w-full">
          <input
            type="text"
            placeholder="Search Visuals"
            className="input w-full rounded-full bg-bg-secondary p-3 px-6 text-white"
          />
          {searchTerm ? (
            <button
              onClick={onSearchResetBtn}
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-xl duration-100 hover:bg-bg-main"
            >
              <AiOutlineClose />
            </button>
          ) : null}
        </form>
        <ul className="flex items-end gap-2 overflow-x-auto">
          {renderFilters}
        </ul>
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
