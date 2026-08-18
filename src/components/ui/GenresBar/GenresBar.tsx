"use client";

import { Genre } from "@/types/media";
import { useRouter, useSearchParams } from "next/navigation";
import MediaGrid from "../MediaGrid/MediaGrid";
import { useTranslations } from "next-intl";

export default function GenresBar({ genres }: { genres: Genre[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const c = useTranslations("common");

  const active = searchParams.get("genre");

  const setGenre = (name: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!name) {
      params.delete("genre");
    } else {
      params.set("genre", name.toLocaleLowerCase());
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const buttonClass = `
    shrink-0
    whitespace-nowrap
    rounded-full
    border
    border-transparent
    px-[14px]
    py-2
    text-md
    font-semibold
    text-[#d0cfcf]
    transition-all
    duration-200
    hover:scale-105
    hover:bg-white/18
    hover:text-white
  `;

  const activeClass = "bg-white text-black";

  return (
    <div className="mt-5">
      <MediaGrid variant="carousel" layoutClass="filters">
        <button
          onClick={() => setGenre(null)}
          className={`${buttonClass} ${active === null ? activeClass : ""}`}
        >
          {c("all")}
        </button>

        {genres.map((g) => {
          const isActive = active === g.name.toLocaleLowerCase();

          return (
            <button
              key={g.id}
              onClick={() => setGenre(g.name)}
              className={`${buttonClass} ${isActive ? activeClass : ""}`}
            >
              {g.name}
            </button>
          );
        })}
      </MediaGrid>
    </div>
  );
}
