import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { DetailsHeroData } from "@/services/tmdb/hero";
import { getTitleOrName } from "@/utils/media";
import { getPosterUrl } from "@/services/tmdb/images";

import Button from "@/components/ui/Buttons/button";
import AddToWatchlistButton from "@/components/ui/Buttons/AddToWatchlistButton";
import TrailerButton from "@/components/ui/Buttons/TrailerButton";

interface DetailsHeroContentProps {
  data: DetailsHeroData;
}

export default async function DetailsHeroContent({
  data,
}: DetailsHeroContentProps) {
  const c = await getTranslations("common");

  const {
    media,
    logoPath,
    duration,
    durationLabel,
    year,
    genres,
    description,
  } = data;

  return (
    <div className="z-2 w-full p-[5%] text-white md:max-w-[75%]">
      {logoPath ? (
        <Image
          width={500}
          height={200}
          priority
          unoptimized
          alt={getTitleOrName(media)}
          src={getPosterUrl(logoPath, "w500")}
          className="mb-4 h-auto w-auto max-h-20 sm:max-h-20 lg:max-h-24 xl:max-h-32"
        />
      ) : (
        <h1 className="mb-4 text-3xl font-bold">{getTitleOrName(media)}</h1>
      )}

      <div className="mb-2 flex gap-4">
        <span>
          {duration} {durationLabel}
        </span>

        <span>{year}</span>
      </div>

      <div className="mb-2 flex flex-col gap-2">
        <Button
          variant="primary"
          fontWeight="700"
          className="w-full sm:w-80 lg:w-60"
        >
          ▶ {c("watchNow")}
        </Button>

        <div className="flex gap-2">
          <AddToWatchlistButton
            media={media}
            text={c("myList")}
            className="w-fit"
            variant="tertiary"
            horizontal={false}
          />

          <TrailerButton
            media={media}
            className="w-fit"
            variant="tertiary"
            horizontal={false}
          />
        </div>
      </div>

      <p className="mb-3 hidden sm:flex">{description}</p>

      <div className="flex gap-2 hidden sm:flex">
        {genres.map((genre) => (
          <span key={genre.id}>{genre.name}</span>
        ))}
      </div>
    </div>
  );
}
