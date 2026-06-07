// =====================================
// ROOT LAYOUT
// body: page-background + text-primary-content (theme.css)
// =====================================

import { AppProviders } from '@/components/providers/app-providers';
import { personalInfo, seoConfig } from '@/config/portfolio';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#edf2f7' },
		{ media: '(prefers-color-scheme: dark)', color: '#050505' },
	],
};

export const metadata: Metadata = {
	metadataBase: new URL(seoConfig.siteUrl),
	title: {
		default: seoConfig.title,
		template: '%s',
	},
	description: seoConfig.description,
	keywords: [...seoConfig.keywords],
	authors: [{ name: seoConfig.author }],
	creator: seoConfig.author,
	icons: {
		icon: '/logo.png?v=2',
		shortcut: '/logo.png?v=2',
		apple: '/logo.png?v=2',
	},
	manifest: '/manifest.json',
	openGraph: {
		type: 'website',
		locale: 'uz_UZ',
		url: seoConfig.siteUrl,
		title: seoConfig.title,
		description: seoConfig.description,
		siteName: seoConfig.author,
		images: [{ url: seoConfig.ogImage, width: 1200, height: 630 }],
	},
	twitter: {
		card: 'summary_large_image',
		title: seoConfig.title,
		description: seoConfig.description,
		images: [seoConfig.ogImage],
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='uz' suppressHydrationWarning className='overflow-x-hidden w-full'>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='dark'||(!t&&'dark'==='dark')){document.documentElement.classList.add('dark')}}catch(e){}})();`,
					}}
				/>
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} font-sans overflow-x-hidden w-full max-w-[100vw]`}>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'Person',
							name: seoConfig.author,
							url: seoConfig.siteUrl,
							jobTitle: 'Full Stack Developer',
							email: personalInfo.email,
							address: { '@type': 'PostalAddress', addressLocality: 'Tashkent', addressCountry: 'UZ' },
						}),
					}}
				/>
				<AppProviders>{children}</AppProviders>
			</body>
		</html>
	);
}
