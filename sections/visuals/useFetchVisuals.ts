import React, { useCallback, useRef } from "react";
import { useEffect, useState } from "react";

import supabase from "@/config/supabaseClient";

const useFetchVisuals = () => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [visuals, setVisuals] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [visualsCount, setVisualsCount] = useState(0);

  const hasMore = visualsCount > visuals.length;
  const maxItemsPerPage = 10;

  const resetPagination = () => {
    setVisuals([]);
    setPageIndex(0);
  };

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

  const nextPage = () => {
    setPageIndex((state) => state + 1);
  };

  const resetSearch = () => {
    setSearchTerm("");
    resetPagination();
  };

  const searchVisual = (searchValue: string) => {
    if (searchValue === searchTerm) return;

    setSearchTerm(searchValue);
    resetPagination();
  };

  const changeFilter = (filterValue: string) => {
    if (filterValue === filter) return;

    resetPagination();
    setFilter(filterValue);
  };

  useEffect(() => {
    fetchVisuals();
  }, [pageIndex, filter, searchTerm]);

  return {
    changeFilter,
    searchVisual,
    resetSearch,
    nextPage,
    loading,
    visuals,
    visualsCount,
    hasMore,
    searchTerm,
    filter,
  };
};

export default useFetchVisuals;
