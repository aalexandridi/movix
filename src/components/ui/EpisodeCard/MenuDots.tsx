"use client";
import MenuDotsIcon from "@/components/icons/dots";
import { useEffect, useRef, useState } from "react";

export default function MenuDots() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
  return (
    <div className="relative z-3" ref={ref}>
      <button
        // className="absolute right-4 top-4 z-3"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <MenuDotsIcon></MenuDotsIcon>
      </button>
      <div
        className={`
          absolute
          left-0
          top-full
          z-50
          w-max
          max-h-80
          overflow-y-auto
          rounded-xl
          border
          border-neutral-700
          bg-neutral-900
          shadow-xl
          transition-all
          duration-200
          ${
            open
              ? "pointer-events-auto opacity-100 translate-y-0"
              : "pointer-events-none opacity-0 -translate-y-2"
          }
      `}
      >
        <button
          className="
            block
            whitespace-nowrap
            w-full
            px-4
            py-3
            text-left
            transition
            hover:bg-neutral-800
          "
        >
          Add to my list
        </button>

        <button
          className="
            block
            whitespace-nowrap
            px-4
            py-3
            text-left
            transition
            hover:bg-neutral-800
          "
        >
          Episode Details
        </button>
      </div>
    </div>
  );
}
