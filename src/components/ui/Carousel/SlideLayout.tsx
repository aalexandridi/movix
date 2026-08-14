import Image from "next/image";
import styles from "./Slide.module.css";
import { getPosterUrl } from "@/services/tmdb/images";
import { Media } from "@/types/media";
import { Link } from "@/i18n/routing";
import { isMovie } from "@/utils/media";

interface SlideLayoutProps {
  backdropPath: string | null;
  alt: string;
  children: React.ReactNode;
  media?: Media;
}

export default async function SlideLayout({
  backdropPath,
  alt,
  children,
  media,
}: SlideLayoutProps) {
  const href = media
    ? `/${isMovie(media) ? "movie" : "tvShow"}/${media.id}`
    : null;
  const content = (
    <>
      <Image
        src={getPosterUrl(backdropPath)}
        alt={alt}
        fill
        priority
        className={styles.image}
      />

      <div className={styles.overlay} />

      {children}
    </>
  );
  return href ? (
    <Link href={href} className={styles.slide}>
      {content}
    </Link>
  ) : (
    <div className={styles.slide}>{content}</div>
  );
}
