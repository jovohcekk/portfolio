// =====================================
// NEXT.JS KONFIGURATSIYASI
// Bu fayl Next.js ilovasining asosiy sozlamalarini boshqaradi.
// Nima qiladi: rasmlar, metadata va build xatti-harakatini sozlaydi.
// Nima uchun kerak: SEO va optimizatsiya uchun standart sozlamalar.
// O'zgartirish mumkin: images.domains, experimental xususiyatlar
// =====================================

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
