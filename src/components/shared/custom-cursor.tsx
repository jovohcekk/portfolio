'use client';

import { useCustomCursor } from '@/hooks/use-custom-cursor';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export function CustomCursor() {
	const { isDesktop, isVisible, mouseX, mouseY, ringX, ringY, cursorState } = useCustomCursor();

	// Hide default cursor globally if desktop
	useEffect(() => {
		if (isDesktop) {
			document.documentElement.style.cursor = 'none !important';
			document.documentElement.style.setProperty('cursor', 'none', 'important');
			document.body.style.cursor = 'none !important';
			document.body.style.setProperty('cursor', 'none', 'important');
		} else {
			document.documentElement.style.cursor = 'auto';
			document.body.style.cursor = 'auto';
		}

		return () => {
			document.documentElement.style.cursor = 'auto';
			document.body.style.cursor = 'auto';
		};
	}, [isDesktop]);

	if (!isDesktop || !isVisible) return null;

	// Calculate scales based on cursor state
	const dotScale = cursorState === 'click' ? 0.8 : cursorState === 'text' ? 0.6 : 1;
	const ringScale = cursorState === 'hover' ? 1.5 : cursorState === 'click' ? 0.7 : cursorState === 'text' ? 0.8 : 1;

	return (
		<>
			{/* Main Cursor Dot - HIGHEST Z-INDEX */}
			<motion.div
				className='pointer-events-none fixed z-9999 mix-blend-screen'
				style={{
					left: mouseX,
					top: mouseY,
					transform: `translate(-50%, -50%) scale(${dotScale})`,
					transition: 'transform 0.15s cubic-bezier(0.22, 1, 0.36, 1)',
					willChange: 'transform',
				}}>
				{/* Inner dot */}
				<div
					className='absolute inset-0'
					style={{
						width: '8px',
						height: '8px',
						borderRadius: '50%',
						backgroundColor: 'rgb(var(--accent-primary))',
						boxShadow: `0 0 20px rgba(var(--accent-primary), 0.8), 0 0 40px rgba(var(--accent-primary), 0.4), inset 0 0 20px rgba(255, 255, 255, 0.2)`,
						position: 'absolute',
						left: '-4px',
						top: '-4px',
					}}
				/>
			</motion.div>

			{/* Trailing Ring - HIGHEST Z-INDEX */}
			<motion.div
				className='pointer-events-none fixed z-9999 mix-blend-screen'
				style={{
					left: ringX,
					top: ringY,
					transform: `translate(-50%, -50%) scale(${ringScale})`,
					transition: 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
					willChange: 'transform',
				}}>
				{/* Outer ring */}
				<div
					className='absolute inset-0'
					style={{
						width: '32px',
						height: '32px',
						borderRadius: '50%',
						border: '2px solid',
						borderColor: `rgba(var(--accent-primary), ${cursorState === 'hover' ? 0.8 : 0.5})`,
						boxShadow: `0 0 15px rgba(var(--accent-primary), ${cursorState === 'hover' ? 0.6 : 0.3})`,
						position: 'absolute',
						left: '-16px',
						top: '-16px',
						transition: 'border-color 0.2s, box-shadow 0.2s',
					}}
				/>

				{/* Second ring for premium effect */}
				{cursorState === 'hover' && (
					<div
						className='absolute inset-0 animate-pulse'
						style={{
							width: '48px',
							height: '48px',
							borderRadius: '50%',
							border: '1px solid',
							borderColor: `rgba(var(--accent-primary), 0.3)`,
							position: 'absolute',
							left: '-24px',
							top: '-24px',
							animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
						}}
					/>
				)}
			</motion.div>

			{/* Text indicator for input fields - HIGHEST Z-INDEX */}
			{cursorState === 'text' && (
				<motion.div
					className='pointer-events-none fixed z-9999'
					style={{
						left: mouseX,
						top: mouseY,
						transform: 'translate(-50%, -50%)',
						opacity: 0.6,
					}}>
					<div
						style={{
							width: '2px',
							height: '16px',
							backgroundColor: `rgb(var(--accent-primary))`,
							boxShadow: `0 0 8px rgba(var(--accent-primary), 0.6)`,
							position: 'absolute',
							left: '-1px',
							top: '-8px',
						}}
					/>
				</motion.div>
			)}

			{/* Hidden style for animations */}
			<style>{`
				@keyframes pulse {
					0%, 100% {
						opacity: 0;
					}
					50% {
						opacity: 0.5;
					}
				}
			`}</style>
		</>
	);
}
