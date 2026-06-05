// =====================================
// YORDAMCHI FUNKSIYALAR (utils)
// Tailwind klasslarini birlashtirish va umumiy yordamchilar.
// =====================================

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS klasslarini xavfsiz birlashtiradi.
 * Nima uchun kerak: shartli klasslar va konfliktlarni oldini oladi.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Matnni clipboardga nusxalaydi.
 * O'zgartirish mumkin: muvaffaqiyat/xato xabarlari komponentda
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Smooth scroll — bo'limga silliq o'tish
 */
export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
