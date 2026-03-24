import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/wedding-next', // Sesuaikan dengan nama repository kamu
  images: {
    unoptimized: true, // GitHub Pages tidak mendukung optimasi gambar otomatis Next.js
  },
};

export default nextConfig;
