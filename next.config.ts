import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    dynamicIO: false,
  },
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
