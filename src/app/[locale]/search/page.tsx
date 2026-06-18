import { getTranslations } from "next-intl/server";
const SearchPage = async () => {
  const n = await getTranslations("Navigation");
  return (
    <section>
      <h1>{n("search")}</h1>
    </section>
  );
};

export default SearchPage;
