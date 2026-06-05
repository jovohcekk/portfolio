"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Send,
  Instagram,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/use-language";
import { socialLinks } from "@/config/portfolio";
import { copyToClipboard } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";

const contactItems = [
  {
    icon: MessageCircle,
    label: "Telegram",
    value: socialLinks.telegramHandle,
    href: socialLinks.telegram,
    copyValue: socialLinks.telegramHandle,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: socialLinks.instagramHandle,
    href: socialLinks.instagram,
    copyValue: socialLinks.instagramHandle,
  },
  {
    icon: Github,
    label: "GitHub",
    value: socialLinks.githubHandle,
    href: socialLinks.github,
    copyValue: socialLinks.github,
  },
  {
    icon: Mail,
    label: "Email",
    value: socialLinks.email,
    href: `mailto:${socialLinks.email}`,
    copyValue: socialLinks.email,
  },
];

export function ContactSection() {
  const { translate } = useLanguage();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleCopy = async (id: string, text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section id="contact" className="section-surface relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-hero-mesh opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title={translate("contact.title")}
          subtitle={translate("contact.subtitle")}
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {contactItems.map((item) => {
              const Icon = item.icon;
              const id = item.label;
              return (
                <div
                  key={id}
                  className="glass-card flex items-center justify-between gap-4 rounded-xl p-4 hover-accent-highlight"
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center gap-4 transition hover:text-[#2563EB]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#2563EB]/15 text-[#2563EB]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-secondary-content">{item.label}</p>
                      <p className="font-medium text-primary-content">{item.value}</p>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(id, item.copyValue)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg surface-chip text-primary-content hover-accent-highlight"
                    aria-label={translate("contact.copy")}
                  >
                    {copiedId === id ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              );
            })}
          </motion.div>

          <motion.form
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-6 md:p-8"
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">{translate("contact.form.name")}</Label>
                <Input
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="email">{translate("contact.form.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="message">{translate("contact.form.message")}</Label>
                <Textarea
                  id="message"
                  required
                  value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                  className="mt-2"
                />
              </div>
            </div>

            {status === "success" && (
              <p className="mt-4 text-sm text-success">{translate("contact.form.success")}</p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm text-error">{translate("contact.form.error")}</p>
            )}

            <Button type="submit" className="mt-6 w-full" disabled={status === "loading"}>
              <Send className="h-4 w-4" />
              {status === "loading"
                ? translate("contact.form.sending")
                : translate("contact.form.send")}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
