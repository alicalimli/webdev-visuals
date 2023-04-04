import React from 'react'

import { MasonryGrid } from "../components";
import { useEffect, useState } from "react";
import supabase from "@/config/supabaseClient";

interface visualsProps {}

const visuals = ({}: visualsProps) => {
  const [visuals, setVisuals] = useState<any[]>([]);

  const fetchVisuals = async () => {
      const { data, error } = await supabase.from("visuals").select();

      error && console.error(error)
      data && setVisuals(data as any);
    };

    useEffect(() => {
      fetchVisuals();
    }, []);

  return (
  <div className="px-24 flex flex-col gap-4">
    <div className='flex'>
      <form className='ml-auto w-full max-w-lg'>   
        <input type="text" placeholder="Type here" className="rounded-md input w-full p-3 px-6 bg-[] text-white" />
      </form>
    </div>
    <div className='bg-[] w-full h-0.5'/>
    <MasonryGrid visuals={visuals} />
  </div>
  )
}

export default visuals