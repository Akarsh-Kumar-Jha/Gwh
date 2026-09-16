import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Eyebrow, Highlight, SECTION_LEAD, SECTION_TITLE } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const FOUNDERS = [
  {
    name: "Arunabha Banerjee",
    role: "Co-Founder & Product Architect",
    bio: "A full-stack developer and product architect who loves building scalable web products with thoughtful, polished user experiences.",
    photo: "/images/about/arunabha.png",
    domain: "arunabha.dev",
    url: "https://www.arunabha.dev",
    accent: "border-t-[#FFD43B]",
  },
  {
    name: "Akarsh Kumar",
    role: "Co-Founder & Full Stack Developer",
    bio: "Turns ideas into real products, with a focus on clean code, AI integrations and solutions that deliver measurable impact.",
    photo: "/images/about/akarsh.png",
    domain: "akarshjha.dev",
    url: "https://www.akarshjha.dev",
    accent: "border-t-primary",
  },
];

export function AboutFounders() {
  return (
    <section aria-labelledby="founders-heading" className="relative w-full py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-[640px] text-center">
          <Eyebrow>The founders</Eyebrow>
          <h2 id="founders-heading" className={cn(SECTION_TITLE, "mt-5")}>
            The people behind <Highlight>Grow With Hustler</Highlight>
          </h2>
          <p className={cn(SECTION_LEAD, "mt-5")}>
            We&apos;re builders, problem solvers and entrepreneurs. When you work with us, you work directly with us.
          </p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-[1040px] gap-6 md:grid-cols-2">
          {FOUNDERS.map((founder) => (
            <li
              key={founder.name}
              className={cn(
                "flex flex-col rounded-[24px] border-[1.5px] border-t-[5px] border-[#222]/15 bg-white p-7 shadow-[0_16px_40px_-24px_rgba(17,17,17,0.2)] sm:p-8",
                founder.accent
              )}
            >
              <div className="flex items-center gap-4">
                <Image
                  src={founder.photo}
                  alt={`Portrait of ${founder.name}`}
                  width={95}
                  height={95}
                  className="size-16 shrink-0 rounded-full border-2 border-white object-cover shadow-sm"
                />
                <div>
                  <h3 className="font-heading text-[22px] font-extrabold leading-tight text-[#111]">{founder.name}</h3>
                  <p className="mt-1 font-sans text-[14px] font-semibold text-primary">{founder.role}</p>
                </div>
              </div>
              <p className="mb-6 mt-5 font-sans text-[15px] leading-[1.7] text-[#555]">{founder.bio}</p>
              <a
                href={founder.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${founder.domain}, ${founder.name}'s portfolio (opens in a new tab)`}
                className="mt-auto inline-flex items-center gap-1.5 self-start rounded-full border border-primary/20 bg-[#EEF2FF] px-4 py-2 font-sans text-[14px] font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                {founder.domain}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
