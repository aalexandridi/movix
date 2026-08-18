"use client";

import Button, { ButtonVariant } from "@/components/ui/Buttons/button";
import { MediaDetails } from "@/types/media";
import ClapperBoard from "@/components/icons/clapperboard-icon";
export default function TrailerButton({
  media,
  showText = true,
  className,
  horizontal = true,
  variant = "secondary",
}: {
  media: MediaDetails;
  showText?: boolean;
  className?: string;
  horizontal?: boolean;
  variant?: ButtonVariant;
}) {
  const trailers =
    media.videos?.results.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube",
    ) ?? [];

  const trailer =
    trailers.find((video) => video.official) ??
    trailers.find((video) => !video.official);
  const trailerUrl = `https://www.youtube.com/watch?v=${trailer?.key}`;
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(trailerUrl, "_blank", "noopener,noreferrer");
  };
  if (trailer?.key)
    return (
      <Button
        className={className}
        horizontal={horizontal}
        variant={variant}
        fontWeight="500"
        icon={<ClapperBoard width={22} height={22} />}
        onClick={onClick}
      >
        {showText && <p className="text-sm font-normal">Trailer</p>}
      </Button>
    );
  else return;
}
