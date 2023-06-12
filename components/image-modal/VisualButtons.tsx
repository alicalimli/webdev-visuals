import React from "react";

import {
  AiOutlineDownload,
  AiOutlineShareAlt,
  AiOutlineInfoCircle,
} from "react-icons/ai";

import { BsCodeSlash } from "react-icons/bs";
import { GoBrowser } from "react-icons/go";

import useBtnActions from "./useBtnActions";

const btnClass = `
  rounded-full w-fit flex flex-col p-3 gap-2 items-center
  hover:bg-[#222] duration-200 fluid-md group relative
`;

const btnTitleClass = `
  text-xs duration-300 absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md 
  invisible pointer-events-none opacity-0 bg-[#333] p-1 px-2
  group-hover:opacity-100 group-hover:pointer-events-auto group-hover:visible
`;

interface VisualButtonsProps {
  visualInfo: any;
  shareBtnRef: any;
  handleClose: () => void;
}

const VisualButtons = ({ visualInfo, shareBtnRef }: VisualButtonsProps) => {
  const { isDownloading, handleShareBtn, handleDownloadBtn, handleCopyCode } =
    useBtnActions();

  return (
    <div className="ml-auto flex w-full justify-around xs:justify-end">
      <button className={btnClass} ref={shareBtnRef} onClick={handleShareBtn}>
        <AiOutlineShareAlt className="fluid-xl" />

        <span className={btnTitleClass}>Share</span>
      </button>

      <button
        className={btnClass}
        disabled={isDownloading}
        onClick={() => handleDownloadBtn(visualInfo)}
      >
        <AiOutlineDownload className="fluid-xl" />

        <span className={btnTitleClass}>Download</span>
      </button>

      {visualInfo.code_snippet ? (
        <button className={btnClass} onClick={() => handleCopyCode(visualInfo)}>
          <BsCodeSlash className="fluid-xl" />

          <span className={btnTitleClass}>Copy Code</span>
        </button>
      ) : null}

      {visualInfo.compatibility_link ? (
        <a
          className={btnClass}
          href={visualInfo.compatibility_link}
          rel="noopener noreferrer"
          target="_blank"
        >
          <GoBrowser className="fluid-xl" />
          <span className={btnTitleClass}>Compatibility</span>
        </a>
      ) : null}

      {visualInfo.learn_more_link ? (
        <a
          className={btnClass}
          href={visualInfo.learn_more_link}
          rel="noopener noreferrer"
          target="_blank"
        >
          <AiOutlineInfoCircle className="fluid-xl" />

          <span className={btnTitleClass}>Learn more</span>
        </a>
      ) : null}
    </div>
  );
};

export default VisualButtons;
