"use client";

import styles from "./Tabs.module.css";
import { TabsProps } from "./Tabs.types";

export default function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className={styles.wrapper}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${
            activeTab === tab.id ? styles.active : ""
          }`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
