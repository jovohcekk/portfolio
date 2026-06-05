"use client";

import { Github, Instagram, Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { personalInfo, socialLinks } from "@/config/portfolio";

const links = [
  { href: socialLinks.telegram, icon: MessageCircle, label: "Telegram" },
  { href: socialLinks.instagram, icon: Instagram, label: "Instagram" },
  { href: socialLinks.github, icon: Github, label: "GitHub" },
  { href: `mailto:${socialLinks.email}`, icon: Mail, label: "Email" },
];

export function Footer() {
  const { translate } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="surface-footer w-full max-w-full overflow-hidden py-10 xs:py-12 transition-colors duration-300">
      <div className="section-container">
        <div className="flex w-full min-w-0 flex-col items-center justify-between gap-6 md:flex-row">
          <div className="min-w-0 text-center md:text-left">
            <p className="font-semibold text-primary-content">{personalInfo.name}</p>
            <p className="text-sm text-secondary-content">{personalInfo.role}</p>
          </div>

          <div className="flex gap-4">
            {links.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg surface-chip text-secondary-content hover-accent-highlight hover:text-[#2563EB]"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex w-full min-w-0 flex-col items-center justify-between gap-2 border-t border-[var(--border-subtle)] pt-8 text-center text-sm text-secondary-content md:flex-row md:text-left">
          <p className="break-words text-primary-content">
            © {year} {personalInfo.name}. {translate("footer.rights")}
          </p>
          <p className="break-words">{translate("footer.made")}</p>
        </div>
      </div>
    </footer>
  );
}
