import { useCallback, useEffect, useRef, useState } from 'react'

export type CursorState = 'default' | 'hover' | 'click' | 'text';

interface Position {
	x: number;
	y: number;
}

export function useCustomCursor() {
	const [isDesktop, setIsDesktop] = useState(false);
	const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 });
	const [ringPos, setRingPos] = useState<Position>({ x: 0, y: 0 });
	const [cursorState, setCursorState] = useState<CursorState>('default');
	const [isVisible, setIsVisible] = useState(true);
	const mouseRef = useRef<Position>({ x: 0, y: 0 });
	const ringRef = useRef<Position>({ x: 0, y: 0 });
	const animationFrameRef = useRef<number | null>(null);

	// Smooth interpolation (lerp) for ring trailing effect
	const lerp = useCallback((start: number, end: number, factor: number) => {
		return start + (end - start) * factor;
	}, []);

	// Animate ring position with trailing effect
	const animateRing = useRef<FrameRequestCallback>(() => {});

	useEffect(() => {
		animateRing.current = () => {
			const lerpFactor = 0.15;
			ringRef.current.x = lerp(ringRef.current.x, mouseRef.current.x, lerpFactor);
			ringRef.current.y = lerp(ringRef.current.y, mouseRef.current.y, lerpFactor);
			setRingPos({ x: ringRef.current.x, y: ringRef.current.y });
			animationFrameRef.current = requestAnimationFrame(animateRing.current);
		};
	}, [lerp]);

	// Initialize - check if desktop
	useEffect(() => {
		const checkDesktop = () => {
			const isLarge = window.matchMedia('(min-width: 1024px)').matches;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const nav = navigator as any;
			const isTouchDevice = () => {
				return (
					(navigator.maxTouchPoints !== undefined && navigator.maxTouchPoints > 2) ||
					(nav.msMaxTouchPoints !== undefined && nav.msMaxTouchPoints > 2)
				);
			};
			setIsDesktop(isLarge && !isTouchDevice());
		};

		checkDesktop();
		window.addEventListener('resize', checkDesktop);
		return () => window.removeEventListener('resize', checkDesktop);
	}, []);

	// Track mouse movement - OPTIMIZED with passive listeners
	useEffect(() => {
		if (!isDesktop) return;

		const handleMouseMove = (e: MouseEvent) => {
			mouseRef.current = { x: e.clientX, y: e.clientY };
			setMousePos({ x: e.clientX, y: e.clientY });
		};

		const handleMouseEnter = () => {
			setIsVisible(true);
		};

		const handleMouseLeave = () => {
			setIsVisible(false);
		};

		// Use passive listeners for better scroll performance
		window.addEventListener('mousemove', handleMouseMove, { passive: true });
		window.addEventListener('mouseenter', handleMouseEnter);
		window.addEventListener('mouseleave', handleMouseLeave);

		// Start animation loop
		animationFrameRef.current = requestAnimationFrame(animateRing.current);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseenter', handleMouseEnter);
			window.removeEventListener('mouseleave', handleMouseLeave);
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [isDesktop]);

	// Handle interactive element hover - OPTIMIZED with consolidated handlers
	useEffect(() => {
		if (!isDesktop) return;

		// Consolidated hover/interaction detection
		const handleMouseOver = (e: Event) => {
			const target = e.target as HTMLElement;
			const isButton = target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a[href]');
			const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('input') || target.closest('textarea');
			
			if (isButton) setCursorState('hover');
			else if (isInput) setCursorState('text');
		};

		const handleMouseOut = (e: Event) => {
			const target = e.target as HTMLElement;
			const wasButton = target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a[href]');
			const wasInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('input') || target.closest('textarea');
			
			if (wasButton || wasInput) setCursorState('default');
		};

		const handleMouseDown = () => {
			setCursorState('click');
		};

		const handleMouseUp = () => {
			setCursorState('default');
		};

		// Single listener per event type instead of duplicates
		document.addEventListener('mouseover', handleMouseOver, { passive: true });
		document.addEventListener('mouseout', handleMouseOut, { passive: true });
		document.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('mouseup', handleMouseUp);

		return () => {
			document.removeEventListener('mouseover', handleMouseOver);
			document.removeEventListener('mouseout', handleMouseOut);
			document.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isDesktop]);

	return {
		isDesktop,
		isVisible,
		mousePos,
		ringPos,
		cursorState,
	};
}
