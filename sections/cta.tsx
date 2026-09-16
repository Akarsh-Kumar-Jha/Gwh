"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { AlertCircle, ArrowRight, Check, CheckCircle2, ChevronDown, Loader2, Mail } from "lucide-react";
import { ContactCard } from "@/components/ui/contact-card";
import { Container } from "@/components/layout/container";
import { Eyebrow, Highlight } from "@/components/ui/section-heading";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";
import { SERVICES, SERVICE_SELECT_EVENT, type ServiceValue } from "@/lib/services";
import { SITE } from "@/lib/site";
import { SocialLinks } from "@/components/ui/social-links";
import { cn } from "@/lib/utils";

type FormValues = Omit<ContactFormData, "service"> & { service: ServiceValue | "" };
type FieldName = keyof FormValues;
type Status = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM: FormValues = { name: "", email: "", phone: "", service: "", message: "" };

const HIGHLIGHTS = [
  "Free 30-minute strategy call",
  "Clear scope, timeline and quote",
  "Talk directly to the people building it",
];

const LABEL = "font-sans text-[13px] font-semibold text-[#111]";
const FIELD =
  "w-full rounded-xl border border-[#222]/20 bg-white px-4 font-sans text-[15px] text-[#111] placeholder:text-[#8A8A8A] outline-none transition-[border-color,box-shadow] focus:border-primary focus:ring-4 focus:ring-primary/10 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500/10";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-center gap-1.5 font-sans text-[13px] font-medium text-red-600">
      <AlertCircle aria-hidden="true" className="size-3.5 shrink-0" />
      {message}
    </p>
  );
}

function mailtoHref(form: FormValues) {
  const service = SERVICES.find((s) => s.value === form.service)?.label ?? "Not sure yet";
  const lines = [`Name: ${form.name}`, `Email: ${form.email}`];
  if (form.phone) lines.push(`Phone: ${form.phone}`);
  lines.push(`Service: ${service}`);
  if (form.message) lines.push("", form.message);
  return `mailto:${SITE.email}?subject=${encodeURIComponent("Project enquiry")}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export function CTA() {
  const [form, setForm] = React.useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = React.useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = React.useState<Status>("idle");
  const [nickname, setNickname] = React.useState("");
  const formRef = React.useRef<HTMLFormElement>(null);
  const successRef = React.useRef<HTMLHeadingElement>(null);

  // Services cards pre-select the matching option before scrolling here.
  React.useEffect(() => {
    const onSelect = (event: Event) => {
      const value = (event as CustomEvent<ServiceValue>).detail;
      setForm((current) => ({ ...current, service: value }));
      setErrors((current) => ({ ...current, service: undefined }));
      setStatus((current) => (current === "success" ? "idle" : current));
    };
    window.addEventListener(SERVICE_SELECT_EVENT, onSelect);
    return () => window.removeEventListener(SERVICE_SELECT_EVENT, onSelect);
  }, []);

  React.useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const update = (field: FieldName, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = contactFormSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<FieldName, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as FieldName;
        fieldErrors[field] ??= issue.message;
      }
      setErrors(fieldErrors);
      const firstInvalid = (Object.keys(EMPTY_FORM) as FieldName[]).find((field) => fieldErrors[field]);
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, nickname }),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const fieldProps = (field: FieldName) => ({
    id: `cta-${field}`,
    name: field,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `cta-${field}-error` : undefined,
  });

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="relative w-full overflow-hidden bg-background py-20 sm:py-24"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.12]">
          <Image src="/images/hero/GWH_Background Texture.png" alt="" fill sizes="100vw" className="object-cover" />
        </div>

        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <ContactCard
              className="bg-white/40"
              title={
                <div className="flex flex-col items-start gap-5">
                  <Eyebrow>Ready to build?</Eyebrow>
                  <h2
                    id="contact-heading"
                    className="font-heading text-[clamp(32px,4vw,48px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#111]"
                  >
                    Have a project in mind? <Highlight>Let&apos;s build it.</Highlight>
                  </h2>
                </div>
              }
              description={
                <div className="space-y-6">
                  <p className="font-sans text-[16px] leading-[1.7] text-[#555]">
                    Tell us a little about your idea and we&apos;ll get back to you within one business day.
                  </p>
                  <ul className="space-y-3">
                    {HIGHLIGHTS.map((item) => (
                      <li key={item} className="flex items-center gap-3 font-sans text-[15px] font-semibold text-[#111]">
                        <span
                          aria-hidden="true"
                          className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
                        >
                          <Check className="size-3.5" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-2xl border border-[#222]/10 bg-white/70 p-4">
                    <p className="font-sans text-[13px] text-[#6B6B6B]">Prefer email?</p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="mt-1 inline-flex items-center gap-2 break-all font-sans text-[15px] font-semibold text-[#111] transition-colors hover:text-primary"
                    >
                      <Mail aria-hidden="true" className="size-4 shrink-0 text-primary" />
                      {SITE.email}
                    </a>
                    <p className="mt-4 border-t border-[#222]/10 pt-4 font-sans text-[13px] text-[#6B6B6B]">
                      See what we&apos;re building
                    </p>
                    <SocialLinks className="mt-2" />
                  </div>
                </div>
              }
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col items-center gap-4 rounded-2xl border border-[#222]/10 bg-[#FAF8F5] px-6 py-12 text-center"
                  >
                    <span className="flex size-14 items-center justify-center rounded-full border border-primary bg-[#EEF2FF] text-primary">
                      <CheckCircle2 aria-hidden="true" className="size-7" />
                    </span>
                    <h3
                      ref={successRef}
                      tabIndex={-1}
                      className="font-heading text-[24px] font-extrabold tracking-tight text-[#111] outline-none"
                    >
                      Thanks, {form.name.split(" ")[0]}! Your enquiry is in.
                    </h3>
                    <p className="max-w-[380px] font-sans text-[15px] leading-relaxed text-[#555]">
                      We&apos;ll reply to <span className="font-semibold text-[#111]">{form.email}</span> within one
                      business day.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setForm(EMPTY_FORM);
                        setStatus("idle");
                      }}
                      className="mt-2 inline-flex h-11 items-center rounded-xl border-[1.5px] border-[#222] bg-white px-5 font-heading text-[14px] font-bold text-[#111] transition-colors hover:bg-[#F5F2EB]"
                    >
                      Send another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="cta-name" className={LABEL}>
                          Name <span className="text-primary">*</span>
                        </label>
                        <input
                          {...fieldProps("name")}
                          type="text"
                          autoComplete="name"
                          required
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          className={cn(FIELD, "h-12")}
                        />
                        <FieldError id="cta-name-error" message={errors.name} />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="cta-email" className={LABEL}>
                          Email <span className="text-primary">*</span>
                        </label>
                        <input
                          {...fieldProps("email")}
                          type="email"
                          autoComplete="email"
                          inputMode="email"
                          required
                          placeholder="you@company.com"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          className={cn(FIELD, "h-12")}
                        />
                        <FieldError id="cta-email-error" message={errors.email} />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="cta-phone" className={LABEL}>
                          Phone <span className="font-normal text-[#6B6B6B]">(optional)</span>
                        </label>
                        <input
                          {...fieldProps("phone")}
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          className={cn(FIELD, "h-12")}
                        />
                        <FieldError id="cta-phone-error" message={errors.phone} />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="cta-service" className={LABEL}>
                          What do you need? <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                          <select
                            {...fieldProps("service")}
                            required
                            value={form.service}
                            onChange={(e) => update("service", e.target.value)}
                            className={cn(
                              FIELD,
                              "h-12 cursor-pointer appearance-none pr-11",
                              form.service === "" && "text-[#8A8A8A]"
                            )}
                          >
                            <option value="" disabled>
                              Choose a service
                            </option>
                            {SERVICES.map((service) => (
                              <option key={service.value} value={service.value} className="text-[#111]">
                                {service.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            aria-hidden="true"
                            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#111]"
                          />
                        </div>
                        <FieldError id="cta-service-error" message={errors.service} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="cta-message" className={LABEL}>
                        Tell us about your project <span className="font-normal text-[#6B6B6B]">(optional)</span>
                      </label>
                      <textarea
                        {...fieldProps("message")}
                        rows={4}
                        maxLength={1000}
                        placeholder="What are you building, who is it for, and when do you need it?"
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        className={cn(FIELD, "resize-y py-3")}
                      />
                      <FieldError id="cta-message-error" message={errors.message} />
                    </div>

                    {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
                    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                      <label htmlFor="cta-nickname">Leave this field empty</label>
                      <input
                        id="cta-nickname"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                      />
                    </div>

                    {status === "error" && (
                      <div
                        role="alert"
                        className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 font-sans text-[14px] leading-[1.6] text-red-800"
                      >
                        <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                        <p>
                          We couldn&apos;t send your enquiry. Please try again, or{" "}
                          <a href={mailtoHref(form)} className="font-semibold underline underline-offset-2">
                            email it to us directly
                          </a>
                          .
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex h-[54px] w-full items-center justify-center gap-2.5 rounded-xl border-[1.5px] border-[#222] bg-[#FFD43B] font-heading text-[16px] font-bold text-[#111] shadow-[3px_3px_0_#111] transition-all hover:-translate-y-0.5 hover:bg-[#F7CB2D] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send enquiry
                          <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2.5} />
                        </>
                      )}
                    </button>
                    <p className="text-center font-sans text-[13px] text-[#6B6B6B]">
                      No spam, no obligation. We only use your details to reply.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </ContactCard>
          </motion.div>
        </Container>
      </section>
    </MotionConfig>
  );
}
