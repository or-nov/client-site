"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type ProjectImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
};

/** Full-screen image preview: Framer Motion fade-in overlay + scale-up image. */
export function ProjectImageModal({ isOpen, onClose, imageUrl }: ProjectImageModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const isNextImage = imageUrl.startsWith("/") && !imageUrl.startsWith("//");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="תצוגה מקדימה של תמונה"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute end-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="סגור"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative max-h-[90vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {isNextImage ? (
              <Image
                src={imageUrl}
                alt=""
                width={1200}
                height={800}
                className="h-auto w-full object-contain"
                sizes="100vw"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt=""
                className="h-auto max-h-[90vh] w-full object-contain"
              />
            )}
          </motion.div>

          <div
            className="absolute inset-0 -z-10"
            aria-hidden
            onClick={onClose}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
