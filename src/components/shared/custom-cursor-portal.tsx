'use client'

import { useEffect, useState, useMemo, memo } from 'react'
import { createPortal } from 'react-dom'
import { useCustomCursor } from '@/hooks/use-custom-cursor'

/**
 * CustomCursor Portal Component - OPTIMIZED FOR PERFORMANCE
 * Renders cursor at the document root level with memoization
 * Uses createPortal to escape stacking contexts
 * 
 * OPTIMIZATIONS:
 * - useMemo for scale calculations to prevent re-calculations
 * - memo() wrapper to prevent unnecessary re-renders when props haven't changed
 * - Consolidated cursor content rendering
 * - Premium Light Mode: Pure Black with White outline
 * - Premium Dark Mode: Pure White with Dark glow
 */
function CustomCursorPortalComponent() {
	const { isDesktop, isVisible, mousePos, ringPos, cursorState } = useCustomCursor()
	const [mounted, setMounted] = useState(false)
	const [isDarkMode, setIsDarkMode] = useState(false)

	useEffect(() => {
		setMounted(true);
		// Check for dark mode
		const isDark = document.documentElement.classList.contains('dark');
		setIsDarkMode(isDark);

		// OPTIMIZATION: Use a more efficient MutationObserver configuration
		const observer = new MutationObserver((mutations) => {
			// Only check for dark class changes
			for (const mutation of mutations) {
				if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
					const isDark = document.documentElement.classList.contains('dark');
					setIsDarkMode(isDark);
					break; // Only process once per batch
				}
			}
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
			attributeOldValue: false,
		});
		return () => observer.disconnect();
	}, []);

	// Hide default cursor globally if desktop - with stronger importance
	useEffect(() => {
		if (isDesktop) {
			document.documentElement.style.cursor = 'none !important';
			document.body.style.cursor = 'none !important';

			return () => {
				document.documentElement.style.cursor = 'auto';
				document.body.style.cursor = 'auto';
			};
		} else {
			document.documentElement.style.cursor = 'auto';
			document.body.style.cursor = 'auto';
		}

		return () => {
			document.documentElement.style.cursor = 'auto';
			document.body.style.cursor = 'auto';
		};
	}, [isDesktop]);

	// OPTIMIZATION: Memoize scale calculations (must be before early return)
	const scales = useMemo(() => ({
		dotScale: cursorState === 'click' ? 0.8 : cursorState === 'text' ? 0.6 : 1,
		ringScale:
			cursorState === 'hover'
				? 1.5
				: cursorState === 'click'
				? 0.7
				: cursorState === 'text'
				? 0.8
				: 1,
	}), [cursorState])

	const { dotScale, ringScale } = scales

	// LIGHT MODE: Pure Black with White outline
	// DARK MODE: Pure White with Dark glow
	const getCursorColors = () => {
		if (isDarkMode) {
			// Dark Mode: Pure White
			return {
				dotColor: 'rgb(255, 255, 255)',
				dotGlow: '0 0 10px rgba(0, 0, 0, 0.5), inset 0 0 8px rgba(0, 0, 0, 0.3)',
				ringBorder: `rgba(255, 255, 255, ${cursorState === 'hover' ? 0.9 : 0.7})`,
				ringGlow: `0 0 15px rgba(0, 0, 0, 0.6), inset 0 0 8px rgba(0, 0, 0, 0.3)`,
				textGlow: '0 0 10px rgba(0, 0, 0, 0.5)',
				dotOutline: 'none',
				pulseRingBorder: 'rgba(255, 255, 255, 0.4)',
				pulseGlow: '0 0 15px rgba(0, 0, 0, 0.4)',
				mixBlend: 'mix-blend-multiply',
			}
		} else {
			// Light Mode: Pure Black with White outline
			return {
				dotColor: 'rgb(0, 0, 0)',
				dotGlow: '0 0 8px rgba(255, 255, 255, 0.8), inset 0 0 8px rgba(255, 255, 255, 0.4)',
				ringBorder: `rgba(0, 0, 0, ${cursorState === 'hover' ? 0.9 : 0.7})`,
				ringGlow: `0 0 12px rgba(255, 255, 255, 0.8), inset 0 0 8px rgba(255, 255, 255, 0.5)`,
				textGlow: '0 0 8px rgba(255, 255, 255, 0.8)',
				dotOutline: '2px solid rgba(255, 255, 255, 0.7)',
				pulseRingBorder: 'rgba(0, 0, 0, 0.4)',
				pulseGlow: '0 0 15px rgba(255, 255, 255, 0.6)',
				mixBlend: 'mix-blend-multiply',
			}
		}
	}

	const colors = getCursorColors()

	if (!mounted || !isDesktop || !isVisible) return null

	const cursorContent = (
		<>
			{/* Main Cursor Dot - HIGHEST Z-INDEX */}
			<div
				className='pointer-events-none fixed'
				style={{
					left: `${mousePos.x}px`,
					top: `${mousePos.y}px`,
					transform: `translate(-50%, -50%) scale(${dotScale})`,
					transition: 'transform 0.15s cubic-bezier(0.22, 1, 0.36, 1)',
					willChange: 'transform',
					zIndex: 2147483647,
				}}>
				{/* Inner dot with outline for Light Mode / glow for Dark Mode */}
				<div
					className='absolute inset-0'
					style={{
						width: '8px',
						height: '8px',
						borderRadius: '50%',
						backgroundColor: colors.dotColor,
						border: colors.dotOutline,
						boxShadow: colors.dotGlow,
						position: 'absolute',
						left: '-4px',
						top: '-4px',
						backdropFilter: 'blur(1px)',
					}}
				/>
			</div>

			{/* Trailing Ring - HIGHEST Z-INDEX */}
			<div
				className='pointer-events-none fixed'
				style={{
					left: `${ringPos.x}px`,
					top: `${ringPos.y}px`,
					transform: `translate(-50%, -50%) scale(${ringScale})`,
					transition: 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
					willChange: 'transform',
					zIndex: 2147483647,
				}}>
				{/* Outer ring - Black in Light Mode / White in Dark Mode */}
				<div
					className='absolute inset-0'
					style={{
						width: '32px',
						height: '32px',
						borderRadius: '50%',
						border: '2px solid',
						borderColor: colors.ringBorder,
						boxShadow: colors.ringGlow,
						position: 'absolute',
						left: '-16px',
						top: '-16px',
						transition: 'border-color 0.2s, box-shadow 0.2s',
						backdropFilter: 'blur(2px)',
					}}
				/>

				{/* Second ring for premium effect - with glow in both modes */}
				{cursorState === 'hover' && (
					<div
						className='absolute inset-0 animate-pulse'
						style={{
							width: '48px',
							height: '48px',
							borderRadius: '50%',
							border: '1px solid',
							borderColor: colors.pulseRingBorder,
							position: 'absolute',
							left: '-24px',
							top: '-24px',
							animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
							boxShadow: colors.pulseGlow,
						}}
					/>
				)}
			</div>

			{/* Text indicator for input fields - HIGHEST Z-INDEX */}
			{cursorState === 'text' && (
				<div
					className='pointer-events-none fixed'
					style={{
						left: `${mousePos.x}px`,
						top: `${mousePos.y}px`,
						transform: 'translate(-50%, -50%)',
						opacity: 0.8,
						zIndex: 2147483647,
					}}>
					<div
						style={{
							width: '2px',
							height: '16px',
							backgroundColor: colors.dotColor,
							boxShadow: `0 0 12px ${colors.textGlow}`,
							position: 'absolute',
							left: '-1px',
							top: '-8px',
							backdropFilter: 'blur(1px)',
						}}
					/>
				</div>
			)}

			{/* Hidden style for animations */}
			<style>{`
				@keyframes pulse {
					0%, 100% {
						opacity: 0;
					}
					50% {
						opacity: 0.6;
					}
				}
			`}</style>
		</>
	)

	// Use createPortal to render cursor at body level, escaping DOM hierarchy
	return typeof document !== 'undefined' ? createPortal(cursorContent, document.body) : null
}

// OPTIMIZATION: Memoized component to prevent unnecessary re-renders
export const CustomCursorPortal = memo(CustomCursorPortalComponent)
