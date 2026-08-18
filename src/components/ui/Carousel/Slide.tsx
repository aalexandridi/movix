import Image from "next/image";
import { getPosterUrl } from "@/services/tmdb/images";
import { Media } from "@/types/media";
import { Link } from "@/i18n/routing";
import { isMovie } from "@/utils/media";
interface SlideProps {
  backdropPath: string | null;
  alt: string;
  children: React.ReactNode;
  media?: Media;
}

export default function Slide({
  backdropPath,
  alt,
  children,
  media,
}: SlideProps) {
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
        className="object-cover"
      />

      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-slide-overlay
        "
      />

      {children}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="relative flex h-full min-w-0 flex-[0_0_100%] items-end"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="relative flex h-full min-w-0 flex-[0_0_100%] items-end">
      {content}
    </div>
  );
}
