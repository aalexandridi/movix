import { createPageMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";
import MyStuffContent from "./MyStuffContent";
import MediaContainer from "@/components/layout/MediaContainer/MediaContainer";

export async function generateMetadata() {
  return createPageMetadata("myStuff");
}

const MyStuffPage = async () => {
  const t = await getTranslations("myStuffPage");
  return (
    <MediaContainer className="mt-18">
      <h1 className="text-xl font-bold">{t("title")}</h1>
      <MyStuffContent />
    </MediaContainer>
  );
};

export default MyStuffPage;
