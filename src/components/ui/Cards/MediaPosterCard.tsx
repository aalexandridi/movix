import { Media, MediaDetails } from "@/types/media";
import { getPosterUrl } from "@/services/tmdb/images";
import { Link } from "@/i18n/routing";
import { getTitleOrName, isMovie } from "@/utils/media";

import MenuDots from "./MenuDots";
import PosterImage from "./PosterImage";

interface MediaPosterCardProps {
  media: Media | MediaDetails;
}

export default function MediaPosterCard({ media }: MediaPosterCardProps) {
  const title = getTitleOrName(media);
  const url = isMovie(media) ? "/movie/" : "/tvShow/";

  return (
    <Link
      href={`${url}${media.id}`}
      aria-label={title}
      className="block w-full min-w-0"
    >
      <article className="w-full min-w-0">
        <div
          className="
            relative
            aspect-[2/3]
            w-full
            overflow-visible
            outline-2
            outline-transparent
            outline-offset-2
            transition-[outline-color]
            duration-200
            hover:outline-white
          "
        >
          <PosterImage
            src={
              media.poster_path
                ? getPosterUrl(media.poster_path, "w500")
                : "/images/poster-placeholder.webp"
            }
            alt={title}
          >
            <div className="bg-card-overlay absolute inset-0" />

            <div className="absolute right-0 top-2">
              <MenuDots media={media} episode={null} />
            </div>
          </PosterImage>
        </div>
      </article>
    </Link>
  );
}
