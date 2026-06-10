'use client';

// =====================================
// APP PROVIDERS
// ThemeProvider (next-themes) + LanguageProvider
// =====================================

import { ThemeProvider } from '@/components/providers/theme-provider'
import { CustomCursorPortal } from '@/components/shared/custom-cursor-portal'
import { MouseSpotlight } from '@/components/shared/mouse-spotlight'
import { LanguageProvider } from '@/hooks/use-language'
import type { ReactNode } from 'react'

/**
 * App Providers - Wraps entire application
 *
 * CRITICAL CHANGE: Removed CustomCursor component from here
 * Now using CustomCursorPortal which renders at document.body level
 * This ensures the cursor ALWAYS stays above all UI elements
 *
 * Root Cause: Old CustomCursor was inside AppProviders, creating stacking context issues
 * Solution: Portal rendering bypasses stacking context limitations
 */
export function AppProviders({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider>
			<LanguageProvider>
				<CustomCursorPortal />
				<MouseSpotlight />
				{children}
			</LanguageProvider>
		</ThemeProvider>
	);
}
