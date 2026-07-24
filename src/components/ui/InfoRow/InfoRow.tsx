import styles from "./InfoRow.module.css";

interface InfoRowProps {
  title: string;
  items: string[];
}

export default function InfoRow({ title, items }: InfoRowProps) {
  if (!items.length) return null;

  return (
    <div className={styles.row}>
      <h3 className={styles.title}>{title}</h3>

      <p className={styles.items}>{items.join(", ")}</p>
    </div>
  );
}
