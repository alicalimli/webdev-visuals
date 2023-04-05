import React from 'react'

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

  const renderFilters = filters.map(({label, value}) => 
    <li key={value}>
      <button 
        className={`
          ${value === filter ? "bg-accent-shaded" : "bg-bg-secondary"}
          rounded-lg p-2 px-4 text-md text-white hover:bg-opacity-80 duration-200
        `}
        onClick={() => setFilter(value)}
        >
        {label}
      </button>
    </li>
    )

  const fetchVisuals = async () => {
    setLoading(true);
    let query = supabase
      .from('visuals')
      .select()
    
    const newSearchTerm = searchTerm.replace(/\s+/g, " & ");

    if (newSearchTerm)  { query = query.textSearch('title', newSearchTerm) }
    if (filter && filter !== "all") { query = query.eq('type', filter) }
  
    const { data, error } = await query

    error && console.error(error)
    data && setVisuals(data as any);

    setLoading(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchVisuals();
  };


  useEffect(() => {
    fetchVisuals();
  }, [ filter ]);

  return (
  <div className="px-vw-32 flex flex-col gap-4">
      <ul className='flex overflow-x-auto gap-2 items-end'>
        {renderFilters}
      </ul>
      <form onSubmit={handleSubmit} className='w-full'>   
          <input
            type="text"
            placeholder="Search Visuals"
            className="rounded-md input w-full p-3 px-6 bg-bg-secondary text-white"
            value={searchTerm}
            onChange={handleSearch}
          />
      </form>
    <div className='bg-[] w-full h-0.5'/>
    {loading ? <h1>loading...</h1> : null}

    {!loading && !visuals.length ? <h1>No Results.</h1> : null}
    
    {!loading ? <MasonryGrid visuals={visuals} />: null}
  </div>
  )
}

export default visuals