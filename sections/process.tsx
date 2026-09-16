"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code2,
  Lightbulb,
  Palette,
  Rocket,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Eyebrow, Highlight, SECTION_LEAD, SECTION_TITLE } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

interface ProcessStep {
  num: string;
  badge: string;
  badgeColor: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  Icon: LucideIcon;
  iconTile: string;
}

const STEPS: ProcessStep[] = [
  {
    num: "01",
    badge: "Research",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    title: "Discovery",
    shortDesc: "Map your users, goals and competitive landscape.",
    fullDesc:
      "We dig into your product vision, target audience, core problem and competitors to agree a clear, realistic technical scope.",
    deliverables: ["Product roadmap", "Scope & architecture", "Feature spec"],
    Icon: Lightbulb,
    iconTile: "bg-amber-50 border-amber-200 text-amber-600",
  },
  {
    num: "02",
    badge: "UI / UX",
    badgeColor: "bg-violet-50 text-violet-800 border-violet-200",
    title: "Design",
    shortDesc: "Wireframe, prototype and validate with real users.",
    fullDesc:
      "We craft intuitive user journeys, high-fidelity Figma screens and interactive prototypes designed to convert.",
    deliverables: ["Figma design system", "Interactive prototype", "Design specs"],
    Icon: Palette,
    iconTile: "bg-violet-50 border-violet-200 text-violet-600",
  },
  {
    num: "03",
    badge: "Engineering",
    badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
    title: "Development",
    shortDesc: "Scalable, production-ready code shipped fast.",
    fullDesc:
      "We build clean, scalable full-stack applications with Next.js, React, TypeScript, Tailwind CSS and modern databases.",
    deliverables: ["Production codebase", "API integrations", "Database architecture"],
    Icon: Code2,
    iconTile: "bg-blue-50 border-blue-200 text-blue-600",
  },
  {
    num: "04",
    badge: "QA",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    title: "Testing",
    shortDesc: "Security, performance and cross-device QA.",
    fullDesc:
      "End-to-end testing, responsive checks, Core Web Vitals optimisation and security reviews before anything goes live.",
    deliverables: ["Cross-device QA", "Performance audit", "Security review"],
    Icon: ShieldCheck,
    iconTile: "bg-emerald-50 border-emerald-200 text-emerald-600",
  },
  {
    num: "05",
    badge: "Launch",
    badgeColor: "bg-orange-50 text-orange-800 border-orange-200",
    title: "Deployment",
    shortDesc: "Automated pipelines and a zero-downtime launch.",
    fullDesc:
      "We set up CI/CD, domains and SSL, edge caching and analytics, then launch on reliable cloud infrastructure.",
    deliverables: ["Vercel / cloud setup", "Domain & SSL", "Analytics tracking"],
    Icon: Rocket,
    iconTile: "bg-orange-50 border-orange-200 text-orange-600",
  },
  {
    num: "06",
    badge: "Growth",
    badgeColor: "bg-teal-50 text-teal-800 border-teal-200",
    title: "Growth",
    shortDesc: "Data-driven iterations that compound over time.",
    fullDesc:
      "After launch we study how people use the product, ship improvements and keep everything maintained and secure.",
    deliverables: ["Funnel metrics", "Feature iterations", "Ongoing support"],
    Icon: TrendingUp,
    iconTile: "bg-teal-50 border-teal-200 text-teal-600",
  },
];

/** Node position on the orbit, as a percentage of the stage size (starts at 12 o'clock). */
function orbitPosition(index: number) {
  const angle = (index / STEPS.length) * 2 * Math.PI - Math.PI / 2;
  const radius = 43;
  return {
    left: `${(50 + radius * Math.cos(angle)).toFixed(3)}%`,
    top: `${(50 + radius * Math.sin(angle)).toFixed(3)}%`,
  };
}

function StepDetails({ step }: { step: ProcessStep }) {
  return (
    <>
      <p className="font-sans text-[15px] leading-[1.7] text-[#555]">{step.fullDesc}</p>
      <div className="mt-5 border-t border-[#E8E2D6] pt-5">
        <p className="font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-[#6F6A5E]">
          What you get
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {step.deliverables.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E2E2] bg-white px-3 py-1.5 font-sans text-[13px] font-semibold text-[#333]"
            >
              <Check aria-hidden="true" className="size-3.5 text-primary" strokeWidth={2.75} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function ProcessExplorer() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  const [interacted, setInteracted] = React.useState(false);
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const active = STEPS[activeIndex];

  const select = (index: number) => {
    setActiveIndex((index + STEPS.length) % STEPS.length);
    setInteracted(true);
  };

  return (
    <>
      {/* Tablet & desktop: orbit + detail panel */}
      <div className="hidden items-center gap-10 md:flex md:flex-col lg:flex-row lg:gap-14">
        <div
          className={cn(
            "relative aspect-square w-full max-w-[420px] shrink-0",
            (hovered || interacted) && "orbit-paused"
          )}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
        >
          <div aria-hidden="true" className="absolute inset-[7%] rounded-full border border-dashed border-primary/30" />
          <div aria-hidden="true" className="absolute inset-[21%] rounded-full border border-[#EAE4D8]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-[38%] flex-col items-center justify-center rounded-full border-[1.5px] border-[#222]/15 bg-white text-center shadow-sm">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#B45309]">
                Stage {active.num}
              </span>
              <span className="mt-1 font-heading text-[15px] font-extrabold leading-tight text-[#111]">
                From idea
                <br />
                <span className="text-primary">to launch</span>
              </span>
            </div>
          </div>

          <div className="orbit-spin absolute inset-0">
            {STEPS.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <div key={step.num} className="absolute" style={orbitPosition(index)}>
                  <div className="-translate-x-1/2 -translate-y-1/2">
                    <div className="orbit-counter flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => select(index)}
                        aria-pressed={isActive}
                        aria-controls="process-panel"
                        aria-label={`Step ${step.num}: ${step.title}`}
                        className={cn(
                          "flex size-12 items-center justify-center rounded-full border-[1.5px] transition-all duration-300",
                          isActive
                            ? "scale-110 border-primary bg-primary text-white shadow-[0_6px_18px_rgba(36,87,255,0.4)] ring-4 ring-primary/15"
                            : "border-[#E2E2E2] bg-white text-[#444] hover:border-primary hover:text-primary"
                        )}
                      >
                        <step.Icon aria-hidden="true" className="size-5" />
                      </button>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-2 whitespace-nowrap rounded-full border px-2.5 py-0.5 font-heading text-[12px] font-bold",
                          isActive ? "border-primary bg-primary text-white" : "border-[#E2E2E2] bg-white text-[#555]"
                        )}
                      >
                        {step.title}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          id="process-panel"
          aria-live="polite"
          className="flex min-h-[400px] w-full flex-1 flex-col self-stretch rounded-[24px] border-[1.5px] border-[#E6DFD1] bg-white p-7 shadow-[0_16px_40px_-24px_rgba(17,17,17,0.2)] lg:p-8"
        >
          <div className="flex items-center justify-between gap-3 border-b border-[#E8E2D6] pb-4">
            <div className="flex items-center gap-2.5">
              <span className={cn("rounded-full border px-2.5 py-0.5 font-sans text-[12px] font-semibold", active.badgeColor)}>
                {active.badge}
              </span>
              <span className="font-sans text-[13px] font-medium text-[#6B6B6B]">
                Step {active.num} of {String(STEPS.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => select(activeIndex - 1)}
                aria-label="Previous step"
                className="flex size-9 items-center justify-center rounded-full border border-[#E2E2E2] bg-white text-[#444] transition-colors hover:border-primary hover:text-primary"
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => select(activeIndex + 1)}
                aria-label="Next step"
                className="flex size-9 items-center justify-center rounded-full border border-[#E2E2E2] bg-white text-[#444] transition-colors hover:border-primary hover:text-primary"
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.num}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="pt-5"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl border", active.iconTile)}
                >
                  <active.Icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-heading text-[22px] font-bold leading-tight text-[#111]">{active.title}</h3>
                  <p className="font-sans text-[14px] font-medium text-primary">{active.shortDesc}</p>
                </div>
              </div>
              <div className="mt-4">
                <StepDetails step={active} />
              </div>
            </motion.div>
          </AnimatePresence>

          <div aria-hidden="true" className="mt-auto flex gap-1.5 pt-6">
            {STEPS.map((step, index) => (
              <span
                key={step.num}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors duration-300",
                  index <= activeIndex ? "bg-primary" : "bg-[#EAE4D8]"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: accordion */}
      <ol className="flex flex-col gap-3 md:hidden">
        {STEPS.map((step, index) => {
          const isOpen = index === openIndex;
          return (
            <li
              key={step.num}
              className={cn(
                "overflow-hidden rounded-[20px] border-[1.5px] bg-white transition-colors",
                isOpen ? "border-primary shadow-sm" : "border-[#E6DFD1]"
              )}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`process-step-${step.num}`}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <span
                  aria-hidden="true"
                  className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl border", step.iconTile)}
                >
                  <step.Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-[17px] font-bold text-[#111]">
                    {step.num}. {step.title}
                  </span>
                  <span className="block font-sans text-[14px] leading-snug text-[#666]">{step.shortDesc}</span>
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn("size-5 shrink-0 text-[#666] transition-transform", isOpen && "rotate-180")}
                />
              </button>
              {isOpen && (
                <div id={`process-step-${step.num}`} className="border-t border-[#F1ECE2] px-4 pb-5 pt-4">
                  <StepDetails step={step} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </>
  );
}

export function Process() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="process"
        aria-labelledby="process-heading"
        className="relative w-full overflow-hidden bg-background py-20 sm:py-24"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.12]">
          <Image src="/images/hero/GWH_Background Texture.png" alt="" fill sizes="100vw" className="object-cover" />
        </div>

        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end lg:gap-14"
          >
            <div>
              <Eyebrow>Our process</Eyebrow>
              <h2 id="process-heading" className={cn(SECTION_TITLE, "mt-5")}>
                From idea to <Highlight>launch.</Highlight>
              </h2>
            </div>
            <p className={cn(SECTION_LEAD, "lg:pb-2")}>
              A founder-friendly engineering process: transparent, fast, and built for startups that need to move.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 lg:mt-14"
          >
            <ProcessExplorer />
          </motion.div>
        </Container>
      </section>
    </MotionConfig>
  );
}
