import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const configDir = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: configDir,
  },
  // /en 重定向到根路径（避免重复页面）
  async redirects() {
    return [
      {
        source: '/en',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
