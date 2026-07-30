import clsx from "clsx";
import styles from "./MediaHeroLayout.module.css";

interface MediaHeroLayoutProps {
  hero?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function MediaHeroLayout({
  hero,
  children,
  className,
}: MediaHeroLayoutProps) {
  return (
    <section className={clsx(styles.hero, className)}>
      <div className={styles.heroImage}>{hero}</div>
      {/* {hero} */}

      <section className={styles.content}>
        {hero && (
          <>
            <div className={styles.overlay} />

            <div className={styles.contentInner}>{children}</div>
          </>
        )}
        {!hero && <div>{children}</div>}
      </section>
    </section>
  );
}
