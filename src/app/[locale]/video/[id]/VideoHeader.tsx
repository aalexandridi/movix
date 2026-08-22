"use client";

import ChevronLeft from "../../../../components/icons/chevron-left";

import { useRouter } from "next/navigation";

export default function VideoHeader() {
  const router = useRouter();

  return (
    <header
      className="
        group/header
        absolute inset-x-0 top-0 z-50
        flex items-center
        p-4
        opacity-0
        transition-opacity duration-300
        hover:opacity-100
        [body:has(&)]:hover:opacity-100
      "
    >
      <button
        onClick={() => router.back()}
        className="
          flex h-10 w-10 items-center justify-center
          rounded-full
          bg-black/50
          text-white
          backdrop-blur-sm
          transition
          hover:bg-black/70
        "
        aria-label="Go back"
      >
        <ChevronLeft />
      </button>
    </header>
  );
}
