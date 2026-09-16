import Image from "next/image";
import { TrendingUp, Users, Zap } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Eyebrow, Highlight } from "@/components/ui/section-heading";

const VALUES = [
  { Icon: Users, tile: "bg-[#EEF2FF] border-primary/20 text-primary", title: "Founder first", desc: "We think like founders." },
  { Icon: Zap, tile: "bg-[#FFF9E6] border-[#FFD43B]/60 text-[#111]", title: "Result driven", desc: "We build for real business impact." },
  { Icon: TrendingUp, tile: "bg-[#EEF2FF] border-primary/20 text-primary", title: "Long term", desc: "We grow with you, not just ship." },
];

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function AboutHero() {
  return (
    <section aria-labelledby="about-heading" className="relative w-full pb-12 pt-[112px] lg:pb-16 lg:pt-[136px]">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-[580px]">
            <div className="animate-rise" style={delay(0)}>
              <Eyebrow>About us</Eyebrow>
            </div>

            <h1
              id="about-heading"
              className="animate-rise mt-5 font-heading text-[clamp(36px,5vw,58px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#111]"
              style={delay(60)}
            >
              Building digital products that <Highlight>create real impact.</Highlight>
            </h1>

            <p
              className="animate-rise mt-5 max-w-[500px] font-sans text-[16px] leading-[1.7] text-[#555] lg:text-[17px]"
              style={delay(120)}
            >
              At Grow With Hustler, we partner with founders and businesses to build scalable digital products that
              solve real problems and drive meaningful growth.
            </p>

            <ul className="animate-rise mt-8 grid gap-3 sm:grid-cols-3" style={delay(180)}>
              {VALUES.map(({ Icon, tile, title, desc }) => (
                <li key={title} className="flex items-start gap-3 rounded-2xl border border-[#222]/12 bg-white/70 p-4 sm:flex-col">
                  <span aria-hidden="true" className={`flex size-9 shrink-0 items-center justify-center rounded-full border ${tile}`}>
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <h2 className="font-heading text-[15px] font-bold text-[#111]">{title}</h2>
                    <p className="mt-0.5 font-sans text-[13.5px] leading-snug text-[#666]">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-rise mx-auto w-full max-w-[520px] lg:mr-0" style={delay(120)}>
            <Image
              src="/images/about/about-hero-vector.png"
              alt="Illustration of a team assembling a website together"
              width={1024}
              height={1024}
              quality={90}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 520px, 90vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
