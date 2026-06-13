// =====================================
// NEXT.JS KONFIGURATSIYASI
// Bu fayl Next.js ilovasining asosiy sozlamalarini boshqaradi.
// Nima qiladi: rasmlar, metadata va build xatti-harakatini sozlaydi.
// Nima uchun kerak: SEO va optimizatsiya uchun standart sozlamalar.
// O'zgartirish mumkin: images.domains, experimental xususiyatlar
// =====================================

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	// Image Optimization - CRITICAL for performance
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'github.com',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
		],
		// OPTIMIZATION: Enable modern image formats
		formats: ['image/avif', 'image/webp'],
		// OPTIMIZATION: Limit image sizes to prevent over-caching
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		// OPTIMIZATION: Prevent blur placeholder generation (faster)
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		// Configure image quality levels
		qualities: [75, 85, 90],
	},

	// OPTIMIZATION: Code splitting and dynamic imports
	webpack: (config, { isServer }) => {
		return config;
	},
};

export default nextConfig;
