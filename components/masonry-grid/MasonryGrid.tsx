import React, { useState } from "react";
import Masonry from "react-masonry-css";

import { useRouter } from "next/router";
import { ImageModal } from "..";

interface MasonryGridProps {
  visuals: any[];
  lastVisualRef: any;
}

const MasonryGrid = ({ visuals, lastVisualRef }: MasonryGridProps) => {
  const router = useRouter();

  const [clickedVisual, setClickedVisual] = useState<any | null>(null);

  const handleClick = (visual: any) => {
    setClickedVisual(visual);
    router.push(`?visualId=${visual.id}`, `${visual.id}`, {
      scroll: false,
    });
  };

  const handleClose = () => {
    setClickedVisual(null);
    router.push("/", undefined, { scroll: false });
  };

  const [isImage, setIsImage] = useState(true);

  const handleError = () => {
    setIsImage(false);
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
            {visual.srcType === "video" || visual.srcType === "webm" ? (
              <div className="">
                <video
                  className="bg-bg-main"
                  ref={visuals.length === index + 1 ? lastVisualRef : undefined}
                  loop
                  preload=""
                  muted
                  playsInline
                  autoPlay
                >
                  <source src={`${visual.imageURL}`} type="video/webm" />
                </video>
              </div>
            ) : null}

            {visual.srcType === "image" ? (
              <img
                ref={visuals.length === index + 1 ? lastVisualRef : undefined}
                src={visual.imageURL}
                loading="lazy"
                alt={`Image ${index}`}
              />
            ) : null}

            <div className="absolute inset-0 flex items-end justify-center gap-4 bg-black/30 p-4 opacity-0 duration-200 group-hover:opacity-100" />
          </div>
        ))}
      </Masonry>

      <ImageModal handleClose={handleClose} visualInfo={clickedVisual} />
    </>
  );
};

export default MasonryGrid;
