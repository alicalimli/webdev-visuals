import React, { useState, Fragment, useRef, useCallback } from "react";
import Masonry from "react-masonry-css";

import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import supabase from "@/config/supabaseClient";


import {AiOutlineDownload, AiOutlineShareAlt, AiOutlineInfoCircle} from 'react-icons/ai'
import {BsCodeSlash} from 'react-icons/bs'
import { GoBrowser } from 'react-icons/go'

import {toast} from 'react-toastify'

const btnClass = `
  rounded-full w-fit p-2 px-4  xs:p-3 xs:px-6 flex gap-2 items-center
  bg-[#111] hover:bg-[#222] duration-200 fluid-md
`;

interface MasonryGridProps {
  visuals: any[];
  lastVisualRef: any;
}

const MasonryGrid = ({ visuals, lastVisualRef }: MasonryGridProps) => {
  const router = useRouter();

  const [clickedVisual, setClickedVisual] = useState<any | null>(null);

  const handleClick = (visual: any) => {
    setClickedVisual(visual);
    router.push(`visuals/?visualId=${visual.id}`, `visuals/${visual.id}`, {
      scroll: false,
    });
  };

  const handleClose = () => {
    setClickedVisual(null);
    router.push("visuals", undefined, { scroll: false });
  };

  const handleShareBtn = () => {
    const url = window.location.href;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.dismiss()
        toast('Link copied to clipboard.')
      })
      .catch((error) => {
        console.error("Failed to copy URL: ", error);
      });
  };

  const handleDownloadBtn = async () => {
    const fileName = clickedVisual?.image_name;

    const { data, error } = await supabase.storage
      .from("visuals")
      .download(fileName);

    if (error) {
      console.error("Error downloading image:", error);
      return;
    }

    const blob = new Blob([data], { type: data.type });
    const downloadLink = document.createElement("a");

    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(clickedVisual?.code_snippet)
      .then(() => {
        toast.dismiss()
        toast('Code snippet copied to clipboard.')
      })
      .catch((error) => {
        console.error("Failed to copy URL: ", error);
      });
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
            className="my-masonry-grid_item group relative cursor-pointer overflow-hidden rounded-md"
            onClick={() => handleClick(visual)}
          >
            {visuals.length === index + 1 ? (
              <img
                ref={lastVisualRef}
                src={visual.imageURL}
                alt={`Image ${index}`}
              />
            ) : (
              <img src={visual.imageURL} alt={`Image ${index}`} />
            )}
            <div className="absolute inset-0 flex items-end justify-center gap-4 bg-black/30 p-4 opacity-0 duration-200 group-hover:opacity-100" />
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
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="fixed z-20 flex flex-col gap-4 p-4 md:max-w-[70vw] ">
                  <img
                    src={clickedVisual?.imageURL}
                    alt={`Image ${visuals.indexOf(clickedVisual)}`}
                    className="xs:max-h-[85vh] rounded-2xl"
                  />

                  <div className="ml-auto flex flex-wrap justify-end gap-2">
                    <button className={btnClass} onClick={handleShareBtn}>
                      <AiOutlineShareAlt className="fluid-xl" />
                      Share
                    </button>

                    <button className={btnClass} onClick={handleDownloadBtn}>
                      <AiOutlineDownload className="fluid-xl" />
                      Download
                    </button>

                    {clickedVisual?.code_snippet ? (
                      <button className={btnClass} onClick={handleCopyCode}>
                       <BsCodeSlash className="fluid-xl" />
                       Copy Code
                      </button>
                    ) : null}
                    {clickedVisual?.compatibility_link ? (
                      <a
                        className={btnClass}
                        href={clickedVisual?.compatibility_link}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <GoBrowser className="fluid-xl"/>
                        Compatibility
                      </a>
                    ) : null}
                    {clickedVisual?.learn_more_link ? (
                      <a
                        className={btnClass}
                        href={clickedVisual?.learn_more_link}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <AiOutlineInfoCircle className="fluid-xl" />
                        Learn More
                      </a>
                    ) : null}
                  </div>
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
