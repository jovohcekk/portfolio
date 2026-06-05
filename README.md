# Jovohirbek Isoyev — Premium Portfolio

Zamonaviy Full Stack Developer portfolio veb-sayti. Next.js 15, TypeScript, Tailwind CSS, Framer Motion va shadcn/ui uslubidagi komponentlar bilan yaratilgan.

## Papka tuzilmasi

| Papka / Fayl | Maqsadi |
|--------------|---------|
| `src/app/` | Next.js App Router — sahifalar, layout, global CSS, API route |
| `src/components/ui/` | Qayta ishlatiladigan UI (Button, Card, Input…) |
| `src/components/sections/` | Hero, About, Skills, Projects, Experience, Contact |
| `src/components/layout/` | Navbar, Footer, LoadingScreen, BackToTop |
| `src/components/shared/` | SectionHeading, TypingText kabi yordamchi komponentlar |
| `src/components/providers/` | Theme va Language providerlari |
| `src/config/portfolio.ts` | **Barcha tahrirlanadigan ma'lumotlar** (ism, loyihalar, ijtimoiy tarmoq) |
| `src/hooks/` | `useTheme`, `useLanguage`, `useScrollSpy` |
| `src/lib/` | Utils, animatsiyalar, tarjimalar (i18n) |
| `src/app/api/contact/` | Kontakt formasi API |
| `public/images/` | Profil va loyiha rasmlari |

## O'rnatish

```bash
cd "C:\Users\user\Desktop\portfolio jova"
npm install
```

## Ishga tushirish

Development server:

```bash
npm run dev
```

Brauzerda oching: [http://localhost:3000](http://localhost:3000)

Production build:

```bash
npm run build
npm start
```

## Shaxsiy ma'lumotlarni o'zgartirish

**Asosiy fayl:** `src/config/portfolio.ts`

Bu faylda quyidagilarni tahrirlang:

- `personalInfo` — ism, yosh, joylashuv, kasb, email, profil rasmi yo'li
- `socialLinks` — Telegram, Instagram, GitHub, email
- `skillGroups` — ko'nikmalar ro'yxati
- `projects` — loyihalar
- `statistics` — statistika kartochkalari
- `seoConfig` — SEO sarlavha va tavsif

Profil rasmini almashtirish:

1. Rasmni `public/images/profile.jpg` (yoki `.png`) ga qo'ying
2. `portfolio.ts` ichida `profileImage: "/images/profile.jpg"` qiling

## Loyiha qo'shish

`src/config/portfolio.ts` faylida `projects` massiviga yangi obyekt qo'shing:

```typescript
{
  id: "project-3",
  title: "Loyiha nomi",
  description: "Qisqa tavsif",
  technologies: ["Next.js", "Django"],
  github: "https://github.com/...",
  demo: "https://...",
  image: "/images/projects/project-3.jpg",
}
```

Rasmni `public/images/projects/` papkasiga joylashtiring. Cheksiz loyiha qo'shish mumkin.

## Tillarni o'zgartirish

Matnlar: `src/lib/i18n/translations.ts` — `uz`, `en`, `ru` tillari.

## Mavzu (Dark / Light)

Navbar dagi quyosh/oy tugmasi yoki `localStorage` kaliti: `portfolio-theme`.

Default: **qorong'u (dark)**.

## Kontakt formasi

Hozircha xabarlar server logiga yoziladi (`src/app/api/contact/route.ts`).

Production uchun Resend, SendGrid yoki Nodemailer ulang — fayldagi `O'ZGARTIRISH MUMKIN` qismiga qarang.

## Deploy (Vercel)

1. [vercel.com](https://vercel.com) da hisob oching
2. GitHub repoga ulang yoki CLI:

```bash
npm i -g vercel
vercel
```

3. `src/config/portfolio.ts` ichida `seoConfig.siteUrl` ni haqiqiy domen bilan yangilang

### Boshqa platformalar

- **Netlify:** `npm run build`, publish papka `.next` emas — Next.js adapter kerak
- **VPS:** `npm run build` → `npm start` (port 3000)

## Rang tizimi (Theme)

**next-themes** orqali Dark/Light rejim. Tanlov `localStorage` da `portfolio-theme` kalitida saqlanadi.

Barcha ranglar **`src/styles/theme.css`** va Tailwind `dark:` klasslarida.

| Rejim | Fon | Kartochka | Asosiy matn | Ikkinchi matn |
|-------|-----|-----------|--------------|---------------|
| Dark | `#000000` | `#0F172A` | `#FFFFFF` | `#CBD5E1` |
| Light | `#FFFFFF` | `#F8FAFC` | `#000000` | `#334155` |

**Primary:** Deep Blue `#2563EB`, Navy `#152F8E`  
**Accent (kam):** Red `#EF4444`, Pink `#EC4899` — hover, xato, dekor

Komponentlarda `text-foreground`, `text-muted-foreground`, `bg-card`, `text-primary`, `text-gradient-brand` klasslaridan foydalaning. Hardcoded `cyan-*` ishlatmang.

## Texnologiyalar

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui uslubidagi komponentlar
- Lucide React ikonkalari

## Muallif

**Jovohirbek Isoyev** — Full Stack Developer, Toshkent, O'zbekiston
