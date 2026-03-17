import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // add allowed image domains
  images: {
    domains: ["github.com"],
  }
};

export default nextConfig;
