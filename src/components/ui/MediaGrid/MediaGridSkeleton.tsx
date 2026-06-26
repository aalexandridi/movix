import MediaCardSkeleton from "./MediaCardSkeleton";

type Props = {
  count?: number;
};

export default function MediaGridSkeleton({ count = 10 }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <MediaCardSkeleton key={i} />
      ))}
    </div>
  );
}
