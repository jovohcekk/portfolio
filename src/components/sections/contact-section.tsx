'use client';

import { SectionHeading } from '@/components/shared/section-heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { socialLinkItems } from '@/config/portfolio';
import { useLanguage } from '@/hooks/use-language';
import { fadeInUp, scaleIn, staggerContainer } from '@/lib/animations';
import { copyToClipboard } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowDown, Check, Copy, Github, Instagram, Mail, Phone, RotateCcw, Send, type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const contactIcons: Record<string, LucideIcon> = {
	telegram: Send,
	instagram: Instagram,
	github: Github,
	email: Mail,
};

const floatingArrowVariants = {
	animate: {
		y: [0, 12, 0],
		transition: {
			duration: 2.5,
			ease: 'easeInOut',
			repeat: Infinity,
		},
	},
};

export function ContactSection() {
	const { translate } = useLanguage();
	const [copiedId, setCopiedId] = useState<string | null>(null);
	const [formState, setFormState] = useState({ name: '', phone: '', email: '', message: '', website: '' });
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
	const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
			if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
		};
	}, []);

	const handleCopy = async (id: string, text: string) => {
		const ok = await copyToClipboard(text);
		if (ok) {
			setCopiedId(id);
			if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
			copyTimerRef.current = setTimeout(() => setCopiedId(null), 2000);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus('loading');
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formState),
			});
			if (!res.ok) throw new Error('Failed');
			setStatus('success');
			setFormState({ name: '', phone: '', email: '', message: '', website: '' });
		} catch {
			setStatus('error');
		}
		if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
		statusTimerRef.current = setTimeout(() => setStatus('idle'), 5000);
	};

	const handleReset = () => {
		setFormState({ name: '', phone: '', email: '', message: '', website: '' });
		setStatus('idle');
	};

	return (
		<section
			id='contact'
			className='section-surface section-surface-tint relative w-full max-w-full overflow-hidden section-spacing'>
			<div className='pointer-events-none absolute inset-0 bg-hero-mesh opacity-30' />
			<div className='section-container relative'>
				<SectionHeading title={translate('contact.title')} subtitle={translate('contact.subtitle')} />

				<div className='grid w-full min-w-0 grid-cols-1 gap-8 xs:gap-12 lg:grid-cols-2'>
					<motion.div
						variants={staggerContainer}
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true }}
						className='w-full min-w-0 space-y-3 xs:space-y-4'>
						{socialLinkItems.map(item => {
							const Icon = contactIcons[item.id] ?? Mail;
							return (
								<motion.div
									key={item.id}
									variants={scaleIn}
									whileHover={{ x: 4 }}
									className='glass-card contact-card flex min-w-0 items-center justify-between gap-2 rounded-xl p-3 xs:gap-4 xs:p-4 hover-accent-highlight transition-all duration-300 hover:shadow-[var(--shadow-glow)]'>
									<a
										href={item.href}
										target='_blank'
										rel='noopener noreferrer'
										className='flex min-w-0 flex-1 items-center gap-3 transition-colors duration-300 hover:text-accent xs:gap-4'>
										<div className='icon-box flex h-10 w-10 shrink-0 items-center justify-center rounded-lg xs:h-12 xs:w-12 transition-all duration-300'>
											<Icon className='h-5 w-5' />
										</div>
										<div className='min-w-0 flex-1'>
											<p className='text-xs text-secondary-content'>{item.label}</p>
											<p className='break-anywhere font-medium text-primary-content text-sm xs:text-base'>
												{item.value}
											</p>
										</div>
									</a>
									<button
										type='button'
										onClick={() => handleCopy(item.id, item.copyValue)}
										className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg surface-chip text-primary-content hover-accent-highlight transition-all duration-300 active:scale-95'
										aria-label={`${translate('contact.copy')} ${item.label}`}>
										{copiedId === item.id ? <Check className='h-4 w-4 text-success' /> : <Copy className='h-4 w-4' />}
									</button>
								</motion.div>
							);
						})}
					</motion.div>

					<motion.div
						variants={fadeInUp}
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true }}
						className='w-full min-w-0'>
						{/* Form Heading with Animated Arrow */}
						<motion.div
							className='flex items-center gap-3 mb-6'
							initial={{ opacity: 0, y: -20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.2 }}>
							<h3 className='text-lg xs:text-xl font-semibold text-gradient-brand'>
								{translate('contact.form.heading')}
							</h3>
							<motion.div variants={floatingArrowVariants} animate='animate' className='inline-flex'>
								<ArrowDown className='h-5 w-5 text-accent' />
							</motion.div>
						</motion.div>

						<motion.form
							variants={fadeInUp}
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true }}
							onSubmit={handleSubmit}
							className='glass-card-premium w-full min-w-0 rounded-2xl p-4 xs:p-6 md:p-8 contact-form-premium'
							noValidate>
							<div className='space-y-4'>
								<div className='absolute -left-[9999px] h-px w-px overflow-hidden' aria-hidden>
									<Label htmlFor='website'>Website</Label>
									<Input
										id='website'
										tabIndex={-1}
										autoComplete='off'
										value={formState.website}
										onChange={e => setFormState(s => ({ ...s, website: e.target.value }))}
									/>
								</div>
							<div>
									<Label htmlFor='name' className='label-premium'>
										{translate('contact.form.name')}
									</Label>
									<Input
										id='name'
										required
										maxLength={120}
										value={formState.name}
										onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
										className='mt-2 input-premium'
										placeholder={translate('contact.form.name.placeholder')}
									/>
								</div>
								<div>
									<Label htmlFor='phone' className='label-premium'>
										{translate('contact.form.phone')}
									</Label>
									<div className='mt-2 relative'>
										<Phone className='absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-accent pointer-events-none' />
										<Input
											id='phone'
											type='tel'
											maxLength={20}
											value={formState.phone}
											onChange={e => setFormState(s => ({ ...s, phone: e.target.value }))}
											className='mt-0 input-premium pl-10'
											placeholder='+998 99 999 99 99'
										/>
									</div>
								</div>
							<div>
									<Label htmlFor='email' className='label-premium'>
										{translate('contact.form.email')}
									</Label>
									<Input
										id='email'
										type='email'
										required
										maxLength={254}
										value={formState.email}
										onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
										className='mt-2 input-premium'
										placeholder={translate('contact.form.email.placeholder')}
									/>
								</div>
							<div>
									<Label htmlFor='message' className='label-premium'>
										{translate('contact.form.message')}
									</Label>
									<Textarea
										id='message'
										required
										maxLength={5000}
										value={formState.message}
										onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
										className='mt-2 input-premium'
										placeholder={translate('contact.form.message.placeholder')}
									/>
								</div>
							</div>

							<div aria-live='polite' aria-atomic='true' className='min-h-[1.25rem]'>
								{status === 'success' && (
									<motion.p
										initial={{ opacity: 0, y: 8 }}
										animate={{ opacity: 1, y: 0 }}
										className='mt-4 text-sm text-success font-medium'>
										{translate('contact.form.success')}
									</motion.p>
								)}
								{status === 'error' && (
									<motion.p
										initial={{ opacity: 0, y: 8 }}
										animate={{ opacity: 1, y: 0 }}
										className='mt-4 text-sm text-error font-medium'>
										{translate('contact.form.error')}
									</motion.p>
								)}
							</div>

							<div className='mt-6 flex w-full gap-3 xs:gap-4'>
								<motion.button
									type='submit'
									className='flex-1 inline-flex max-w-full items-center justify-center gap-2 rounded-lg text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-primary))] disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0 active:scale-[0.97] btn-gradient text-white shadow-brand hover:brightness-[1.04] hover:shadow-brand-lg btn-glow-pulse btn-contact-futuristic btn-premium h-11 min-h-[2.75rem] px-4 py-2 xs:px-6'
									disabled={status === 'loading'}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}>
									<Send className='h-4 w-4' />
									<span>
										{status === 'loading' ? translate('contact.form.sending') : translate('contact.form.send')}
									</span>
								</motion.button>
								<motion.button
									type='button'
									onClick={handleReset}
									className='inline-flex max-w-full items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-primary))] disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0 active:scale-[0.97] border border-[var(--border-subtle)] bg-[rgb(var(--surface-elevated-rgb)/0.6)] text-primary-content hover:bg-[rgb(var(--surface-rgb)/0.8)] hover:border-[var(--border-glow)] btn-contact-reset btn-reset-premium h-11 min-h-[2.75rem] px-4 py-2 xs:px-6'
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}>
									<RotateCcw className='h-4 w-4' />
									<span>{translate('contact.form.reset')}</span>
								</motion.button>
							</div>
						</motion.form>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
