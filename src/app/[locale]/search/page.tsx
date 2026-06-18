import { createPageMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  return createPageMetadata("search");
}

const SearchPage = async () => {
  const n = await getTranslations("navigation");
  return (
    <section>
      <h1>{n("search")}</h1>
    </section>
  );
};

export default SearchPage;
