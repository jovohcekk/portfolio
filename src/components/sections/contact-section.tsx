"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Send,
  Instagram,
  MessageCircle,
  Copy,
  Check,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/use-language";
import { socialLinkItems } from "@/config/portfolio";
import { copyToClipboard } from "@/lib/utils";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";

const contactIcons: Record<string, LucideIcon> = {
  telegram: MessageCircle,
  instagram: Instagram,
  github: Github,
  email: Mail,
};

export function ContactSection() {
  const { translate } = useLanguage();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "", website: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFormState({ name: "", email: "", message: "", website: "" });
    } catch {
      setStatus("error");
    }
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    statusTimerRef.current = setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section id="contact" className="section-surface section-surface-tint relative w-full max-w-full overflow-hidden section-spacing">
      <div className="pointer-events-none absolute inset-0 bg-hero-mesh opacity-30" />
      <div className="section-container relative">
        <SectionHeading
          title={translate("contact.title")}
          subtitle={translate("contact.subtitle")}
        />

        <div className="grid w-full min-w-0 grid-cols-1 gap-8 xs:gap-12 lg:grid-cols-2">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full min-w-0 space-y-3 xs:space-y-4"
          >
            {socialLinkItems.map((item) => {
              const Icon = contactIcons[item.id] ?? Mail;
              return (
                <motion.div
                  key={item.id}
                  variants={scaleIn}
                  whileHover={{ x: 4 }}
                  className="glass-card flex min-w-0 items-center justify-between gap-2 rounded-xl p-3 xs:gap-4 xs:p-4 hover-accent-highlight"
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-w-0 flex-1 items-center gap-3 transition-colors duration-300 hover:text-accent xs:gap-4"
                  >
                    <div className="icon-box flex h-10 w-10 shrink-0 items-center justify-center rounded-lg xs:h-12 xs:w-12">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-secondary-content">{item.label}</p>
                      <p className="break-anywhere font-medium text-primary-content text-sm xs:text-base">
                        {item.value}
                      </p>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(item.id, item.copyValue)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg surface-chip text-primary-content hover-accent-highlight"
                    aria-label={`${translate("contact.copy")} ${item.label}`}
                  >
                    {copiedId === item.id ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.form
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-card-premium w-full min-w-0 rounded-2xl p-4 xs:p-6 md:p-8"
            noValidate
          >
            <div className="space-y-4">
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formState.website}
                  onChange={(e) => setFormState((s) => ({ ...s, website: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="name">{translate("contact.form.name")}</Label>
                <Input
                  id="name"
                  required
                  maxLength={120}
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
                  maxLength={254}
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
                  maxLength={5000}
                  value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                  className="mt-2"
                />
              </div>
            </div>

            <div aria-live="polite" aria-atomic="true" className="min-h-[1.25rem]">
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-sm text-success"
                >
                  {translate("contact.form.success")}
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-sm text-error"
                >
                  {translate("contact.form.error")}
                </motion.p>
              )}
            </div>

            <MagneticButton className="mt-6 w-full">
              <Button type="submit" className="w-full" disabled={status === "loading"}>
                <Send className="h-4 w-4" />
                {status === "loading"
                  ? translate("contact.form.sending")
                  : translate("contact.form.send")}
              </Button>
            </MagneticButton>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
