"use client";

import clsx from "clsx";
import { TabsProps } from "./Tabs.types";

export default function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex gap-8 overflow-x-auto scrollbar-none">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              "relative shrink-0 whitespace-nowrap",
              "border-0 bg-transparent px-0 py-1.5",
              "text-base font-semibold",
              "cursor-pointer",
              "transition-colors duration-200",
              "hover:text-white",
              isActive ? "text-white" : "text-white/65",
              isActive &&
                "after:absolute after:bottom-[-1px] after:left-0 after:h-[3px] after:w-full after:rounded-t-[4px] after:bg-white after:content-['']",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
