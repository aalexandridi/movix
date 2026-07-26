"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./SearchInput.module.css";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentQuery = searchParams.get("query") ?? "";

  const [query, setQuery] = useState(currentQuery);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const value = query.trim();

      if (value === currentQuery) return;

      const params = new URLSearchParams();

      if (value) {
        params.set("query", value);
        router.replace(`/search?${params.toString()}`, {
          scroll: false,
        });
      } else {
        router.replace("/search", {
          scroll: false,
        });
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query, currentQuery, router]);

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Find movies, shows and more"
      />
    </div>
  );
}
