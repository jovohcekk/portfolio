// =====================================
// ROOT LAYOUT
// body: page-background + text-primary-content (theme.css)
// =====================================

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { seoConfig } from "@/config/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.title,
    template: `%s | ${seoConfig.author}`,
  },
  description: seoConfig.description,
  keywords: [...seoConfig.keywords],
  authors: [{ name: seoConfig.author }],
  creator: seoConfig.author,
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: seoConfig.siteUrl,
    title: seoConfig.title,
    description: seoConfig.description,
    siteName: seoConfig.author,
    images: [{ url: seoConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
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
    <html lang="uz" suppressHydrationWarning className="overflow-x-hidden w-full">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans overflow-x-hidden w-full max-w-[100vw]`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
