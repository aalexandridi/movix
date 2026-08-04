import Image from "next/image";
import styles from "./Slide.module.css";
import { getPosterUrl } from "@/services/tmdb/images";

interface SlideLayoutProps {
  backdropPath: string | null;
  alt: string;
  children: React.ReactNode;
}

export default async function SlideLayout({
  backdropPath,
  alt,
  children,
}: SlideLayoutProps) {
  return (
    <div className={styles.slide}>
      <Image
        src={getPosterUrl(backdropPath)}
        alt={alt}
        fill
        priority
        className={styles.image}
      />

      <div className={styles.overlay} />

      {children}
    </div>
  );
}
