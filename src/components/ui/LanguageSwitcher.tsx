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
    <div className="flex items-center gap-1 text-xs font-semibold">
      {locales.map((item, index) => (
        <div key={item.code} className="flex items-center">
          <button
            type="button"
            onClick={() => changeLocale(item.code)}
            className={clsx(
              "px-1 py-1 transition-colors duration-200",
              item.code === locale
                ? "text-white"
                : "text-white/50 hover:text-white",
            )}
          >
            {item.label}
          </button>

          {index < locales.length - 1 && (
            <span className="text-white/30">/</span>
          )}
        </div>
      ))}
    </div>
  );
}
