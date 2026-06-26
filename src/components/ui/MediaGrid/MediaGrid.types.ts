import { Media } from "@/types/media";

export type MediaGridVariant = "carousel" | "grid";

export interface MediaGridProps {
  media: Media[];
  variant?: MediaGridVariant;
  title?: string;
  classNames?: string;
}
