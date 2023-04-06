import React, { useState, Fragment, useRef, useCallback} from "react";
import Masonry from "react-masonry-css";

import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from "next/router";

interface MasonryGridProps {
  visuals: any[];
  lastVisualRef: any;
}

const MasonryGrid = ({ visuals, lastVisualRef }: MasonryGridProps) => {
  const router = useRouter()

  const [clickedVisual, setClickedVisual] = useState<any | null>(null);

  const handleClick = (visual: any) => {
    setClickedVisual(visual);
    router.push(`visuals/?visualId=${visual.id}`, `visuals/${visual.id}`, {scroll: false})
  };

  const handleClose = () => {
    setClickedVisual(null);
    router.push('visuals', undefined,  {scroll: false})
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
          <div 
            key={index} 
            className="my-masonry-grid_item group relative overflow-hidden rounded-md cursor-pointer"
            onClick={() => handleClick(visual)}
            >
            { visuals.length === index + 1 
              ? <img ref={lastVisualRef} src={visual.imageURL} alt={`Image ${index}`} />
              : <img src={visual.imageURL} alt={`Image ${index}`} />
            }
            <div className="absolute inset-0 duration-200 bg-black/30 flex justify-center gap-4 p-4 items-end opacity-0 group-hover:opacity-100" />
          </div>
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
