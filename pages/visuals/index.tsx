import React, { useCallback, useRef } from 'react'

import { MasonryGrid } from "../../components";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters, AiOutlineClose } from "react-icons/ai";

import supabase from "../../config/supabaseClient";

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
  }
]

interface visualsProps {}

const visuals = ({}: visualsProps) => {
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [visuals, setVisuals] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageIndex, setPageIndex ] = useState(0)
  const [visualsCount, setVisualsCount] = useState(0)

  const hasMore = visualsCount > visuals.length 
  const maxItemsPerPage = 10
  const observer = useRef<any>(null)
  
  const lastVisualRef = useCallback((visual: any) => {
    if(loading) return;

    if(observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore) {
        setPageIndex((state: number) => state + 1)
      }
    })

    if(visual) observer.current.observe(visual)
  } ,[ loading, hasMore ])

  const resetPagination = () => {
    setVisuals([])
    setPageIndex(0)
  }
  
  const renderFilters = filters.map(({label, value}) => 
    <li key={value}>
      <button 
        className={`
          ${value === filter ? "bg-accent-shaded" : "bg-bg-secondary"}
          rounded-lg p-2 px-4 text-md text-white hover:bg-opacity-80 duration-200
        `}
        onClick={() => {
          resetPagination()
          setFilter(value)
        }}
        >
        {label}
      </button>
    </li>
    )

  const fetchVisuals = async () => {
    setLoading(true);
    let query = supabase
      .from('visuals')
      .select('*', { count: 'exact' })
      .range(pageIndex * maxItemsPerPage, pageIndex * maxItemsPerPage + (maxItemsPerPage - 1))

    const newSearchTerm = searchTerm.replace(/\s+/g, " & ");

    if (newSearchTerm)  { query = query.textSearch('title', newSearchTerm) }
    if (filter && filter !== "all") { query = query.eq('type', filter) }
  
    const { data, error, count } = await query

    error && console.error(error)
    data && setVisuals(visuals => [...visuals, ...data]);
    count && setVisualsCount(count)

    setLoading(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const searchVal = e.target[0].value
    setSearchTerm(searchVal)
    resetPagination()
  };

  const resetSearch = () => {
    setSearchTerm("")
    resetPagination();
  }

  useEffect(() => {
    fetchVisuals()
  }, [pageIndex, filter, searchTerm])

  return (
  <div className="px-vw-32 flex flex-col gap-4" >
      <ul className='flex overflow-x-auto gap-2 items-end'>
        {renderFilters}
      </ul>
      <form onSubmit={handleSubmit} className='w-full relative'>   
          <input
            type="text"
            placeholder="Search Visuals"
            className="rounded-md input w-full p-3 px-6 bg-bg-secondary text-white"
          />
        {searchTerm 
          ? <button 
              onClick={resetSearch}
              type="button" 
              className='absolute right-3 text-xl top-1/2 -translate-y-1/2 p-1 hover:bg-bg-main rounded-full duration-100'
              >
              <AiOutlineClose />
            </button>  
          : null}
      </form>
    <div className='w-full h-0.5'/>

    <MasonryGrid visuals={visuals} lastVisualRef={lastVisualRef} />

    {loading ? <AiOutlineLoading3Quarters className="mx-auto my-6 animate-spin text-4xl text-accent-primary" /> : null}

    {!loading && !visuals.length 
      ? <div className='flex flex-col items-center gap-8'>
          <img className='w-full max-w-xs' src="/no_results.svg" />
          <h2 className='text-2xl'>No Results Found.</h2>
        </div> 
      : null}
    

  </div>
  )
}

export default visuals