import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function createPageMetadata(key: string): Promise<Metadata> {
  const t = await getTranslations(`metadata.${key}`);

  return {
    title: t("title"),
    description: t("description"),
  };
}
