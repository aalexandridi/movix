"use client";

import { useEffect, useRef, useState } from "react";
import ChevronDown from "@/components/icons/chevron-left";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  label?: string;
  value: string;
  param: string;
  options: DropdownOption[];
};

export default function Dropdown({
  label,
  value,
  param,
  options,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState(
    options.find((o) => o.value === value),
  );

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onSelect(value: string) {
    const params = new URLSearchParams(searchParams);

    params.set(param, value);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full sm:w-48">
      {label && <p className="mb-2 text-sm text-neutral-400">{label}</p>}

      <button
        onClick={() => setOpen((v) => !v)}
        className="
          flex
          w-full
          items-center
          justify-between
          rounded-xl
          border
          border-neutral-700
          bg-neutral-900
          px-4
          py-3
          text-left
          text-white
          transition
          hover:bg-neutral-800
        "
      >
        <span>{selected?.label}</span>

        <ChevronDown
          className={`transition duration-200  ${open ? "rotate-90" : "rotate-270"}`}
        />
      </button>

      <div
        className={`
          absolute
          left-0
          top-full
          z-50
          mt-2
          w-full
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
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              setOpen(false);
              setSelected(options.find((o) => o.value === option.value));
              onSelect(option.value);
            }}
            className={`
              w-full
              px-4
              py-3
              text-left
              transition
              hover:bg-neutral-800
              ${
                option.value === selected?.value
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-300"
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
