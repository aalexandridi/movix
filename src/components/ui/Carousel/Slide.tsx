import Image from "next/image";
import { Media } from "@/types/media";
import styles from "./Slide.module.css";
import { getTitleOrName } from "@/utils/media";

interface MovieSlideProps {
  media: Media;
}

export default function Slide({ media }: MovieSlideProps) {
  return (
    <div className={styles.slide}>
      {/* Background image */}
      <Image
        src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`}
        alt={getTitleOrName(media)}
        fill
        priority
        className={styles.image}
      />

      {/* Dark cinematic gradient */}
      <div className={styles.overlay} />

      {/* Content */}
      <div className={styles.content}>
        <h1 className={styles.title}>{getTitleOrName(media)}</h1>

        <p className={styles.description}>{media.overview}</p>

        <div className={styles.actions}>
          <button className={styles.play}>▶ Play</button>
          <button className={styles.more}>More Info</button>
        </div>
      </div>
    </div>
  );
}
