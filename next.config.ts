import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ["media.geeksforgeeks.org", "image.tmdb.org"],
  },
};

export default withNextIntl(nextConfig);
