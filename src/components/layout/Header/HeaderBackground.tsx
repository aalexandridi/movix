"use client";

import { useEffect, useState } from "react";

export default function HeaderBackground() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= window.innerHeight / 2);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`pointer-events-none absolute inset-0 transition-[background-color,backdrop-filter] duration-300 ${
        scrolled
          ? "bg-black/65 backdrop-blur-[4px]"
          : "bg-gradient-to-b from-black/80 via-black/50 to-transparent"
      }`}
    />
  );
}
