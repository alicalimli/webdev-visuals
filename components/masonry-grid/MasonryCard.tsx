import React, { useRef, useState } from "react";

interface MasonryCardProps {
  visual: any;
  lastVisualRef: any;
  isLastVisual: boolean;
  handleClick: (visualData: any) => void;
}

const MasonryCard = ({
  visual,
  lastVisualRef,
  isLastVisual,
  handleClick,
}: MasonryCardProps) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    const currentVideoRef = isLastVisual ? lastVisualRef : videoRef;

    if (currentVideoRef.current) {
      currentVideoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    const currentVideoRef = isLastVisual ? lastVisualRef : videoRef;

    if (currentVideoRef.current) {
      currentVideoRef.current.pause();
      currentVideoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      key={visual.title}
      className="my-masonry-grid_item !bg-bg-secondary group relative cursor-pointer overflow-hidden rounded-2xl border-[3px] border-bg-secondary hover:border-[#3f3f3f]  duration-200"
      onClick={() => handleClick(visual)}
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      {visual.srcType === "video" || visual.srcType === "webm" ? (
        <div className="relative">
          <video
            className="bg-bg-main duration-500 opacity-0"
            ref={isLastVisual ? lastVisualRef : videoRef}
            preload=""
            loop
            onLoadedData={(e: any) => {
              e.target.classList.remove("opacity-0");
            }}
            muted
            autoPlay={false}
          >
            <source src={`${visual.imageURL}`} type="video/webm" />
          </video>

          <h2 className="absolute bg-bg-secondary text-white text-sm p-1.5 px-3 bottom-2 right-2 rounded-xl">
            video
          </h2>
        </div>
      ) : null}

      {visual.srcType === "image" ? (
        <img
          ref={isLastVisual ? lastVisualRef : undefined}
          src={visual.imageURL}
          className=" duration-500 opacity-0"
          loading="lazy"
          onLoad={(e: any) => {
            e.target.classList.remove("opacity-0");
          }}
          alt={visual.title}
        />
      ) : null}

      {/* <div className="absolute inset-0 flex items-end justify-center gap-4 bg-black/30 p-4 opacity-0 duration-200 group-hover:opacity-100" /> */}
    </div>
  );
};

export default MasonryCard;
