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

/** Ko'nikma guruhi */
export interface SkillGroup {
	id: string;
	items: string[];
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
	{ id: 'experience', labelKey: 'nav.experience' },
	{ id: 'contact', labelKey: 'nav.contact' },
] as const;

// =========================
// O'ZGARTIRISH MUMKIN — KO'NIKMALAR
// =========================

export const skillGroups: SkillGroup[] = [
	{
		id: 'programming',
		items: ['Python', 'Django', 'JavaScript', 'HTML5', 'CSS3'],
	},
	{
		id: 'devTools',
		items: ['Git', 'Linux', 'REST API'],
	},
	{
		id: 'linux',
		items: ['Arch Linux', 'BlackArch', 'Kali Linux', 'Ubuntu'],
	},
	{
		id: 'creative',
		items: ['Adobe Photoshop', 'Blender'],
	},
	{
		id: 'cybersecurity',
		items: ['Security Fundamentals', 'Linux Security Basics'],
	},
];

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
	title: 'Jovohirbek Isoyev | Full Stack Developer',
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
