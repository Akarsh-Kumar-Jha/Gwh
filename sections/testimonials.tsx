"use client";

import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import { AnimatedTestimonials, type Testimonial } from "@/components/ui/animated-testimonials";
import { Container } from "@/components/layout/container";
import { Eyebrow, Highlight, SECTION_LEAD, SECTION_TITLE } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const TESTIMONIALS: Testimonial[] = [
  {
    id: "swapno",
    company: "Swapno Motors",
    category: "Swapno Motors · Electric mobility",
    rating: 5,
    quote:
      "Grow With Hustler transformed our vision into a full-fledged platform. Their communication, speed and attention to detail were exceptional. Highly recommended!",
    name: "Rohit Kumar",
    role: "Co-Founder, Swapno Motors",
    avatarBg: "bg-[#28354A]",
    initials: "RK",
  },
  {
    id: "satvik",
    company: "SatvikAI",
    category: "SatvikAI · AI nutrition",
    rating: 5,
    quote:
      "The team understood our product goals deeply and built an AI-powered platform beyond our expectations. The quality of work and consistency throughout was outstanding.",
    name: "Aman Verma",
    role: "Founder, SatvikAI",
    avatarBg: "bg-[#1E3A2B]",
    initials: "AV",
  },
  {
    id: "intento",
    company: "Intento",
    category: "Intento · AI productivity",
    rating: 5,
    quote:
      "Grow With Hustler helped us build a beautiful, AI-driven product with a super smooth experience. They're not just developers, they're problem solvers.",
    name: "Arjun Mehta",
    role: "Founder, Intento",
    avatarBg: "bg-[#231F4D]",
    initials: "AM",
  },
];

export function Testimonials() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="testimonials"
        aria-labelledby="testimonials-heading"
        className="relative w-full overflow-hidden bg-background py-20 sm:py-28"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-90 lg:hidden">
          <Image
            src="/images/testimonials/testimonials-bg-mobile.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden opacity-90 lg:block">
          <Image
            src="/images/testimonials/testimonials-bg.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        {/* Fades the illustration behind the heading so the copy stays easy to read */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-b from-background via-background/80 to-background/40 lg:w-3/5 lg:bg-gradient-to-r lg:from-background lg:via-background/90 lg:to-transparent"
        />

        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatedTestimonials
              testimonials={TESTIMONIALS}
              header={
                <>
                  <Eyebrow>Client love</Eyebrow>
                  <h2 id="testimonials-heading" className={cn(SECTION_TITLE, "mt-5")}>
                    Loved by founders. <Highlight>Built on trust.</Highlight>
                  </h2>
                  <p className={cn(SECTION_LEAD, "mt-5 max-w-[440px]")}>
                    We don&apos;t just deliver software. We become product partners, helping founders launch, improve
                    and scale with confidence.
                  </p>
                </>
              }
            />
          </motion.div>
        </Container>
      </section>
    </MotionConfig>
  );
}
