import styles from "./SlideSkeleton.module.css";

export default function SlideSkeleton() {
  return (
    <div className={styles.slide}>
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-slide-overlay
        "
      />
    </div>
  );
}
