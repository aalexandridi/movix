import MediaGrid from "../MediaGrid/MediaGrid";

export default function GenresBarSkeleton({ count = 20 }: { count?: number }) {
  return (
    <div className="mt-5">
      <MediaGrid variant="carousel" layoutClass="filters">
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            className="
              flex
              h-[42px]
              shrink-0
              items-center
              rounded-full
              bg-zinc-800/70
              px-[14px]
            "
          >
            <div
              className="
                h-4
                w-14
                animate-pulse
                rounded-full
                bg-zinc-700
              "
            />
          </div>
        ))}
      </MediaGrid>
    </div>
  );
}
