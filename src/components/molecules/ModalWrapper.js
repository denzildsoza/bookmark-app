"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

export default function Modal({
  isOpen,
  closeModal,
  header,
  action,
  isDisable = false,
  children,
}) {
  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      {/* Backdrop */}
      <DialogBackdrop className="fixed inset-0 bg-black/40" />

      {/* Center */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-lg bg-white shadow-xl">

          {/* Header */}
          <div className="px-6 pt-6">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {header}
            </DialogTitle>
          </div>

          {/* Body */}
          <div className="px-6 py-4">{children}</div>

          {/* Footer */}
          <div className="flex justify-end gap-3 bg-gray-50 px-6 py-4">

            <button
              disabled={isDisable}
              onClick={() => {
                action?.();
                closeModal();
              }}
              className={`px-4 py-2 rounded-md text-white
                ${
                  isDisable
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-500"
                }`}
            >
              Confirm
            </button>

            <button
              onClick={closeModal}
              className="px-4 py-2 rounded-md bg-white border hover:bg-gray-100"
            >
              Cancel
            </button>

          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
