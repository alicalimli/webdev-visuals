import React, { Fragment, useRef } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import VisualButtons from "./VisualButtons";
import { Portal } from "../portal/Portal";

interface ImageModalProps {
  visualInfo: any;
  transparentBG?: boolean;
  handleClose: () => void;
}

const ImageModal = ({
  visualInfo,
  handleClose,
  transparentBG = true,
}: ImageModalProps) => {
  const initialFocusRef = useRef<HTMLElement>(null);

  return (
    <Transition appear show={visualInfo ? true : false} as={Fragment}>
      <Dialog
        initialFocus={initialFocusRef}
        as="div"
        className="relative z-10"
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`fixed inset-0 bg-black ${
              transparentBG ? "bg-opacity-95" : ""
            }`}
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <button
            onClick={handleClose}
            className={`
              rounded-full w-fit flex flex-col p-3 gap-2 absolute top-3 left-3 items-center
              hover:bg-[#222] duration-200 fluid-md 
            `}
          >
            <AiOutlineArrowLeft className="fluid-xl" />
          </button>

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
              <Dialog.Panel className="fixed z-20 flex flex-col gap-4 p-4 md:max-w-5xl ">
                <div className="flex justify-center">
                  <img
                    src={visualInfo?.imageURL}
                    alt={visualInfo?.image_name}
                    className="rounded-2xl xs:max-h-[80vh] object-contain"
                  />
                </div>

                {visualInfo ? (
                  <div className="hidden xs:block">
                    <VisualButtons
                      handleClose={handleClose}
                      visualInfo={visualInfo}
                      shareBtnRef={initialFocusRef}
                    />
                  </div>
                ) : null}

                {visualInfo ? (
                  <Portal>
                    <div className="block xs:hidden fixed bottom-0 left-0 w-full p-4 z-50">
                      <VisualButtons
                        handleClose={handleClose}
                        visualInfo={visualInfo}
                        shareBtnRef={initialFocusRef}
                      />
                    </div>
                  </Portal>
                ) : null}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ImageModal;
