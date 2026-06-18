import { getTranslations } from "next-intl/server";
const MoviesPage = async () => {
  const n = await getTranslations("Navigation");
  return (
    <section>
      <h1>{n("movies")}</h1>
    </section>
  );
};

export default MoviesPage;
