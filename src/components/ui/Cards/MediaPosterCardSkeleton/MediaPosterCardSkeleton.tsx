import styles from "./MediaPosterCardSkeleton.module.css";

export default function MediaPosterCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.poster} />
    </div>
  );
}
