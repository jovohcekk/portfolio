// =====================================
// TEXTAREA — surface-input klasslari
// =====================================

import { cn } from '@/lib/utils'
import * as React from 'react'

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
	({ className, ...props }, ref) => {
		return (
			<textarea
				className={cn(
					'flex min-h-[120px] w-full min-w-0 max-w-full rounded-lg border px-4 py-3 text-sm backdrop-blur-sm transition-colors duration-300 resize-none',
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
Textarea.displayName = 'Textarea';

export { Textarea }
