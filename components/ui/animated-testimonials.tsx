"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  category?: string;
  rating?: number;
  initials?: string;
  avatarBg?: string;
}

export interface AnimatedTestimonialsProps {
  header: React.ReactNode;
  testimonials: Testimonial[];
  autoRotateInterval?: number;
  className?: string;
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const rating = testimonial.rating ?? 5;
  return (
    <figure className="flex w-full flex-col rounded-[24px] border-[1.5px] border-[#222]/15 bg-white p-6 shadow-[0_14px_40px_rgba(17,17,17,0.06)] sm:p-9">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1" aria-label={`Rated ${rating} out of 5`} role="img">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} aria-hidden="true" className="size-5 fill-[#FFD43B] text-[#FFD43B]" />
          ))}
        </div>
        <span
          aria-hidden="true"
          className="flex size-10 items-center justify-center rounded-full border border-primary/20 bg-[#EEF2FF] text-primary"
        >
          <Quote className="size-4 fill-primary" />
        </span>
      </div>

      <blockquote className="mb-7 mt-5 font-sans text-[17px] leading-[1.65] text-[#1a1a1a] sm:text-[19px]">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-[#222]/10 pt-6">
        <div className="flex items-center gap-3.5">
          <span
            aria-hidden="true"
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-white font-heading text-[15px] font-bold text-white shadow-xs",
              testimonial.avatarBg ?? "bg-[#1E293B]"
            )}
          >
            {testimonial.initials ?? testimonial.name.slice(0, 2).toUpperCase()}
          </span>
          <div>
            <p className="font-heading text-[17px] font-extrabold leading-tight text-[#111]">{testimonial.name}</p>
            <p className="mt-0.5 font-sans text-[14px] text-[#666]">{testimonial.role}</p>
          </div>
        </div>
        {testimonial.category && (
          <span className="rounded-full border border-[#222]/10 bg-[#FAF8F5] px-3.5 py-1.5 font-sans text-[13px] font-semibold text-[#444]">
            {testimonial.category}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

export function AnimatedTestimonials({
  header,
  testimonials,
  autoRotateInterval = 6500,
  className,
}: AnimatedTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const [paused, setPaused] = React.useState(false);
  const reduceMotion = useReducedMotion();

  const goTo = React.useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrentIndex((index + testimonials.length) % testimonials.length);
    },
    [testimonials.length]
  );

  React.useEffect(() => {
    if (paused || reduceMotion || testimonials.length <= 1) return;
    const interval = setInterval(() => goTo(currentIndex + 1, 1), autoRotateInterval);
    return () => clearInterval(interval);
  }, [paused, reduceMotion, testimonials.length, autoRotateInterval, currentIndex, goTo]);

  const current = testimonials[currentIndex];

  return (
    <div className={cn("grid items-center gap-10 lg:grid-cols-12 lg:gap-14", className)}>
      <div className="lg:col-span-5">
        {header}

        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(currentIndex - 1, -1)}
              aria-label="Previous testimonial"
              className="flex size-10 items-center justify-center rounded-full border-[1.5px] border-[#222] bg-white text-[#111] transition-colors hover:bg-[#F5F2EB]"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(currentIndex + 1, 1)}
              aria-label="Next testimonial"
              className="flex size-10 items-center justify-center rounded-full border-[1.5px] border-[#222] bg-white text-[#111] transition-colors hover:bg-[#F5F2EB]"
            >
              <ChevronRight aria-hidden="true" className="size-4" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            {testimonials.map((t, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => goTo(idx, idx > currentIndex ? 1 : -1)}
                  aria-label={`Show testimonial from ${t.name}`}
                  aria-current={isActive ? "true" : undefined}
                  className="flex h-6 items-center rounded-full px-1"
                >
                  <span
                    className={cn(
                      "block h-2.5 rounded-full transition-all duration-300",
                      isActive ? "w-8 bg-primary" : "w-2.5 bg-[#222]/20 hover:bg-[#222]/40"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="relative lg:col-span-7"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div aria-live={paused ? "polite" : "off"} className="grid">
          {/* Invisible copies of every card share the grid cell, so the box is always as tall as
              the longest quote and nothing below jumps when the carousel rotates. */}
          {testimonials.map((t) => (
            <div key={t.id} aria-hidden="true" className="invisible [grid-area:1/1]">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 30 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, x: direction * -30, transition: { duration: 0.25 } }}
              className="flex [grid-area:1/1]"
            >
              <TestimonialCard testimonial={current} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
