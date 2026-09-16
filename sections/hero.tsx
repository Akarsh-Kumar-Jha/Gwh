import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { AnimatedUnderline } from "@/components/ui/animated-underline-text";
import { Container } from "@/components/layout/container";

const HIGHLIGHTS = ["Fast delivery", "Clean code", "Scalable architecture", "AI powered"];

const SHIPPED = ["Swapno Motors", "Puja Parikrama", "CodeMate", "Trading Zone", "SatvikAI", "Intento"];

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

/** Wide team illustration on desktop, square illustration on smaller screens. */
function HeroIllustration() {
  const common = { alt: "Illustration of the Grow With Hustler team building a product", quality: 90 };
  const {
    props: { srcSet: desktopSrcSet, sizes: desktopSizes },
  } = getImageProps({
    ...common,
    src: "/images/hero/hero_team_vector.png",
    width: 1024,
    height: 682,
    sizes: "(min-width: 1280px) 680px, 56vw",
  });
  const {
    props: { srcSet: mobileSrcSet, ...rest },
  } = getImageProps({
    ...common,
    src: "/images/hero/hero_illustration_mobile.png",
    width: 1024,
    height: 1024,
    sizes: "(min-width: 640px) 420px, 90vw",
    fetchPriority: "high",
    loading: "eager",
  });

  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktopSrcSet} sizes={desktopSizes} />
      <img
        {...rest}
        alt={common.alt}
        srcSet={mobileSrcSet}
        className="mx-auto aspect-square w-full max-w-[420px] object-contain lg:aspect-[1024/682] lg:max-w-none"
      />
    </picture>
  );
}

export function Hero() {
  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-background lg:min-h-[100svh]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-20">
        <Image src="/images/hero/GWH_Background Texture.png" alt="" fill sizes="100vw" className="object-cover" />
      </div>
      {/* Blueprint grid drawn in CSS: no image request, and it never competes for LCP */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(rgba(36,87,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(36,87,255,0.07)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_left,black_40%,transparent)] lg:block"
      />

      <Container className="relative flex flex-1 flex-col pb-8 pt-[96px] lg:pb-8 lg:pt-[112px]">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:gap-8">
          <div className="max-w-[560px]">
            <p
              className="animate-rise inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-[#222] bg-white/60 px-3.5 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-[#111]"
              style={delay(0)}
            >
              Digital products. <span className="text-primary">Real impact.</span>
            </p>

            <h1
              className="animate-rise mt-5 font-heading text-[clamp(40px,11vw,56px)] font-black uppercase leading-[0.95] tracking-[-0.02em] text-[#111] lg:text-[clamp(52px,4.9vw,72px)]"
              style={delay(60)}
            >
              <span className="block">We build</span>
              <span className="block text-primary">software</span>
              <span className="relative inline-block pb-1">
                that grows
                <AnimatedUnderline strokeColor="#2457FF" strokeWidth={3.5} delay={0.5} />
              </span>
              <span className="block pt-1 text-primary">businesses.</span>
            </h1>

            <p
              className="animate-rise mt-5 max-w-[480px] font-sans text-[16px] leading-[1.65] text-[#555] lg:text-[17px]"
              style={delay(120)}
            >
              From high-converting websites to web apps, SaaS platforms and AI solutions, we turn your idea into a
              fast, reliable product your customers love.
            </p>

            <div className="animate-rise mt-7 flex flex-col gap-3 sm:flex-row" style={delay(180)}>
              <Link
                href="/#contact"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl border-[1.5px] border-[#222] bg-[#FFD43B] px-7 font-heading text-[15px] font-bold text-[#111] shadow-[3px_3px_0_#111] transition-all hover:-translate-y-0.5 hover:bg-[#F7CB2D]"
              >
                Start your project
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href="/#projects"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl border-[1.5px] border-[#222] bg-white px-7 font-heading text-[15px] font-bold text-[#111] transition-all hover:-translate-y-0.5 hover:bg-[#F5F2EB]"
              >
                View our work
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </div>

            <ul
              className="animate-rise mt-7 grid max-w-[440px] grid-cols-2 gap-x-6 gap-y-3 border-t border-[#222]/10 pt-5"
              style={delay(240)}
            >
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-2 font-sans text-[14px] font-semibold text-[#111]">
                  <CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-rise" style={delay(120)}>
            <HeroIllustration />
          </div>
        </div>

        <div
          className="animate-rise mt-10 flex flex-col gap-3 rounded-2xl border-[1.5px] border-[#222] bg-white/50 px-5 py-4 sm:flex-row sm:items-center sm:gap-8 sm:px-6 lg:mt-6"
          style={delay(300)}
        >
          <p className="shrink-0 font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-[#6B6B6B]">
            Products we&apos;ve shipped
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:flex-1 lg:justify-between">
            {SHIPPED.map((name) => (
              <li key={name}>
                <Link
                  href="/#projects"
                  className="font-heading text-[16px] font-extrabold tracking-[-0.01em] text-[#111] transition-colors hover:text-primary lg:text-[18px]"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
