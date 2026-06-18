import { getTranslations } from "next-intl/server";
const MyStuffPage = async () => {
  const n = await getTranslations("Navigation");
  return (
    <section>
      <h1>{n("myStuff")}</h1>
    </section>
  );
};

export default MyStuffPage;
