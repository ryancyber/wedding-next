import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Penting: Menghasilkan file statis (HTML/CSS/JS) untuk GitHub Pages
  basePath: '/wedding-putri-n-riswandi', // Sesuaikan dengan nama repository kamu
  images: {
    unoptimized: true, // GitHub Pages tidak mendukung optimasi gambar otomatis Next.js
  },
};

export default nextConfig;
