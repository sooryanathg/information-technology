import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ],
    localPatterns: [
      {
        // Covers every ordinary local image (logo, icons, section
        // backgrounds, etc.) with no query string.
        pathname: "/**",
      },
      {
        pathname: "/api/home-achievements",
        search: "?id=*",
      },
      {
        pathname: "/api/gallery",
        search: "?id=*",
      },
    ],
  },
};

export default nextConfig;