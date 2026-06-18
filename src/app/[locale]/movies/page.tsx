import { createPageMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  return createPageMetadata("movies");
}

const MoviesPage = async () => {
  const n = await getTranslations("navigation");
  return (
    <section>
      <h1>{n("movies")}</h1>
    </section>
  );
};

export default MoviesPage;
