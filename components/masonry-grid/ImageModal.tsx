import React, { Fragment, useRef } from "react";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { VisualButtons } from "..";

interface ImageModalProps {
  visualInfo: any;
  handleClose: () => void;
}

const ImageModal = ({ visualInfo, handleClose }: ImageModalProps) => {
  const initialFocusRef = useRef<HTMLElement>(null)
  
  return (
    <Transition appear show={visualInfo ? true : false} as={Fragment}>
      <Dialog initialFocus={initialFocusRef} as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <button
            onClick={handleClose}
            className="absolute left-6 top-6 flex items-center gap-2 "
          >
            <AiOutlineArrowLeft className="text-3xl" />
            Back
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
                <img
                  src={visualInfo?.imageURL}
                  alt={visualInfo?.image_name}
                  className="rounded-2xl xs:max-h-[80vh]"
                />

                {visualInfo ? <VisualButtons visualInfo={visualInfo} shareBtnRef={initialFocusRef}/> : null}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ImageModal;
