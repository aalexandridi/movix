import styles from "./MediaGrid.module.css";
import MediaCardSkeleton from "./MediaCardSkeleton";

export default function MediaGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <MediaCardSkeleton key={i} />
      ))}
    </div>
  );
}
