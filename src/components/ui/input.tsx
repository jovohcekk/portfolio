// =====================================
// INPUT — surface-input klasslari
// =====================================

import { cn } from '@/lib/utils'
import * as React from 'react'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-11 w-full min-w-0 max-w-full rounded-lg border px-4 py-2 text-sm backdrop-blur-sm transition-colors duration-300',
					'surface-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-primary))]',
					'disabled:opacity-50',
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = 'Input';

export { Input }
