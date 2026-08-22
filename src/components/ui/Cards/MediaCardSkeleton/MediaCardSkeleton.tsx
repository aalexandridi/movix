export default function MediaCardSkeleton() {
  return (
    <div className="flex w-full flex-col overflow-visible text-left">
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden">
        <div className="absolute inset-0 animate-pulse bg-zinc-800" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-card-overlay" />

        {/* Menu dots placeholder */}
        {/* <div className="absolute right-2 top-2 h-6 w-6 rounded-full bg-zinc-700/70" /> */}
      </div>

      {/* Content */}
      <div className="py-2">
        {/* Title */}
        <div className="mb-2 h-2.5 w-3/4 animate-pulse rounded bg-zinc-800" />

        {/* Subtitle */}
        <div className="mb-2 flex gap-3">
          {/* <div className="h-4 w-24 animate-pulse rounded bg-zinc-800" /> */}
          <div className="h-2.5 w-16 animate-pulse rounded bg-zinc-800" />
        </div>

        {/* Description */}
        {/* <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-zinc-800" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-zinc-800" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-zinc-800" />
        </div> */}
      </div>
    </div>
  );
}
