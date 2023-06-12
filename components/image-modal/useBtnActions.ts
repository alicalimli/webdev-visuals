import supabase from "@/config/supabaseClient";
import { useState } from "react";
import { toast } from "react-hot-toast";

const useBtnActions = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleShareBtn = () => {
    const url = window.location.href;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.dismiss();
        toast.success("Link copied to clipboard.");
      })
      .catch((error) => {
        console.error("Failed to copy URL: ", error);
      });
  };

  const handleDownloadBtn = async (visualInfo: any) => {
    const startDownload = async () => {
      if (isDownloading) return;

      setIsDownloading(true);

      const fileName = visualInfo.image_name;

      const { data, error } = await supabase.storage
        .from("visuals")
        .download(fileName);

      if (error) {
        console.error("Error isDownloading image:", error);
        setIsDownloading(false);
        return new Error("Something went wrong.");
      }

      const blob = new Blob([data], { type: data.type });
      const downloadLink = document.createElement("a");

      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = fileName;
      downloadLink.click();

      setIsDownloading(false);
    };

    toast.promise(startDownload(), {
      loading: "Loading",
      success: "Downloaded Successfully",
      error: "Error when fetching",
    });
  };

  const handleCopyCode = (visualInfo: any) => {
    navigator.clipboard
      .writeText(visualInfo.code_snippet)
      .then(() => {
        toast.dismiss();
        toast.success("Code snippet copied to clipboard.");
      })
      .catch((error) => {
        console.error("Failed to copy URL: ", error);
      });
  };

  return { isDownloading, handleCopyCode, handleDownloadBtn, handleShareBtn };
};

export default useBtnActions;
