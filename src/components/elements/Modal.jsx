// src/components/elements/Modal.jsx
"use client";

import { useEffect, useRef } from "react";
import Icons from "@/assets/icons";
import "@/app/styles/modal.css";

export default function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open

      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose(); // Close modal if clicked outside
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.body.style.overflow = "auto"; // Restore scrolling
        document.removeEventListener("mousedown", handleClickOutside);
      };
    } else {
      document.body.style.overflow = "auto"; // Restore scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div ref={modalRef} className="myModal flex justify-between items-center rounded-lg w-full h-full sm:min-w-96 sm:max-w-lg sm:h-auto p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-foreground hover:text-apeRed cursor-pointer"> {/* Change to absolute positioning */}
          <Icons.ButtonClose size="2xl" />
        </button>
        <div className="grow">{children}</div>
      </div>
    </div>
  );
}