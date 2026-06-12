'use client';

import { floatingTechIcons } from '@/config/portfolio'
import Image from 'next/image'

interface Props {
	src: string;
	alt: string;
	priority?: boolean;
	reducedMotion?: boolean;
}

export function HeroCleanProfile({ src, alt, priority = false, reducedMotion = false }: Props) {
	return (
		<div className={`hero-clean-container ${reducedMotion ? 'reduced-motion' : ''}`}>
			<div className='hero-bg-layer-1' aria-hidden />
			<div className='hero-bg-layer-2' aria-hidden />

			<div className='hero-light-streaks' aria-hidden>
				<span className='streak s1' />
				<span className='streak s2' />
				<span className='streak s3' />
			</div>

			<div className='hero-profile'>
				<div className='hero-profile-frame'>
					<div className='hero-profile-media'>
						<Image
							src={src}
							alt={alt}
							fill
							className='hero-img'
							priority={priority}
							sizes='(max-width: 640px) 220px, (max-width: 1024px) 360px, 480px'
						/>
					</div>
				</div>
			</div>

			<div className='hero-badges' aria-hidden>
				{floatingTechIcons.slice(0, 9).map((b, i) => (
					<span className='hero-badge' key={b + i}>
						{b}
					</span>
				))}
			</div>

			<div className='hero-particles' aria-hidden>
				<span className='p p1' />
				<span className='p p2' />
				<span className='p p3' />
			</div>
		</div>
	);
}

export default HeroCleanProfile;
