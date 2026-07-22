"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface InfoPopoverProps {
  title: string;
  body: string;
  onClose: () => void;
}

export function InfoPopover({ title, body, onClose }: InfoPopoverProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <>
      <div className="fixed inset-0 z-[1999]" onClick={onClose} />
      <div
        className="absolute z-[2000] bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 border border-white/10 bg-gradient-to-b from-[#0E1114] to-[#0A0C0E] p-5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] font-sans normal-case"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          aria-hidden="true"
          className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 rotate-45 bg-[#0A0C0E] border-r border-b border-white/10"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 text-[#6C7278] hover:text-[#ECEBE2] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
        <h3 className="font-display font-semibold text-lg mb-2 pr-6 text-[#ECEBE2]">{title}</h3>
        <p className="text-[13.5px] leading-relaxed text-[#A7ADB3]">{body}</p>
      </div>
    </>
  );
}
