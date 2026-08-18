"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import clsx from "clsx";

const locales = [
  { code: "en", label: "EN" },
  { code: "el", label: "GR" },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (nextLocale: "en" | "el") => {
    if (nextLocale === locale) return;

    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="flex items-center rounded-full bg-white/10 p-1 backdrop-blur-sm">
      {locales.map((item) => {
        const isActive = item.code === locale;

        return (
          <button
            key={item.code}
            type="button"
            onClick={() => changeLocale(item.code)}
            className={clsx(
              "min-w-9 rounded-full px-2.5 py-1.5 text-xs font-semibold",
              "transition-all duration-200",
              isActive
                ? "bg-white text-black shadow-sm"
                : "text-white/50 hover:text-white",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
