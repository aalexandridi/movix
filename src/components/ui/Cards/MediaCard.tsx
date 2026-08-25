import Image from "next/image";
import { Link } from "@/i18n/routing";

import { Episode, Media, MediaDetails } from "@/types/media";
import { getPosterUrl } from "@/services/tmdb/images";
import { getMediaCardData } from "@/utils/mediaCard";

import MenuDots from "./MenuDots";

interface MediaCardProps {
  media: MediaDetails | Media;
  episode?: Episode | null;
  hasLink?: boolean;
  insideShow?: boolean;
}

export default function MediaCard({
  media,
  episode = null,
  hasLink = true,
  insideShow = false,
}: MediaCardProps) {
  const data = getMediaCardData(media, episode, insideShow);

  const content = (
    <div className="group/card flex w-full flex-col overflow-visible text-left transition hover:bg-zinc-900">
      <div
        className="
            relative
            aspect-video
            w-full
            border-b-2
            border-transparent
            transition
            duration-300
            group-hover/card:border-white/90
          "
      >
        <Image
          src={
            data.imagePath
              ? getPosterUrl(data.imagePath, "w500")
              : "/images/poster-placeholder.webp"
          }
          alt={data.title}
          fill
          className="object-cover"
        />

        <div className="bg-card-overlay absolute inset-0" />

        <div className="absolute right-0 top-2">
          <MenuDots media={data.menuMedia} episode={data.episode} />
        </div>
      </div>

      <div className="py-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-general-text-mid transition-colors group-hover/card:text-white">
            {data.title}
          </h3>
        </div>

        {data.subtitle && (
          <div className="flex gap-3">
            <div className="text-sm font-light leading-6 text-general-text-mid group-hover/card:text-white">
              {data.subtitle}
            </div>
            {insideShow && data.airDate && (
              <div className="text-sm font-light leading-6 text-general-text-mid group-hover/card:text-white">
                {data.airDate}
              </div>
            )}
          </div>
        )}

        {data.description && (
          <p className="line-clamp-3 text-sm leading-6 text-general-text-mid group-hover/card:text-white">
            {data.description}
          </p>
        )}
      </div>
    </div>
  );

  return hasLink ? (
    <Link href={data.href} aria-label={data.title}>
      {content}
    </Link>
  ) : (
    <>{content}</>
  );
}
