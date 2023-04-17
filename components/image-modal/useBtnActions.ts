import supabase from "@/config/supabaseClient";
import { toast } from "react-toastify";

const useBtnActions = () => {
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

  const handleDownloadBtn = async (visualInfo: any) => {
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

  const handleCopyCode = (visualInfo: any) => {
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

  return { handleCopyCode, handleDownloadBtn, handleShareBtn };
};

export default useBtnActions;
