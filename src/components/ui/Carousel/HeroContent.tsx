import Image from "next/image";
import { getTitleOrName } from "@/utils/media";
import { getPosterUrl } from "@/services/tmdb/images";
import Button from "@/components/ui/Buttons/button";
import AddToWatchlistButton from "@/components/ui/Buttons/AddToWatchlistButton";
import { HeroData } from "@/services/tmdb/hero";

interface HeroContentProps {
  data: HeroData;
  playLabel: string;
}

export default function HeroContent({ data, playLabel }: HeroContentProps) {
  const { media, logoPath, genres, year, seasons, seasonLabel, isTv } = data;

  return (
    <div className="z-2 w-full p-[5%_5%_20%_5%] text-white md:max-w-[65%] md:p-[5%]">
      {logoPath ? (
        <Image
          src={getPosterUrl(logoPath)}
          alt={getTitleOrName(media)}
          width={500}
          height={200}
          priority
          className="mb-4 h-auto w-auto max-h-20 sm:max-h-20 lg:max-h-24 xl:max-h-32"
        />
      ) : (
        <h1 className="text-3xl font-bold">{getTitleOrName(media)}</h1>
      )}

      <div className="flex gap-4 animate-fade-up text-general-text-mid">
        <span>{isTv ? `${seasons} ${seasonLabel}` : year}</span>

        <div className="flex gap-2 text-wrap wrap-break-word flex-wrap">
          {genres.map((genre) => (
            <span key={genre}>{genre}</span>
          ))}
        </div>
      </div>

      <p className="mt-4 line-clamp-3 max-w-2xl animate-fade-up">
        {media.overview}
      </p>

      <div className="mt-6 flex gap-3">
        <Button variant="primary" fontWeight="700" className="w-full sm:w-auto">
          ▶ {playLabel}
        </Button>

        <AddToWatchlistButton media={media} showText={false} />
      </div>
    </div>
  );
}
