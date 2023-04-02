import React from "react";
import Masonry from "react-masonry-css";

interface MasonryGridProps {
  srcs: any[];
}

const MasonryGrid = ({ srcs }: MasonryGridProps) => {
  return (
    <Masonry
      breakpointCols={{
        default: 3,
        1100: 2,
        650: 1,
      }}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {srcs.map(({ src }, index) => (
        <div key={index} className="my-masonry-grid_item">
          <img src={src} alt={`Image ${index}`} />
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryGrid;
