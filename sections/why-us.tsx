"use client";

import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import { Code2, Mail, MessagesSquare, Rocket, Sparkles, Users, Zap, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Eyebrow, Highlight, SECTION_LEAD, SECTION_TITLE } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay, ease: EASE },
});

const REASONS: { badge: string; title: string; desc: string; Icon: LucideIcon }[] = [
  {
    badge: "2–4 week MVPs",
    title: "Fast execution",
    desc: "Short weekly sprints get a working product in front of users in weeks, not months.",
    Icon: Zap,
  },
  {
    badge: "AI native",
    title: "AI-first approach",
    desc: "We use AI to move faster and build AI features where they genuinely help your users.",
    Icon: Sparkles,
  },
  {
    badge: "Production ready",
    title: "Clean, scalable code",
    desc: "Maintainable, production-ready codebases your future team can pick up and extend.",
    Icon: Code2,
  },
  {
    badge: "Weekly demos",
    title: "Founder friendly",
    desc: "Transparent async updates, a live demo every week and no surprises on scope or cost.",
    Icon: Users,
  },
];

const STATS: { Icon: LucideIcon; value: string; label: string }[] = [
  { Icon: Rocket, value: "6+", label: "Products shipped" },
  { Icon: Zap, value: "2–4 weeks", label: "Typical MVP timeline" },
  { Icon: Mail, value: "1 day", label: "Reply to every enquiry" },
  { Icon: MessagesSquare, value: "Direct", label: "Access to the builders" },
];

export function WhyUs() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="why-us-heading"
        className="relative w-full overflow-hidden bg-background py-20 sm:py-24"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.14]">
          <Image src="/images/hero/GWH_Background Texture.png" alt="" fill sizes="100vw" className="object-cover" />
        </div>

        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            <div>
              <motion.div {...reveal()}>
                <Eyebrow>Why startups choose us</Eyebrow>
                <h2 id="why-us-heading" className={cn(SECTION_TITLE, "mt-5")}>
                  Why founders choose <Highlight>Grow With Hustler</Highlight>
                </h2>
                <p className={cn(SECTION_LEAD, "mt-5 max-w-[520px]")}>
                  We partner with founders to <strong className="font-semibold text-primary">build</strong>,{" "}
                  <strong className="font-semibold text-primary">ship</strong> and{" "}
                  <strong className="font-semibold text-primary">scale</strong> digital products that users love.
                </p>
              </motion.div>

              <ul className="mt-9 grid gap-4 sm:grid-cols-2">
                {REASONS.map(({ badge, title, desc, Icon }, i) => (
                  <motion.li
                    key={title}
                    {...reveal(0.06 * i)}
                    className="rounded-[20px] border-[1.5px] border-[#222] bg-white/60 p-5 shadow-[3px_3px_0_rgba(17,17,17,0.06)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        aria-hidden="true"
                        className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-[#EEF2FF] text-primary"
                      >
                        <Icon className="size-5" />
                      </span>
                      <span className="rounded-full border border-primary/30 bg-[#EEF2FF] px-2.5 py-1 font-sans text-[12px] font-semibold text-primary">
                        {badge}
                      </span>
                    </div>
                    <h3 className="mt-4 font-heading text-[18px] font-bold tracking-[-0.01em] text-[#111]">{title}</h3>
                    <p className="mt-1.5 font-sans text-[14.5px] leading-[1.6] text-[#555]">{desc}</p>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div {...reveal(0.1)} className="mx-auto w-full max-w-[600px]">
              <Image
                src="/images/why-us/why_us_dashboard_transparent.png"
                alt="Illustration of a product dashboard with deployments, analytics and performance scores"
                width={1024}
                height={1024}
                quality={90}
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 90vw"
                className="h-auto w-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.08)]"
              />
            </motion.div>
          </div>

          <motion.ul
            {...reveal()}
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border-[1.5px] border-[#222] bg-[#222]/10 lg:mt-16 lg:grid-cols-4"
          >
            {STATS.map(({ Icon, value, label }) => (
              <li key={label} className="flex items-center gap-3.5 bg-[#FBF8F0] px-5 py-5 sm:px-6">
                <span
                  aria-hidden="true"
                  className="hidden size-10 shrink-0 items-center justify-center rounded-full border border-[#222]/15 bg-white text-primary sm:flex"
                >
                  <Icon className="size-[18px]" />
                </span>
                <div>
                  <p className="font-heading text-[20px] font-extrabold leading-none tracking-[-0.02em] text-[#111] sm:text-[22px]">
                    {value}
                  </p>
                  <p className="mt-1.5 font-sans text-[13px] leading-snug text-[#6B6B6B]">{label}</p>
                </div>
              </li>
            ))}
          </motion.ul>
        </Container>
      </section>
    </MotionConfig>
  );
}
