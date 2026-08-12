import { Media, MediaDetails } from "@/types/media";

export type MediaGridVariant = "carousel" | "grid";

export type GridMedia = Media | MediaDetails;

export type MediaGridLayout =
  | "default"
  | "episodes"
  | "search"
  | "compact"
  | "filters";

export type MediaGridType = "grid" | "carousel";

export interface MediaGridProps {
  variant?: MediaGridType;
  title?: string;
  children: React.ReactNode;
  layoutClass?: MediaGridLayout;
  className?: string;
  resetKey?: string;
}
