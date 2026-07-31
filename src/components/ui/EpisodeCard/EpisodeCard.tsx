import { getPosterUrl } from "@/services/tmdb/images";
import { Episode } from "@/types/media";
import Image from "next/image";
import styles from "./EpisodeCard.module.css";
import MenuDots from "./MenuDots";

type EpisodeCardProps = {
  details: Episode;
};

export default function EpisodeCard({
  details,
  //   onClick,
}: EpisodeCardProps) {
  if (!details.still_path) return;
  return (
    <div
      className="
        group
        flex
        w-full
        flex-col
        overflow-visible
        text-left
        transition
        hover:bg-zinc-900
      "
    >
      <div
        className="relative aspect-video w-full border-b-2
  border-transparent
  group-hover:border-white/90 transition duration-300"
      >
        <Image
          src={
            details.still_path
              ? getPosterUrl(details.still_path, "w780")
              : "/images/poster-placeholder.webp"
          }
          alt={details.id.toString()}
          fill
          className="object-cover"
        />
        <div className={styles.overlay} />
        <div className="absolute right-0 top-2">
          <MenuDots></MenuDots>
        </div>
      </div>

      <div className="p-2">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold text-general-text-mid group-hover:text-white text-sm">
            E{details.episode_number}: {details.name}
          </h3>

          {details.runtime && (
            <span className="text-sm text-general-text-mid group-hover:text-white">
              {details.runtime} min
            </span>
          )}
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-general-text-mid group-hover:text-white">
          {details.overview}
        </p>
      </div>
    </div>
  );
}
