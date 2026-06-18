import { getTranslations } from "next-intl/server";
const SeriesPage = async () => {
  const n = await getTranslations("Navigation");
  return (
    <section>
      <h1>{n("series")}</h1>
    </section>
  );
};

export default SeriesPage;
