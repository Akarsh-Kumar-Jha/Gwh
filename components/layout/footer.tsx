import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { Container } from "@/components/layout/container";
import { NAV_ITEMS, SITE } from "@/lib/site";
import { SocialLinks } from "@/components/ui/social-links";
import { SERVICES } from "@/lib/services";

const HEADING = "font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-[#6F6A5E]";
const LINK = "font-sans text-[14.5px] font-medium text-[#333] transition-colors hover:text-primary";

export function Footer() {
  return (
    <footer className="w-full border-t border-[#EAE4D8] bg-[#FBF7EF] text-[#111]">
      <Container className="py-14 lg:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
          <div className="col-span-2 flex flex-col gap-4 lg:col-span-1">
            <Link href="/" aria-label="Grow With Hustler home" className="self-start rounded-lg">
              <Image
                src="/images/hero/GWH_LOGOU.png"
                alt=""
                width={647}
                height={385}
                sizes="140px"
                className="h-[72px] w-auto"
              />
            </Link>
            <p className="max-w-[340px] font-sans text-[14.5px] leading-[1.65] text-[#555]">
              We design and build websites, apps, SaaS platforms and AI products for founders and growing businesses.
            </p>
            <div className="mt-2">
              <p className={HEADING}>Follow our work</p>
              <SocialLinks className="mt-3" />
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className={HEADING}>Company</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className={LINK}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={HEADING}>Services</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SERVICES.filter((service) => service.value !== "other").map((service) => (
                <li key={service.value}>
                  <Link href="/#services" className={LINK}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h2 className={HEADING}>Get in touch</h2>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-4 inline-flex items-center gap-2 break-all font-sans text-[15px] font-semibold text-[#111] transition-colors hover:text-primary"
            >
              <Mail aria-hidden="true" className="size-4 shrink-0 text-primary" />
              {SITE.email}
            </a>
            <p className="mt-2 font-sans text-[14px] leading-[1.6] text-[#555]">
              We reply within one business day.
            </p>
            <Link
              href="/#contact"
              className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl border-[1.5px] border-[#222] bg-[#111] px-5 font-heading text-[14px] font-bold text-white transition-colors hover:bg-primary hover:border-primary"
            >
              Start a project
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[#EAE4D8] pt-6 sm:flex-row sm:items-center">
          <p className="font-sans text-[13px] text-[#6B6B6B]">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="font-sans text-[13px] text-[#6B6B6B]">Designed &amp; built in India</p>
        </div>
      </Container>
    </footer>
  );
}
