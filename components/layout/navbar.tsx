"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Container } from "@/components/layout/container";
import { NAV_ITEMS } from "@/lib/site";
import { SocialLinks } from "@/components/ui/social-links";
import { cn } from "@/lib/utils";

/** Tracks which home page section is in the middle of the viewport. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!enabled) return;

    const ids = NAV_ITEMS.flatMap((item) => ("section" in item ? [item.section] : []));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A thin band across the middle of the screen decides the active section.
      { rootMargin: "-45% 0px -54% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    const clearAtTop = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", clearAtTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", clearAtTop);
    };
  }, [enabled]);

  return enabled ? active : null;
}

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const activeSection = useActiveSection(pathname === "/");

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const isActive = (item: (typeof NAV_ITEMS)[number]) =>
    "section" in item ? activeSection === item.section : pathname.startsWith(item.href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        isScrolled || isOpen
          ? "border-b border-[#222]/10 bg-background/90 shadow-[0_1px_12px_rgba(17,17,17,0.04)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-[72px] items-center justify-between gap-6 lg:h-[88px]">
        <Link
          href="/"
          aria-label="Grow With Hustler home"
          className="shrink-0 rounded-lg"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/images/hero/GWH_LOGOU.png"
            alt=""
            width={647}
            height={385}
            sizes="120px"
            loading="eager"
            className="h-[46px] w-auto lg:h-[64px]"
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "relative block rounded-lg px-3 py-2 font-sans text-[14.5px] font-semibold transition-colors",
                      active ? "text-primary" : "text-[#111] hover:text-primary"
                    )}
                  >
                    {item.name}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-0.5 h-[2.5px] rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className="hidden h-11 items-center gap-2 rounded-xl border-[1.5px] border-[#222] bg-[#FFD43B] px-5 font-heading text-[14px] font-bold text-[#111] shadow-[2px_2px_0_#111] transition-all hover:-translate-y-px hover:bg-[#F7CB2D] sm:inline-flex"
          >
            Start a project
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-xl border-[1.5px] border-[#222] bg-white text-[#111] transition-colors hover:bg-[#F5F2EB] lg:hidden"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.215, 0.61, 0.355, 1] }}
            className="overflow-hidden border-t border-[#222]/10 bg-background lg:hidden"
          >
            <Container className="flex flex-col gap-5 pb-6 pt-3">
              <nav aria-label="Mobile">
                <ul className="flex flex-col">
                  {NAV_ITEMS.map((item) => {
                    const active = isActive(item);
                    return (
                      <li key={item.name} className="border-b border-[#222]/[0.07] last:border-b-0">
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          aria-current={active ? "true" : undefined}
                          className={cn(
                            "flex items-center justify-between py-3.5 font-heading text-[17px] font-bold",
                            active ? "text-primary" : "text-[#111]"
                          )}
                        >
                          {item.name}
                          <ArrowRight aria-hidden="true" className="size-4 opacity-40" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <Link
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border-[1.5px] border-[#222] bg-[#FFD43B] font-heading text-[15px] font-bold text-[#111] shadow-[2px_2px_0_#111] sm:hidden"
              >
                Start a project
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <SocialLinks />
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
