import React from "react";
import supabase from "@/config/supabaseClient";

import {
  AiOutlineDownload,
  AiOutlineShareAlt,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { BsCodeSlash } from "react-icons/bs";
import { GoBrowser } from "react-icons/go";

import { toast } from "react-toastify";

const btnClass = `
  rounded-full w-fit p-2 px-4  xs:p-3 xs:px-6 flex gap-2 items-center
  bg-[#111] hover:bg-[#222] duration-200 fluid-md
`;

interface VisualButtonsProps {
  visualInfo: any;
  shareBtnRef: any;
}

const VisualButtons = ({ visualInfo, shareBtnRef }: VisualButtonsProps) => {
  const handleShareBtn = () => {
    const url = window.location.href;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.dismiss();
        toast("Link copied to clipboard.");
      })
      .catch((error) => {
        console.error("Failed to copy URL: ", error);
      });
  };

  const handleDownloadBtn = async () => {
    const fileName = visualInfo.image_name;

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
      .writeText(visualInfo.code_snippet)
      .then(() => {
        toast.dismiss();
        toast("Code snippet copied to clipboard.");
      })
      .catch((error) => {
        console.error("Failed to copy URL: ", error);
      });
  };
  return (
    <div className="ml-auto flex flex-wrap justify-end gap-2">
      <button className={btnClass} ref={shareBtnRef} onClick={handleShareBtn}>
        <AiOutlineShareAlt className="fluid-xl" />
        Share
      </button>

      <button className={btnClass} onClick={handleDownloadBtn}>
        <AiOutlineDownload className="fluid-xl" />
        Download
      </button>

      {visualInfo.code_snippet ? (
        <button className={btnClass} onClick={handleCopyCode}>
          <BsCodeSlash className="fluid-xl" />
          Copy Code
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
          Compatibility
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
          Learn More
        </a>
      ) : null}
    </div>
  );
};

export default VisualButtons;
