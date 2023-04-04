import React from 'react'

import { MasonryGrid } from "../components";
import { useEffect, useState } from "react";
import supabase from "@/config/supabaseClient";

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

  const renderFilters = filters.map(({label, value}) => 
    <li key={value}>
      <button 
        className={`text-xl ${value === filter ? "text-white" : "text-[#888]"}`}
        onClick={() => setFilter(value)}
        >
        {label}
      </button>
    </li>
    )
  const fetchVisuals = async () => {
      setLoading(true)

      let { data, error }: any = {};

      if (filter === "all") {
        ({ data, error } = await supabase.from("visuals").select());
      } else {
        ({ data, error } = await supabase.from("visuals").select().eq('type', filter));
      }
    
      error && console.error(error)
      data && setVisuals(data as any);

      setLoading(false)
    };

    useEffect(() => {
      fetchVisuals();
  }, [filter]);

  return (
  <div className="px-24 flex flex-col gap-4">
    <div className='flex'>
      <ul className='flex flex-wrap gap-2 items-end'>
        {renderFilters}
      </ul>
      <form className='ml-auto w-full max-w-lg'>   
        <input type="text" placeholder="Type here" className="rounded-md input w-full p-3 px-6 bg-[] text-white" />
      </form>
    </div>
    <div className='bg-[] w-full h-0.5'/>
    {loading ? <h1>loading...</h1> : null}

    {!loading && !visuals.length ? <h1>No Results.</h1> : null}
    
    {!loading ? <MasonryGrid visuals={visuals} />: null}
  </div>
  )
}

export default visuals