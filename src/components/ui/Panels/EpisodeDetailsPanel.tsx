import { CastMember, Creator, EpisodeDetails, TvDetails } from "@/types/media";
import InfoRow from "../InfoRow/InfoRow";
import { uniqueNamesByJob } from "@/utils/array";
import { useAppDispatch } from "@/store/hooks";
import { closeEpisodeDetails } from "../../../store/slices/EpisodeDetailsPanelSlice";
import CloseIcon from "@/components/icons/close-icon";
import { useTranslations } from "next-intl";

export default function EpisodeDetailsPanel({
  episode,
  tvShow,
}: {
  episode: EpisodeDetails | null;
  tvShow: TvDetails | null;
}) {
  const c = useTranslations("common");
  const dispatch = useAppDispatch();
  if (!episode || !tvShow) return;

  const year = new Date(episode?.air_date).getFullYear();
  return (
    <div
      onClick={() => dispatch(closeEpisodeDetails())}
      className="fixed flex align-end justify-end left-0 top-0 z-62 w-full h-screen bg-overlay "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-4/5
          md:w-3/5
          lg:w-2/5
          max-w-3xl
          bg-[#0d0d0d]
          p-6
          sm:p-8
          lg:p-12
          overflow-y-auto"
        // className="w-2/5 bg-[#0d0d0d] p-12 overflow-y-auto"
      >
        <div className="flex w-full items-end justify-end">
          <button onClick={() => dispatch(closeEpisodeDetails())}>
            <CloseIcon color="white" />
          </button>
        </div>
        <h3 className="font-bold text-sm">{tvShow?.name}</h3>
        <h1 className="font-bold text-xl mt-2">
          E{episode?.episode_number}:{episode?.name}
        </h1>
        <p className="flex gap-4 mt-2">
          <span className="text-sm text-general-text-mid">
            {episode?.runtime} {c("minutes")}
          </span>
          <span className="text-sm text-general-text-mid">{year}</span>
        </p>
        <p className="mt-4 text-base text-general-text-mid">
          {episode?.overview}
        </p>
        <div className="mt-4 flex flex-col gap-4">
          <InfoRow
            title={c("starring")}
            items={episode.credits.cast
              .filter((c: CastMember) => c.known_for_department === "Acting")
              .map((c: CastMember) => c.name)}
          />
          <InfoRow
            title={c("directors")}
            items={uniqueNamesByJob(episode.credits.crew, ["Director"])}
          />
          <InfoRow
            title={c("writers")}
            items={uniqueNamesByJob(episode.credits.crew, [
              "Writer",
              "Screenplay",
              "Story",
            ])}
          />
          <InfoRow
            title={c("producers")}
            items={uniqueNamesByJob(episode.credits.crew, [
              "Producer",
              "Executive Producer",
              "Co-Producer",
              "Associate Producer",
            ])}
          />
          <InfoRow
            title={c("createdBy")}
            items={tvShow.created_by.map((c: Creator) => c.name)}
          />
        </div>
      </div>
    </div>
  );
}
