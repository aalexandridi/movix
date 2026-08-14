"use client";

import { useState } from "react";
import Tabs from "@/components/ui/Tabs/Tabs";
import { CastMember, CrewMember, Movie, MovieDetails } from "@/types/media";
import InfiniteMediaGrid from "@/components/ui/MediaGrid/InfiniteMediaGrid";
import InfoRow from "@/components/ui/InfoRow/InfoRow";
import { uniqueNamesByJob } from "@/utils/array";
import { useTranslations } from "next-intl";
interface MovieDetailsTabsProps {
  details: MovieDetails;
  recommendations: Array<Movie>;
  cast: CastMember[];
  crew: CrewMember[];
}

export default function MovieDetailsTabs({
  details,
  recommendations,
  cast,
  crew,
}: MovieDetailsTabsProps) {
  const c = useTranslations("common");
  const [activeTab, setActiveTab] = useState("recommended");
  const tabs = [
    {
      id: "recommended",
      label: c("alsoLike"),
    },
    {
      id: "details",
      label: c("details"),
    },
  ];
  return (
    <>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <section className="">
        {activeTab === "recommended" && (
          <InfiniteMediaGrid
            initialMedia={recommendations}
            mode="recommendations"
            movieId={details.id.toString()}
          />
        )}

        {activeTab === "details" && (
          <div className="py-6 flex flex-col gap-4">
            <InfoRow
              title={c("starring")}
              items={cast
                .filter((c) => c.known_for_department === "Acting")
                .map((c) => c.name)}
            />

            <InfoRow
              title={c("directors")}
              items={uniqueNamesByJob(crew, ["Director"])}
            />

            <InfoRow
              title={c("writers")}
              items={uniqueNamesByJob(crew, ["Writer", "Screenplay", "Story"])}
            />

            <InfoRow
              title={c("producers")}
              items={uniqueNamesByJob(crew, [
                "Producer",
                "Executive Producer",
                "Co-Producer",
                "Associate Producer",
              ])}
            />
          </div>
        )}
      </section>
    </>
  );
}
