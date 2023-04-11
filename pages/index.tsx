import React, { useCallback, useRef } from "react";

import { MasonryGrid } from "../components";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters, AiOutlineClose } from "react-icons/ai";

import supabase from "../config/supabaseClient";

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
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [visuals, setVisuals] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [visualsCount, setVisualsCount] = useState(0);

  const hasMore = visualsCount > visuals.length;
  const maxItemsPerPage = 10;
  const observer = useRef<any>(null);

  const lastVisualRef = useCallback(
    (visual: any) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageIndex((state: number) => state + 1);
        }
      });

      if (visual) observer.current.observe(visual);
    },
    [loading, hasMore]
  );

  const formRef = useRef(null);

  const resetPagination = () => {
    setVisuals([]);
    setPageIndex(0);
  };

  const renderFilters = filters.map(({ label, value }) => (
    <li key={value}>
      <button
        className={`
          ${value === filter ? "bg-accent-shaded" : "bg-bg-secondary"}
          text-md rounded-lg p-2 px-4 text-white duration-200 hover:bg-opacity-80
        `}
        onClick={() => {
          if (value === filter) return;

          resetPagination();
          setFilter(value);
        }}
      >
        {label}
      </button>
    </li>
  ));

  const fetchVisuals = async () => {
    setLoading(true);

    let query = supabase
      .from("visuals")
      .select("*", { count: "exact" })
      .range(
        pageIndex * maxItemsPerPage,
        pageIndex * maxItemsPerPage + (maxItemsPerPage - 1)
      );

    const newSearchTerm = searchTerm.replace(/\s+/g, " & ");

    if (newSearchTerm) {
      query = query.textSearch("title", newSearchTerm, {
        type: "websearch",
        config: "english",
      });
    }
    if (filter && filter !== "all") {
      query = query.eq("type", filter);
    }

    const { data, error, count } = await query;

    const shouldConcatinateVisuals = pageIndex > 0 ? true : false;

    error && console.error(error);
    data &&
      setVisuals((visuals) =>
        shouldConcatinateVisuals ? [...visuals, ...data] : [...data]
      );
    typeof count === "number" && setVisualsCount(count);

    setLoading(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const searchVal = e.target[0].value;

    if (searchVal === searchTerm) return;

    setSearchTerm(searchVal);
    resetPagination();
  };

  const resetSearch = () => {
    setSearchTerm("");
    formRef?.current?.reset();
    resetPagination();
  };

  useEffect(() => {
    fetchVisuals();
  }, [pageIndex, filter, searchTerm]);

  return (
    <div className="flex min-h-screen flex-col gap-4 px-vw-32">
      <ul className="flex items-end gap-2 overflow-x-auto">{renderFilters}</ul>
      <form ref={formRef} onSubmit={handleSubmit} className="relative w-full">
        <input
          type="text"
          placeholder="Search Visuals"
          className="input w-full rounded-md bg-bg-secondary p-3 px-6 text-white"
        />
        {searchTerm ? (
          <button
            onClick={resetSearch}
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-xl duration-100 hover:bg-bg-main"
          >
            <AiOutlineClose />
          </button>
        ) : null}
      </form>
      <div className="h-0.5 w-full" />

      <MasonryGrid visuals={visuals} lastVisualRef={lastVisualRef} />

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
