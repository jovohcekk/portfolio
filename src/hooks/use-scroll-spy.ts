'use client';

import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds: string[], rootMargin = '-40% 0px -50% 0px') {
	const [activeId, setActiveId] = useState(sectionIds[0] ?? 'home');

	useEffect(() => {
		let observer: IntersectionObserver | null = null;
		const connect = () => {
			observer?.disconnect();
			const elements = sectionIds.map(id => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);

			if (elements.length === 0) return;

			observer = new IntersectionObserver(
				entries => {
					const visible = entries
						.filter(e => e.isIntersecting)
						.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
					if (visible[0]?.target.id) setActiveId(visible[0].target.id);
				},
				{ rootMargin, threshold: [0, 0.1, 0.25, 0.5] },
			);
			elements.forEach(element => observer?.observe(element));
		};

		connect();
		const mutationObserver = new MutationObserver(connect);
		mutationObserver.observe(document.getElementById('main-content') ?? document.body, {
			childList: true,
			subtree: true,
		});
		return () => {
			observer?.disconnect();
			mutationObserver.disconnect();
		};
	}, [sectionIds, rootMargin]);

	return activeId;
}
