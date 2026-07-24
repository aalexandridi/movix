"use client";

import { useState } from "react";
import Tabs from "@/components/ui/Tabs/Tabs";
import { CastMember, CrewMember, Movie, MovieDetails } from "@/types/media";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import InfiniteMoviesGrid from "@/components/ui/MediaGrid/InfiniteMediaGrid";
import InfoRow from "@/components/ui/InfoRow/InfoRow";
import { uniqueNamesByJob } from "@/utils/array";

const tabs = [
  {
    id: "recommended",
    label: "You May Also Like",
  },
  {
    id: "details",
    label: "Details",
  },
];

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
  const [activeTab, setActiveTab] = useState("recommended");
  // console.log(
  //   "Directing==",
  //   cast.filter((c) => c.known_for_department === "Acting"),
  //   // .map((c) => c.name),
  // );
  return (
    <>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <section className="">
        {activeTab === "recommended" && (
          <InfiniteMoviesGrid
            initialMovies={recommendations}
            mode="recommendations"
            movieId={details.id.toString()}
          />
        )}

        {activeTab === "details" && (
          <div className="py-6 flex flex-col gap-4">
            <InfoRow
              title="Starring"
              items={cast
                .filter((c) => c.known_for_department === "Acting")
                .map((c) => c.name)}
            />

            <InfoRow
              title="Directors"
              items={uniqueNamesByJob(crew, ["Director"])}
            />

            <InfoRow
              title="Writers"
              items={uniqueNamesByJob(crew, ["Writer", "Screenplay", "Story"])}
            />

            <InfoRow
              title="Producers"
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
