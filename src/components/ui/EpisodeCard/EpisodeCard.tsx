import { getPosterUrl } from "@/services/tmdb/images";
import { Episode, TvDetails } from "@/types/media";
import Image from "next/image";
import styles from "./EpisodeCard.module.css";
import MenuDots from "./MenuDots";

type EpisodeCardProps = {
  episode: Episode;
  tvShowDetails: TvDetails;
};

export default function EpisodeCard({
  episode,
  tvShowDetails,
  //   onClick,
}: EpisodeCardProps) {
  if (!episode.still_path) return;
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
            episode.still_path
              ? getPosterUrl(episode.still_path, "w780")
              : "/images/poster-placeholder.webp"
          }
          alt={episode.id.toString()}
          fill
          className="object-cover"
        />
        <div className={styles.overlay} />
        <div className="absolute right-0 top-2">
          <MenuDots episode={episode} media={tvShowDetails}></MenuDots>
        </div>
      </div>

      <div className="py-2">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold text-general-text-mid group-hover:text-white text-sm">
            E{episode.episode_number}: {episode.name}
          </h3>

          {episode.runtime && (
            <span className="text-sm text-general-text-mid group-hover:text-white">
              {episode.runtime} min
            </span>
          )}
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-general-text-mid group-hover:text-white">
          {episode.overview}
        </p>
      </div>
    </div>
  );
}
