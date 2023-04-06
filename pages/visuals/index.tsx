import React, { useCallback, useRef } from 'react'

import { MasonryGrid } from "../../components";
import { useEffect, useState } from "react";
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
  const maxItemsPerPage = 2
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
  } ,[ loading ])

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

  useEffect(() => {
    fetchVisuals()
  }, [pageIndex, filter, searchTerm])

  return (
  <div className="px-vw-32 flex flex-col gap-4" >
      <ul className='flex overflow-x-auto gap-2 items-end'>
        {renderFilters}
      </ul>
      <form onSubmit={handleSubmit} className='w-full'>   
          <input
            type="text"
            placeholder="Search Visuals"
            className="rounded-md input w-full p-3 px-6 bg-bg-secondary text-white"
          />
      </form>
    <div className='w-full h-0.5'/>
    {loading ? <h1>loading...</h1> : null}

    {!loading && !visuals.length ? <h1>No Results.</h1> : null}
    
    <MasonryGrid visuals={visuals} lastVisualRef={lastVisualRef} />

  </div>
  )
}

export default visuals