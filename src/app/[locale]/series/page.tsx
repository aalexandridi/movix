import { createPageMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  return createPageMetadata("series");
}

const SeriesPage = async () => {
  const n = await getTranslations("navigation");
  return (
    <section>
      <h1>{n("series")}</h1>
    </section>
  );
};

export default SeriesPage;
