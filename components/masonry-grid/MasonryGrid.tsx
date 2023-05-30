import React, { useRef, useState } from "react";
import Masonry from "react-masonry-css";

import { useRouter } from "next/router";
import { ImageModal } from "..";
import MasonryCard from "./MasonryCard";

interface MasonryGridProps {
  visuals: any[];
  lastVisualRef: any;
}

const MasonryGrid = ({ visuals, lastVisualRef }: MasonryGridProps) => {
  const router = useRouter();

  const [clickedVisual, setClickedVisual] = useState<any | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const hoveredVideoRef = useRef();

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
          <MasonryCard
            key={visual.id}
            visual={visual}
            handleClick={handleClick}
            lastVisualRef={lastVisualRef}
            isLastVisual={
              visuals.length === index + 1 ? lastVisualRef : undefined
            }
          />
        ))}
      </Masonry>

      <ImageModal handleClose={handleClose} visualInfo={clickedVisual} />
    </>
  );
};

export default MasonryGrid;
