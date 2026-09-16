import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Highlight } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex flex-1 items-center bg-background pb-20 pt-[140px]">
        <Container className="text-center">
          <svg
            aria-hidden="true"
            viewBox="0 0 360 130"
            className="mx-auto h-auto w-[clamp(200px,40vw,360px)] fill-[#111]/10 font-heading font-black"
          >
            <text x="50%" y="112" textAnchor="middle" fontSize="150" letterSpacing="-7">
              404
            </text>
          </svg>
          <h1 className="-mt-4 font-heading text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-[-0.035em] text-[#111]">
            <span className="sr-only">Error 404: </span>
            This page <Highlight>doesn&apos;t exist.</Highlight>
          </h1>
          <p className="mx-auto mt-5 max-w-[460px] font-sans text-[16px] leading-[1.7] text-[#555]">
            The link may be broken or the page may have moved. Let&apos;s get you back on track.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl border-[1.5px] border-[#222] bg-[#FFD43B] px-7 font-heading text-[15px] font-bold text-[#111] shadow-[3px_3px_0_#111] transition-all hover:-translate-y-0.5 hover:bg-[#F7CB2D]"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Back to home
            </Link>
            <Link
              href="/#projects"
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl border-[1.5px] border-[#222] bg-white px-7 font-heading text-[15px] font-bold text-[#111] transition-all hover:-translate-y-0.5 hover:bg-[#F5F2EB]"
            >
              See our work
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
