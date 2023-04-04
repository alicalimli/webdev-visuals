import React from "react";
import Masonry from "react-masonry-css";

interface MasonryGridProps {
  visuals: any[];
}

const MasonryGrid = ({ visuals }: MasonryGridProps) => {
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
      {visuals.map(({ imageURL }, index) => (
        <div key={index} className="my-masonry-grid_item group relative overflow-hidden rounded-md">
          <img src={imageURL} alt={`Image ${index}`} />
          <div className="absolute inset-0 duration-200 bg-black/20 flex justify-center gap-4 p-4 items-end opacity-0 group-hover:opacity-100">
            <button className="p-2 px-4 bg-blue-600 rounded-md w-full max-w-sm">learn more</button>
            <button className="p-2 px-4 bg-blue-600 rounded-md w-full max-w-sm">supported browsers</button>
          </div>
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryGrid;
