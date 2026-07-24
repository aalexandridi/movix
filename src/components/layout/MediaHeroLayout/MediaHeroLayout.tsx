import styles from "./MediaHeroLayout.module.css";

interface MediaHeroLayoutProps {
  hero: React.ReactNode;
  children: React.ReactNode;
}

export default function MediaHeroLayout({
  hero,
  children,
}: MediaHeroLayoutProps) {
  return (
    <section className={styles.hero}>
      {hero}

      <section className={styles.content}>
        <div className={styles.overlay} />

        <div className={styles.contentInner}>{children}</div>
      </section>
    </section>
  );
}
