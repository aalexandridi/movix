import styles from "./MediaCardSkeleton.module.css";

export default function MediaCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.poster} />
      {/* <div className={styles.line} />
      <div className={styles.lineSmall} /> */}
    </div>
  );
}
