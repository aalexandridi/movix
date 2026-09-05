import Image from "next/image";
import { getPosterUrl } from "@/services/tmdb/images";
import { Media } from "@/types/media";
import { Link } from "@/i18n/routing";
import { isMovie } from "@/utils/media";
interface SlideProps {
  backdropPath: string | null;
  posterPath?: string | null;
  alt: string;
  children: React.ReactNode;
  media?: Media;
  isFirstSlide: boolean;
}

export default function Slide({
  backdropPath,
  posterPath,
  alt,
  children,
  media,
  isFirstSlide,
}: SlideProps) {
  const href = media
    ? `/${isMovie(media) ? "movie" : "tvShow"}/${media.id}`
    : null;

  const content = (
    <>
      {backdropPath && (
        <Image
          src={getPosterUrl(backdropPath, "w1920")}
          alt={alt}
          fill
          priority={isFirstSlide}
          unoptimized
          className="object-cover"
          sizes="100vw"
        />
      )}

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
