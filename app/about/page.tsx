import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AboutHero } from "@/sections/about-hero";
import { AboutFounders } from "@/sections/about-founders";
import { CTA } from "@/sections/cta";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the founders of Grow With Hustler, a product development agency building websites, apps, SaaS platforms and AI solutions for ambitious founders.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: "About Grow With Hustler",
    description:
      "Meet the founders behind Grow With Hustler and learn how we build digital products that create real impact.",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative flex flex-1 flex-col bg-background">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] opacity-20">
          <Image src="/images/hero/GWH_Background Texture.png" alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <AboutHero />
        <AboutFounders />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
