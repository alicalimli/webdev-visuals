import React, { useState, Fragment } from "react";
import Masonry from "react-masonry-css";

import { Dialog, Transition } from '@headlessui/react'
import Link from "next/link";
import { useRouter } from "next/router";

interface MasonryGridProps {
  visuals: any[];
}

const MasonryGrid = ({ visuals }: MasonryGridProps) => {
  const router = useRouter()

  const [clickedVisual, setClickedVisual] = useState<any | null>(null);

  const handleClick = (visual: any) => {
    setClickedVisual(visual);
  };

  const handleClose = () => {
    setClickedVisual(null);
    router.push('visuals')
  };

  return (
   <>
      <Masonry
        breakpointCols={{
          default: 3,
          1100: 2,
          650: 1,
        }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {visuals.map((visual, index) => (
          <Link
            href={`visuals/?visualId=${visual.id}`}
            as={`visuals/${visual.id}`}
          >
          <div 
            key={index} 
            className="my-masonry-grid_item group relative overflow-hidden rounded-md pb-4 cursor-pointer"
            onClick={() => handleClick(visual)}
            >
            <img src={visual.imageURL} alt={`Image ${index}`} />
            <div className="absolute inset-0 duration-200 bg-black/30 flex justify-center gap-4 p-4 items-end opacity-0 group-hover:opacity-100" />
          </div>
          </Link>
        ))}
      </Masonry>

      <Transition appear show={clickedVisual ? true : false} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="fixed p-4 z-20 flex justify-center items-center ">
                  <img
                    src={clickedVisual?.imageURL}
                    alt={`Image ${visuals.indexOf(clickedVisual)}`}
                    className="sm:max-h-[90vh] sm:max-w-[70vw]"
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
   </>
  );
};

export default MasonryGrid;
