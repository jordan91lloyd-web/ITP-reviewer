import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdf-parse uses native Node modules — tell Next.js to run it server-side only
  serverExternalPackages: ["pdf-parse"],
};

export default nextConfig;
