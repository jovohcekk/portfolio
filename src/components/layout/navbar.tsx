'use client';

import { LanguageDropdown } from '@/components/shared/language-dropdown';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { navSections, personalInfo, type Locale } from '@/config/portfolio';
import { useLanguage } from '@/hooks/use-language';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import type { TranslationKey } from '@/lib/i18n/translations';
import { cn, scrollToSection } from '@/lib/utils';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const locales: Locale[] = ['uz', 'en', 'ru'];

export function Navbar() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [desktopIndicator, setDesktopIndicator] = useState({ x: 0, width: 0 });
	const [mobileIndicator, setMobileIndicator] = useState({ x: 0, width: 0 });
	const { locale, setLocale, translate } = useLanguage();
	const sectionIds = navSections.map(s => s.id);
	const activeId = useScrollSpy(sectionIds);
	const { scrollY } = useScroll();
	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const desktopNavRef = useRef<HTMLUListElement>(null);
	const mobileNavRef = useRef<HTMLUListElement>(null);

	useMotionValueEvent(scrollY, 'change', latest => {
		setScrolled(latest > 20);
	});

	useLayoutEffect(() => {
		const updateIndicator = (
			navRef: HTMLUListElement | null,
			setter: (value: { x: number; width: number }) => void,
		) => {
			if (!navRef) return;
			const activeButton = navRef.querySelector<HTMLElement>(`[data-nav-id="${activeId}"]`);
			if (!activeButton) return;
			const navRect = navRef.getBoundingClientRect();
			const buttonRect = activeButton.getBoundingClientRect();
			setter({
				x: buttonRect.left - navRect.left,
				width: buttonRect.width,
			});
		};

		updateIndicator(desktopNavRef.current, setDesktopIndicator);
		updateIndicator(mobileNavRef.current, setMobileIndicator);
	}, [activeId, mobileOpen]);

	useEffect(() => {
		const handleResize = () => {
			const updateIndicator = (
				navRef: HTMLUListElement | null,
				setter: (value: { x: number; width: number }) => void,
			) => {
				if (!navRef) return;
				const activeButton = navRef.querySelector<HTMLElement>(`[data-nav-id="${activeId}"]`);
				if (!activeButton) return;
				const navRect = navRef.getBoundingClientRect();
				const buttonRect = activeButton.getBoundingClientRect();
				setter({
					x: buttonRect.left - navRect.left,
					width: buttonRect.width,
				});
			};

			updateIndicator(desktopNavRef.current, setDesktopIndicator);
			updateIndicator(mobileNavRef.current, setMobileIndicator);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [activeId]);

	useEffect(() => {
		if (!mobileOpen) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setMobileOpen(false);
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [mobileOpen]);

	const handleNav = (id: string, event?: React.MouseEvent<HTMLAnchorElement>) => {
		event?.preventDefault();
		setMobileOpen(false);
		window.requestAnimationFrame(() => scrollToSection(id));
	};

	return (
		<header
			className={cn(
				'fixed top-0 left-0 right-0 z-50 w-full max-w-[100vw] transition-all duration-300',
				scrolled
					? 'surface-header shadow-[0_4px_24px_rgba(15,23,42,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
					: 'bg-transparent',
			)}>
			<nav
				className='section-container flex items-center justify-between gap-2 py-3 sm:py-4 min-w-0'
				aria-label='Main navigation'>
				<motion.button
					onClick={() => {
						setMobileOpen(false);
						window.requestAnimationFrame(() => scrollToSection('home'));
					}}
					className='shrink-0 text-base font-bold sm:text-lg'
					whileHover={{ scale: 1.03 }}
					whileTap={{ scale: 0.97 }}
					aria-label={`${personalInfo.name} — ${translate('nav.home')}`}>
					<span className='text-gradient-brand'>{personalInfo.name.split(' ')[0]}</span>
				</motion.button>

				<ul ref={desktopNavRef} className='relative hidden items-center gap-0.5 lg:flex xl:gap-1'>
					<motion.span
						aria-hidden='true'
						className='nav-active-pill absolute inset-y-0 left-0 rounded-lg'
						animate={{ x: desktopIndicator.x, width: desktopIndicator.width }}
						transition={{ type: 'spring', stiffness: 380, damping: 30 }}
					/>
					{navSections.map(section => (
						<li key={section.id}>
							<motion.a
								href={`#${section.id}`}
								data-nav-id={section.id}
								onClick={event => handleNav(section.id, event)}
								aria-current={activeId === section.id ? 'true' : undefined}
								whileHover={{ y: -1, scale: 1.01 }}
								whileTap={{ scale: 0.98 }}
								transition={{ type: 'spring', stiffness: 420, damping: 28 }}
								className={cn(
									'relative nav-hover isolate inline-flex items-center justify-center rounded-lg px-2.5 py-2 text-xs font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] xl:px-3.5 xl:text-sm',
									activeId === section.id ? 'nav-active-text' : 'text-secondary-content hover:text-primary-content',
								)}>
								<span className='relative z-10'>{translate(section.labelKey as TranslationKey)}</span>
							</motion.a>
						</li>
					))}
				</ul>

				<div className='flex shrink-0 items-center gap-1.5 sm:gap-2'>
					{/* Desktop Language Dropdown */}
					<LanguageDropdown
						currentLocale={locale}
						locales={locales}
						onLocaleChange={setLocale}
						className='hidden sm:block'
					/>

					<ThemeToggle />

					<motion.button
						type='button'
						className='flex h-10 w-10 items-center justify-center rounded-lg surface-chip text-primary-content lg:hidden'
						onClick={() => setMobileOpen(!mobileOpen)}
						whileHover={{ scale: 1.04, y: -1 }}
						whileTap={{ scale: 0.96 }}
						transition={{ type: 'spring', stiffness: 420, damping: 25 }}
						aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={mobileOpen}
						aria-controls='mobile-nav'>
						{mobileOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
					</motion.button>
				</div>
			</nav>

			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						ref={mobileMenuRef}
						id='mobile-nav'
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
						className='w-full border-t border-[var(--border-subtle)] glass-card rounded-none border-x-0 lg:hidden overflow-hidden'>
						<ul ref={mobileNavRef} className='relative flex flex-col gap-1 p-4'>
							<motion.span
								aria-hidden='true'
								className='nav-active-pill absolute inset-x-0 top-0 left-0 rounded-lg'
								animate={{ y: 0, x: mobileIndicator.x, width: mobileIndicator.width }}
								transition={{ type: 'spring', stiffness: 380, damping: 30 }}
							/>
							{navSections.map((section, i) => (
								<motion.li
									key={section.id}
									initial={{ opacity: 0, x: -12 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: i * 0.04 }}>
									<button
										type='button'
										onClick={() => handleNav(section.id)}
										aria-current={activeId === section.id ? 'true' : undefined}
										className={cn(
											'w-full rounded-lg px-4 py-3 text-left text-sm transition-colors duration-300',
											activeId === section.id ? 'locale-active' : 'text-secondary-content',
										)}>
										{translate(section.labelKey as TranslationKey)}
									</button>
								</motion.li>
							))}
							<li className='pt-3 border-t border-[var(--border-subtle)]'>
								<LanguageDropdown
									currentLocale={locale}
									locales={locales}
									onLocaleChange={setLocale}
									className='w-full'
								/>
							</li>
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
