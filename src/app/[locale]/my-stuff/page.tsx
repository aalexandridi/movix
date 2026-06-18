import { createPageMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  return createPageMetadata("myStuff");
}

const MyStuffPage = async () => {
  const n = await getTranslations("navigation");
  return (
    <section>
      <h1>{n("myStuff")}</h1>
    </section>
  );
};

export default MyStuffPage;
