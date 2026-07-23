"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { MemeEntry } from "@/config/apecat";

type MemeModalProps = {
  meme: MemeEntry | null;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLElement | null>;
};

export function MemeModal({ meme, onClose, returnFocusRef }: MemeModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!meme) return;

    closeButtonRef.current?.focus();
    const triggerToRestore = returnFocusRef.current;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      triggerToRestore?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meme]);

  return (
    <AnimatePresence>
      {meme && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={meme.alt}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[88vh] w-full max-w-lg overflow-hidden border-[6px] border-cream bg-cream shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-toxic font-mono font-bold text-ink transition-transform hover:scale-110"
            >
              ✕
            </button>
            <div className="relative aspect-square w-full">
              <Image
                src={meme.src}
                alt={meme.alt}
                fill
                sizes="(max-width: 640px) 100vw, 512px"
                className="object-cover"
              />
            </div>
            <p className="px-4 pb-1 pt-2.5 text-center font-marker text-base text-ink">{meme.label}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
