// =====================================
// PORTFOLIO KONFIGURATSIYASI
// Barcha tahrirlanadigan ma'lumotlar shu faylda.
// Komponentlarni o'zgartirmasdan portfolio yangilash uchun
// faqat shu faylni tahrirlang.
// =====================================

/** Til kodi turi */
export type Locale = 'uz' | 'en' | 'ru';

/** Loyiha kartochkasi strukturasi */
export interface ProjectItem {
	id: string;
	title: string;
	description: string;
	technologies: string[];
	github: string;
	demo: string;
	image: string;
}

/** Photoshop loyiha kategoriyalari */
export type PhotoshopCategory = 'poster' | 'thumbnail' | 'social' | 'banner' | 'manipulation' | 'artwork';

/** Photoshop loyiha kartochkasi */
export interface PhotoshopProject {
	id: string;
	titleKey: string;
	category: PhotoshopCategory;
	descriptionKey: string;
	image: string;
	gallery?: string[];
}

/** Ko'nikma guruhi */
export interface SkillGroup {
	id: string;
	items: string[];
	level?: number;
	detailedSkills?: Array<{
		name: string;
		level: number;
	}>;
}

// =========================
// O'ZGARTIRISH MUMKIN — SHAXSIY MA'LUMOTLAR
// =========================

export const personalInfo = {
	name: 'Jovohirbek Isoyev',
	age: 20,
	location: 'Tashkent, Uzbekistan',
	role: 'Full Stack Developer',
	email: 'jovohirbekisayev06@gmail.com',
	profileImage: '/images/jovo.png',
	resumeUrl: '',
} as const;

// =========================
// O'ZGARTIRISH MUMKIN — IJTIMOIY TARMOQLAR
// =========================

export const socialLinks = {
	telegram: 'https://t.me/Isayev1c',
	telegramHandle: '@Isayev1c',
	instagram: 'https://instagram.com/Isayev1c',
	instagramHandle: '@Isayev1c',
	github: 'https://github.com/jovohcekk',
	githubHandle: 'jovohcekk',
	email: 'jovohirbekisayev06@gmail.com',
} as const;

// =========================
// O'ZGARTIRISH MUMKIN — NAVBAR BO'LIMLARI
// =========================

export const navSections = [
	{ id: 'home', labelKey: 'nav.home' },
	{ id: 'about', labelKey: 'nav.about' },
	{ id: 'skills', labelKey: 'nav.skills' },
	{ id: 'projects', labelKey: 'nav.projects' },
	{ id: 'photoshop', labelKey: 'nav.photoshop' },
	{ id: 'experience', labelKey: 'nav.experience' },
	{ id: 'contact', labelKey: 'nav.contact' },
] as const;

/** Photoshop kategoriya kalitlari (i18n) */
export const photoshopCategories: { id: PhotoshopCategory | 'all'; labelKey: string }[] = [
	{ id: 'all', labelKey: 'photoshop.filter.all' },
	{ id: 'poster', labelKey: 'photoshop.category.poster' },
	{ id: 'thumbnail', labelKey: 'photoshop.category.thumbnail' },
	{ id: 'social', labelKey: 'photoshop.category.social' },
	{ id: 'banner', labelKey: 'photoshop.category.banner' },
	{ id: 'manipulation', labelKey: 'photoshop.category.manipulation' },
	{ id: 'artwork', labelKey: 'photoshop.category.artwork' },
];

// =========================
// O'ZGARTIRISH MUMKIN — KO'NIKMALAR
// =========================

export const skillGroups: SkillGroup[] = [
	{
		id: 'programming',
		level: 92,
		items: ['Python', 'Django', 'JavaScript', 'HTML5', 'CSS3'],
		detailedSkills: [
			{ name: 'HTML5', level: 96 },
			{ name: 'CSS3', level: 95 },
			{ name: 'JavaScript', level: 87 },
			{ name: 'Python', level: 70 },
			{ name: 'Django', level: 70 },
		],
	},
	{
		id: 'devTools',
		level: 88,
		items: ['Git', 'Linux', 'REST API'],
		detailedSkills: [
			{ name: 'Git', level: 50 },
			{ name: 'Linux', level: 30 },
			{ name: 'REST API', level: 43 },
		],
	},
	{
		id: 'linux',
		level: 85,
		items: ['Arch Linux', 'BlackArch', 'Kali Linux', 'Ubuntu'],
		detailedSkills: [
			{ name: 'Arch Linux', level: 92 },
			{ name: 'BlackArch', level: 88 },
			{ name: 'Kali Linux', level: 85 },
			{ name: 'Ubuntu', level: 0 },
		],
	},
	{
		id: 'creative',
		level: 82,
		items: ['Adobe Photoshop', 'Blender'],
		detailedSkills: [
			{ name: 'Adobe Photoshop', level: 69 },
			{ name: 'Blender', level: 12 },
		],
	},
	{
		id: 'cybersecurity',
		level: 78,
		items: ['Security Fundamentals', 'Linux Security Basics'],
		detailedSkills: [
			{ name: 'Security Fundamentals', level: 8 },
			{ name: 'Linux Security Basics', level: 3 },
		],
	},
];

/** Shared social/contact link entries */
export const socialLinkItems = [
	{
		id: 'telegram',
		label: 'Telegram',
		value: socialLinks.telegramHandle,
		href: socialLinks.telegram,
		copyValue: socialLinks.telegramHandle,
	},
	{
		id: 'instagram',
		label: 'Instagram',
		value: socialLinks.instagramHandle,
		href: socialLinks.instagram,
		copyValue: socialLinks.instagramHandle,
	},
	{
		id: 'github',
		label: 'GitHub',
		value: socialLinks.githubHandle,
		href: socialLinks.github,
		copyValue: socialLinks.github,
	},
	{
		id: 'email',
		label: 'Email',
		value: socialLinks.email,
		href: `mailto:${socialLinks.email}`,
		copyValue: socialLinks.email,
	},
] as const;

// =========================
// O'ZGARTIRISH MUMKIN — LOYIHALAR
// Cheksiz loyiha qo'shish uchun massivga yangi obyekt qo'shing
// =========================

export const projects: ProjectItem[] = [
	{
		id: 'project-1',
		title: 'Loyiha nomi (tahrirlang)',
		description:
			'Loyiha tavsifini shu yerga yozing. Qanday muammoni hal qilganingiz va natijani qisqacha tushuntiring.',
		technologies: ['Next.js', 'TypeScript', 'Django', 'PostgreSQL'],
		github: 'https://github.com/jovohcekk',
		demo: 'https://example.com',
		image: '/images/projects/project-1.svg',
	},
	{
		id: 'project-2',
		title: 'Ikkinchi loyiha (tahrirlang)',
		description: "Ikkinchi loyihangiz haqida ma'lumot. Texnologiyalar va natijalarni yozing.",
		technologies: ['Python', 'Django REST', 'React', 'Tailwind CSS'],
		github: 'https://github.com/jovohcekk',
		demo: 'https://example.com',
		image: '/images/projects/project-2.svg',
	},
];

// =========================
// O'ZGARTIRISH MUMKIN — PHOTOSHOP LOYIHALARI
// Yangi dizayn qo'shish: massivga obyekt qo'shing, birinchi rasm kartochka uchun thumbnail bo'ladi.
// Qo'shimcha galereya tasvirlari uchun gallery maydonidan foydalaning.
// =========================

export const photoshopProjects: PhotoshopProject[] = [
	{
		id: 'event-poster-suite',
		titleKey: 'photoshop.project.poster.title',
		category: 'poster',
		descriptionKey: 'photoshop.project.poster.description',
		image: '/images/event poster.png',
		gallery: ['/images/poster.png'],
	},
	{
		id: 'social-launch-kit',
		titleKey: 'photoshop.project.social.title',
		category: 'social',
		descriptionKey: 'photoshop.project.social.description',
		image: '/images/SOCIAL MEDIA.png',
		gallery: ['/images/STORY DESIGN.png'],
	},
	{
		id: 'video-thumbnail-cover',
		titleKey: 'photoshop.project.thumbnail.title',
		category: 'thumbnail',
		descriptionKey: 'photoshop.project.thumbnail.description',
		image: '/images/THUMBNAIL.png',
		gallery: [],
	},
	{
		id: 'editorial-manipulation',
		titleKey: 'photoshop.project.manipulation.title',
		category: 'manipulation',
		descriptionKey: 'photoshop.project.manipulation.description',
		image: '/images/PHOTO MANIPULATION.png',
		gallery: [],
	},
	{
		id: 'web-banner-campaign',
		titleKey: 'photoshop.project.banner.title',
		category: 'banner',
		descriptionKey: 'photoshop.project.banner.description',
		image: '/images/WEB BANNER.png',
		gallery: [],
	},
	{
		id: 'creative-artwork-series',
		titleKey: 'photoshop.project.artwork.title',
		category: 'artwork',
		descriptionKey: 'photoshop.project.artwork.description',
		image: '/images/CREATIVE ARTWORK.png',
		gallery: [],
	},
];

// =========================
// O'ZGARTIRISH MUMKIN — STATISTIKA
// =========================

export const statistics = [
	{ id: 'years', value: '4+', labelKey: 'stats.years' },
	{ id: 'clients', value: '100%', labelKey: 'stats.clients' },
	{ id: 'freelance', value: 'Active', labelKey: 'stats.freelance' },
	{ id: 'tech', value: '15+', labelKey: 'stats.tech' },
] as const;

// =========================
// O'ZGARTIRISH MUMKIN — SEO
// =========================

export const seoConfig = {
	siteUrl: 'https://jovohirbek.dev',
	title: 'Jovohirbek Isoyev',
	description:
		'Full Stack Developer — Python, Django, JavaScript, Linux. 4 yillik tajriba, real mijozlar bilan freelance.',
	keywords: ['Full Stack Developer', 'Python', 'Django', 'JavaScript', 'Tashkent', 'Freelance', 'Web Developer'],
	author: 'Jovohirbek Isoyev',
	ogImage: '/images/jovo.png',
} as const;

// =========================
// O'ZGARTIRISH MUMKIN — SUZUVCHI TEXNOLOGIYA IKONKALARI
// =========================

export const floatingTechIcons = [
	'Python',
	'Django',
	'JavaScript',
	'Linux',
	'Git',
	'React',
	'Docker',
	'PostgreSQL',
] as const;
