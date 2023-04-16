import supabase from "@/config/supabaseClient";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchVisuals = async ({
  pageIndex,
  maxItemsPerPage,
  filter,
  searchTerm,
}: any) => {
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

  if (error) throw new Error(error.message);
  if (data)
    return {
      visuals: data,
      visualsCount: count,
    };
};

const useFetchVisuals = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const maxItemsPerPage = 10;

  const {
    data,
    hasNextPage: hasMore,
    isFetchingNextPage: loading,
    fetchNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["visuals", filter, searchTerm],
    queryFn: ({ pageParam = 0 }) => {
      const fetchVisualsParams = {
        pageIndex: pageParam,
        maxItemsPerPage,
        searchTerm,
        filter,
      };

      return fetchVisuals(fetchVisualsParams);
    },
    getNextPageParam: (lastPage: any, allPages: any) => {
      const maxPages = lastPage.visualsCount / maxItemsPerPage;
      const nextPage = allPages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
  });

  const nextPage = () => {
    fetchNextPage();
  };

  const resetSearch = () => {
    setSearchTerm("");
  };

  const searchVisual = (searchValue: string) => {
    if (searchValue === searchTerm) return;

    setSearchTerm(searchValue);
  };

  const changeFilter = (filterValue: string) => {
    if (filterValue === filter) return;

    setFilter(filterValue);
  };

  const visuals = data?.pages.flatMap((item) => item?.visuals) || [];
  const visualsCount = data?.pages[0]?.visualsCount || 0;

  return {
    changeFilter,
    searchVisual,
    resetSearch,
    visualsCount,
    nextPage,
    status,
    visuals,
    hasMore,
    searchTerm,
    filter,
  };
};

export default useFetchVisuals;
