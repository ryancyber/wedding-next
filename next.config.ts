import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Penting: Menghasilkan file statis (HTML/CSS/JS) - Dinonaktifkan agar API Route bekerja
  basePath: '/wedding-next', // Sesuaikan dengan nama repository kamu
  images: {
    unoptimized: true, // GitHub Pages tidak mendukung optimasi gambar otomatis Next.js
  },
};

export default nextConfig;
