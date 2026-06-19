import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["styled-components"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "www.instagram.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/studio/:path*",
        headers: [{ key: "X-Frame-Options", value: "SAMEORIGIN" }],
      },
    ];
  },
};

export default nextConfig;
