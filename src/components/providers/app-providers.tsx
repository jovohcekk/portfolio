'use client';

// =====================================
// APP PROVIDERS
// ThemeProvider (next-themes) + LanguageProvider
// =====================================

import { ThemeProvider } from '@/components/providers/theme-provider';
import { MouseSpotlight } from '@/components/shared/mouse-spotlight';
import { LanguageProvider } from '@/hooks/use-language';
import type { ReactNode } from 'react';

export function AppProviders({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider>
			<LanguageProvider>
				<MouseSpotlight />
				{children}
			</LanguageProvider>
		</ThemeProvider>
	);
}
