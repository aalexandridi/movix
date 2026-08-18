import clsx from "clsx";
import styles from "./MediaContainer.module.css";

interface MediaContainerProps {
  hero?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function MediaContainer({
  hero,
  children,
  className,
}: MediaContainerProps) {
  return (
    <section className={clsx(styles.hero, className)}>
      <div className={styles.heroImage}>{hero}</div>

      <div className={styles.content}>
        {hero && (
          <>
            <div className={styles.overlay} />

            <div className={styles.contentInner}>{children}</div>
          </>
        )}
        {!hero && <div>{children}</div>}
      </div>
    </section>
  );
}
