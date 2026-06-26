"use client";

import { Genre } from "@/types/media";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./GenresBar.module.css";

export default function GenresBar({ genres }: { genres: Genre[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  return (
    <div className={`mt-5 ${styles.wrapper}`}>
      <button
        className={`text-md font-semibold ${styles.button} ${active === null ? styles.active : ""}`}
        onClick={() => setGenre(null)}
      >
        All
      </button>

      {genres.map((g) => (
        <button
          key={g.id}
          className={`text-md font-semibold ${styles.button} ${
            active === String(g.name.toLocaleLowerCase()) ? styles.active : ""
          }`}
          onClick={() => setGenre(g.name)}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
}
