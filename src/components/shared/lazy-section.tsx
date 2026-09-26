'use client';

import {
	createContext,
	createElement,
	lazy,
	Suspense,
	useContext,
	useEffect,
	useRef,
	useState,
	type ComponentType,
} from 'react';

interface SectionActivityValue {
	isActive: boolean;
	animationsActive: boolean;
}

const SectionActivityContext = createContext<SectionActivityValue>({ isActive: true, animationsActive: true });

export function useSectionActivity() {
	return useContext(SectionActivityContext).isActive;
}

export function useSectionAnimationsActive() {
	return useContext(SectionActivityContext).animationsActive;
}

interface LazySectionProps {
	id: string;
	// Dynamic section modules have different prop contracts; the boundary forwards them unchanged.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	load: () => Promise<{ default: ComponentType<any> }>;
	props?: Record<string, unknown>;
	className?: string;
	fallbackClassName?: string;
	eager?: boolean;
}

const PRELOAD_MARGIN = '300px 0px';

export function LazySection({
	id,
	load,
	props,
	className = '',
	fallbackClassName = 'min-h-[70vh]',
	eager = false,
}: LazySectionProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [shouldLoad, setShouldLoad] = useState(eager);
	const [isActive, setIsActive] = useState(eager);
	const [animationsReady, setAnimationsReady] = useState(false);
	const [LoadedSection] = useState(() => lazy(load));

	useEffect(() => {
		const element = containerRef.current;
		if (!element) return;
		let idleCallbackId: number | null = null;
		let fallbackTimerId: number | null = null;
		let activationScheduled = false;
		let activationComplete = false;

		const cancelActivation = () => {
			if (idleCallbackId !== null) {
				window.cancelIdleCallback(idleCallbackId);
				idleCallbackId = null;
			}
			if (fallbackTimerId !== null) {
				window.clearTimeout(fallbackTimerId);
				fallbackTimerId = null;
			}
			activationScheduled = false;
		};

		const activateAnimationsWhenIdle = () => {
			if (activationScheduled || activationComplete) return;
			activationScheduled = true;

			if (typeof window.requestIdleCallback === 'function') {
				idleCallbackId = window.requestIdleCallback(
					() => {
						idleCallbackId = null;
						activationScheduled = false;
						activationComplete = true;
						setAnimationsReady(true);
					},
					{ timeout: 1000 },
				);
			} else {
				fallbackTimerId = window.setTimeout(() => {
					fallbackTimerId = null;
					activationScheduled = false;
					activationComplete = true;
					setAnimationsReady(true);
				}, 250);
			}
		};

		const preloadObserver = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setShouldLoad(true);
				}
			},
			{ rootMargin: PRELOAD_MARGIN, threshold: 0.01 },
		);
		const activityObserver = new IntersectionObserver(
			([entry]) => {
				setIsActive(entry.isIntersecting);
				if (entry.isIntersecting) activateAnimationsWhenIdle();
				else if (!activationComplete) cancelActivation();
			},
			{ threshold: 0.01 },
		);

		preloadObserver.observe(element);
		activityObserver.observe(element);
		return () => {
			preloadObserver.disconnect();
			activityObserver.disconnect();
			cancelActivation();
		};
	}, []);

	return (
		<div
			ref={containerRef}
			id={id}
			className={className}
			data-section-active={isActive && animationsReady ? 'true' : 'false'}>
			{shouldLoad ? (
				<Suspense fallback={<div className={fallbackClassName} aria-hidden />}>
					<SectionActivityContext.Provider value={{ isActive, animationsActive: isActive && animationsReady }}>
						{createElement(LoadedSection, props)}
					</SectionActivityContext.Provider>
				</Suspense>
			) : (
				<div className={fallbackClassName} aria-hidden />
			)}
		</div>
	);
}
