'use client';

import { useLanguage } from '@/hooks/use-language';
import { withThemeTransition } from '@/lib/theme-transition';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle({ className }: { className?: string }) {
	const { theme, setTheme, resolvedTheme } = useTheme();
	const { translate } = useLanguage();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const isDark = mounted ? (resolvedTheme ?? theme) === 'dark' : true;

	const handleToggle = () => {
		withThemeTransition(() => setTheme(isDark ? 'light' : 'dark'));
	};

	if (!mounted) {
		return <div className={cn('h-10 w-10 rounded-lg surface-chip', className)} aria-hidden />;
	}

	return (
		<motion.button
			type='button'
			onClick={handleToggle}
			whileHover={{ scale: 1.04, y: -1 }}
			whileTap={{ scale: 0.96 }}
			transition={{ type: 'spring', stiffness: 420, damping: 25 }}
			className={cn(
				'flex h-10 w-10 items-center justify-center rounded-lg surface-chip text-primary-content hover-accent-highlight',
				className,
			)}
			aria-label={isDark ? translate('theme.light') : translate('theme.dark')}>
			{isDark ? <Sun className='h-4 w-4 text-accent-secondary' /> : <Moon className='h-4 w-4 text-accent' />}
		</motion.button>
	);
}
