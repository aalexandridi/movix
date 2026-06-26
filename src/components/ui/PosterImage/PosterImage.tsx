"use client";

import { useState } from "react";
import Image from "next/image";
import MediaCardSkeleton from "../MediaGrid/MediaCardSkeleton";

export default function PosterImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [imageSrc, setImageSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
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
        // style={{
        //   opacity: loaded ? 1 : 0,
        //   transition: "opacity 250ms ease",
        // }}
      />
    </>
  );
}
