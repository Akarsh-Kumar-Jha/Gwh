"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import {
  ArrowRight,
  Check,
  Globe,
  Layers,
  Lightbulb,
  Smartphone,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Eyebrow, Highlight, SECTION_LEAD, SECTION_TITLE } from "@/components/ui/section-heading";
import { TechIcon } from "@/components/ui/tech-icon";
import { SERVICES, selectService, type ServiceValue } from "@/lib/services";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay, ease: EASE },
});

const ICONS: Record<ServiceValue, { Icon: LucideIcon; tile: string }> = {
  website: { Icon: Globe, tile: "bg-blue-50 text-blue-600 border-blue-200" },
  app: { Icon: Smartphone, tile: "bg-violet-50 text-violet-600 border-violet-200" },
  saas: { Icon: Layers, tile: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  ai: { Icon: Sparkles, tile: "bg-amber-50 text-amber-600 border-amber-200" },
  automation: { Icon: Workflow, tile: "bg-teal-50 text-teal-600 border-teal-200" },
  other: { Icon: Lightbulb, tile: "bg-[#FFD43B] text-[#111] border-[#FFD43B]" },
};

const STACK = [
  "Next.js",
  "React",
  "React Native",
  "TypeScript",
  "Node.js",
  "Supabase",
  "MongoDB",
  "Firebase",
  "Tailwind",
  "Gemini AI",
];

export function Services() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="services"
        aria-labelledby="services-heading"
        className="relative w-full overflow-hidden bg-background py-20 sm:py-24"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.12]">
          <Image src="/images/hero/GWH_Background Texture.png" alt="" fill sizes="100vw" className="object-cover" />
        </div>

        <Container className="relative">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end lg:gap-14">
            <motion.div {...reveal()}>
              <Eyebrow>What we build</Eyebrow>
              <h2 id="services-heading" className={cn(SECTION_TITLE, "mt-5")}>
                Everything you need to <Highlight>launch and grow.</Highlight>
              </h2>
            </motion.div>
            <motion.p {...reveal(0.08)} className={cn(SECTION_LEAD, "lg:pb-2")}>
              One team for design, engineering and launch. Pick what you need, or tell us the problem and we&apos;ll
              recommend the right build.
            </motion.p>
          </div>

          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
            {SERVICES.map((service, i) => {
              const { Icon, tile } = ICONS[service.value];
              const dark = service.value === "other";
              return (
                <motion.li
                  key={service.value}
                  {...reveal(0.06 * (i % 3))}
                  className={cn(
                    "group relative flex flex-col rounded-[24px] border-[1.5px] p-6 transition-all duration-300 sm:p-7",
                    "focus-within:-translate-y-1 hover:-translate-y-1",
                    dark
                      ? "border-[#222] bg-[#111] text-white shadow-[4px_4px_0_#FFD43B]"
                      : "border-[#E6DFD1] bg-white shadow-[0_1px_2px_rgba(17,17,17,0.04),0_16px_40px_-24px_rgba(17,17,17,0.2)] hover:border-[#222]"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn("flex size-12 items-center justify-center rounded-[14px] border", tile)}
                  >
                    <Icon className="size-6" strokeWidth={2} />
                  </span>

                  <h3
                    className={cn(
                      "mt-5 font-heading text-[21px] font-bold leading-tight tracking-[-0.015em]",
                      dark ? "text-white" : "text-[#111]"
                    )}
                  >
                    {service.title}
                  </h3>
                  <p className={cn("mt-2.5 font-sans text-[15px] leading-[1.65]", dark ? "text-white/70" : "text-[#555]")}>
                    {service.summary}
                  </p>

                  <ul className="mt-5 flex flex-col gap-2.5">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className={cn(
                          "flex items-center gap-2.5 font-sans text-[14px] font-medium",
                          dark ? "text-white/90" : "text-[#333]"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            "flex size-5 shrink-0 items-center justify-center rounded-full",
                            dark ? "bg-[#FFD43B] text-[#111]" : "bg-[#FFF3C4] text-[#B45309]"
                          )}
                        >
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <Link
                      href="/#contact"
                      onClick={() => selectService(service.value)}
                      className={cn(
                        "inline-flex items-center gap-2 border-t pt-5 font-heading text-[15px] font-bold transition-colors",
                        "w-full after:absolute after:inset-0 after:rounded-[24px] after:content-['']",
                        dark
                          ? "border-white/15 text-[#FFD43B]"
                          : "border-[#EFE9DD] text-[#111] group-hover:text-primary"
                      )}
                    >
                      {service.cta}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </motion.li>
              );
            })}
          </ul>

          <motion.div
            {...reveal()}
            className="mt-12 flex flex-col gap-4 border-t border-[#222]/10 pt-8 lg:mt-14 lg:flex-row lg:items-center lg:gap-10"
          >
            <p className="shrink-0 font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-[#6F6A5E]">
              Built with a modern stack
            </p>
            <ul className="flex flex-wrap gap-2.5">
              {STACK.map((tech) => (
                <li
                  key={tech}
                  className="inline-flex items-center gap-2 rounded-full border border-[#E6DFD1] bg-white px-3.5 py-2 font-sans text-[13.5px] font-semibold text-[#333]"
                >
                  <span aria-hidden="true" className="inline-flex">
                    <TechIcon name={tech} />
                  </span>
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>
        </Container>
      </section>
    </MotionConfig>
  );
}
