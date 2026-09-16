import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/sections/hero";
import { WhyUs } from "@/sections/why-us";
import { Services } from "@/sections/services";
import { Projects } from "@/sections/projects";
import { Testimonials } from "@/sections/testimonials";
import { Process } from "@/sections/process";
import { CTA } from "@/sections/cta";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col bg-background">
        <Hero />
        <Services />
        <Projects />
        <WhyUs />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
