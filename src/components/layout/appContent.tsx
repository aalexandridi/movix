"use client";

import { useAppSelector } from "@/store/hooks";
import EpisodeDetailsPanel from "../ui/EpisodeDetailsPanel/episodeDetailsPanel";

export default function AppContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, episodeDetails, tvShowDetails } = useAppSelector(
    (state) => state.episodeDetailsPanel,
  );

  return (
    <>
      {isOpen && (
        <EpisodeDetailsPanel episode={episodeDetails} tvShow={tvShowDetails} />
      )}
      {children}
    </>
  );
}
