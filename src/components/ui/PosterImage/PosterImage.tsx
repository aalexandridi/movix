"use client";

import { useState } from "react";
import Image from "next/image";
import MediaCardSkeleton from "../MediaGrid/MediaCardSkeleton";

export default function PosterImage({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
}) {
  const [imageSrc, setImageSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="overflow-visible"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "visible",
      }}
    >
      {!loaded && <MediaCardSkeleton />}

      <Image
        src={imageSrc}
        alt={alt}
        fill
        onLoad={() => setLoaded(true)}
        onError={() => {
          setLoaded(true);
          setImageSrc("/images/poster-placeholder.webp");
        }}
      />
      {children}
    </div>
  );
}
