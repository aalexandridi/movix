import MediaHeroLayout from "@/components/layout/MediaHeroLayout/MediaHeroLayout";
import { createPageMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";
import MyStuffContent from "./MyStuffContent";

export async function generateMetadata() {
  return createPageMetadata("myStuff");
}

const MyStuffPage = async () => {
  const t = await getTranslations("myStuffPage");
  return (
    <MediaHeroLayout className="mt-18">
      <h1 className="text-xl font-bold">{t("title")}</h1>
      <MyStuffContent />
    </MediaHeroLayout>
  );
};

export default MyStuffPage;
