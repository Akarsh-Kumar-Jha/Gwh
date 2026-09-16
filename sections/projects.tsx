"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleUser,
  CodeXml,
  House,
  Landmark,
  Leaf,
  ListChecks,
  Plus,
  Search,
  Sparkles,
  TrendingUp,
  Play,
  TriangleAlert,
  Dumbbell,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Eyebrow, Highlight, SECTION_LEAD, SECTION_TITLE } from "@/components/ui/section-heading";
import { TechIcon } from "@/components/ui/tech-icon";
import { VideoButton, VideoPoster, type YouTubeVideo } from "@/components/ui/video-dialog";
import { YouTubeIcon } from "@/components/ui/social-links";
import { SOCIAL_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.6, delay, ease: EASE },
  };
}

/* ─────────────────────────────────────────
   PROJECT DEFINITIONS
───────────────────────────────────────── */
interface ProjectLink {
  label: string;
  href: string;
  kind: "live" | "github";
}

interface Project {
  id: string;
  name: string;
  category: string;
  platform: string;
  year: string;
  summary: string;
  features: string[];
  tech: string[];
  logoClassName: string;
  logo: React.ReactNode;
  Preview: () => React.ReactElement;
  featured?: boolean;
  links?: ProjectLink[];
  video?: YouTubeVideo;
  /** Upcoming templates get their own card below the delivered work */
  status?: "upcoming";
}

const SWAPNO_VIDEO: YouTubeVideo = {
  id: "HU94bz1KX4A",
  title: "How we built a custom dealership dashboard for Swapno Motors",
  poster: "/images/videos/swapno-motors-walkthrough.jpg",
  duration: "34 min",
};

const GYM_VIDEO: YouTubeVideo = {
  id: "iIEKPWElc3E",
  title: "Gym Management System: complete admin dashboard walkthrough",
  poster: "/images/videos/gym-management-walkthrough.jpg",
  duration: "17 min",
};

const PROJECTS: Project[] = [
  {
    id: "swapno",
    name: "Swapno Motors",
    category: "Electric Mobility Platform",
    platform: "Web platform",
    year: "2025",
    summary:
      "A complete digital platform for an electric vehicle dealership: a public website, live inventory and appointment booking, plus an admin dashboard to run the business day to day.",
    features: ["Website", "Dashboard", "Admin Panel", "Inventory", "Appointment Booking"],
    tech: ["Next.js", "Prisma", "Supabase", "Tailwind"],
    logoClassName: "bg-[#0A0D0B] text-[#6BFF4F]",
    logo: <span className="font-heading font-extrabold text-[18px]">S</span>,
    Preview: SwapnoPreview,
    featured: true,
    links: [{ label: "Visit site", href: "https://www.swapnomotors.com/", kind: "live" }],
    video: SWAPNO_VIDEO,
  },
  {
    id: "puja-parikrama",
    name: "Puja Parikrama",
    category: "Festival Guide & Route Planner",
    platform: "Web app (PWA)",
    year: "2026",
    summary:
      "A free Durga Puja companion for Kolkata: 187 pandals on a live map, walkable routes with metro info, crowd reports and group tracking, and it keeps working when the network drops.",
    features: ["Live Pandal Map", "Route Planner", "Queue Reports", "Group Tracking", "Offline Mode"],
    tech: ["Next.js", "Firebase", "OpenStreetMap", "PWA"],
    logoClassName: "bg-[#8B1E1E] text-[#FDE7C2]",
    logo: <Landmark className="w-5 h-5" strokeWidth={2.2} />,
    Preview: PujaParikramaPreview,
    featured: true,
    links: [{ label: "Visit site", href: "https://www.pujaparikrama.in/", kind: "live" }],
  },
  {
    id: "satvik",
    name: "SatvikAI",
    category: "AI Nutrition Platform",
    platform: "Web app",
    year: "2025",
    summary:
      "An AI nutrition assistant that turns a photo of a meal into macros, flags allergens and builds personalised meal plans.",
    features: ["AI Nutrition", "Meal Plans", "Image Analysis", "Allergen Detection", "User Dashboard"],
    tech: ["React", "Node.js", "MongoDB", "Gemini AI"],
    logoClassName: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    logo: <Leaf className="w-5 h-5" strokeWidth={2.2} />,
    Preview: SatvikPreview,
  },
  {
    id: "intento",
    name: "Intento",
    category: "AI Notes Productivity App",
    platform: "iOS & Android",
    year: "2025",
    summary:
      "A cross-platform notes app where AI summarises what you write, pulls out tasks by priority and finds anything instantly.",
    features: ["AI Notes", "Smart Search", "Task Management", "Priority", "Cross Platform"],
    tech: ["React Native", "Expo", "Gemini", "Supabase"],
    logoClassName: "bg-indigo-950 text-indigo-300 border border-indigo-800",
    logo: (
      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
    ),
    Preview: IntentoPreview,
  },
  {
    id: "codemate",
    name: "CodeMate",
    category: "Developer Networking Platform",
    platform: "Web app",
    year: "2026",
    summary:
      "A matchmaking platform for developers. Swipe through profiles matched on tech stack, connect, and chat in real time, with GitHub and LinkedIn sign-in for verified profiles.",
    features: ["Swipe Matching", "Real-time Chat", "GitHub & LinkedIn Login", "Connection Requests", "Developer Profiles"],
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    logoClassName: "bg-[#12060E] text-[#F43F5E] border border-[#3B1328]",
    logo: <CodeXml className="w-5 h-5" strokeWidth={2.2} />,
    Preview: CodeMatePreview,
    links: [
      { label: "Live demo", href: "https://codemate.arunabha.dev/", kind: "live" },
      { label: "GitHub", href: "https://github.com/arunabha369/CodeMate", kind: "github" },
    ],
  },
  {
    id: "trading-zone",
    name: "Trading Zone",
    category: "Stock Broking & Investments",
    platform: "Website",
    year: "2026",
    summary:
      "A fast, mobile-first website for a Nirmal Bang associate brokerage in Kalna, presenting demat, trading, mutual fund and IPO services with one-tap call and enquiry.",
    features: ["Business Website", "Services Showcase", "Call & Enquiry CTAs", "SEO Metadata", "Mobile-first Design"],
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    logoClassName: "bg-[#0B120D] text-[#4ADE80] border border-[#1C3324]",
    logo: <TrendingUp className="w-5 h-5" strokeWidth={2.4} />,
    Preview: TradingZonePreview,
    links: [
      { label: "Visit site", href: "https://trading-zone-zeta.vercel.app/", kind: "live" },
      { label: "GitHub", href: "https://github.com/arunabha369/trading-zone", kind: "github" },
    ],
  },
  {
    id: "gym-management",
    name: "Gym Management System",
    category: "Gym website + admin dashboard template",
    platform: "Template",
    year: "2026",
    summary:
      "A ready-to-launch system for gyms and fitness studios: a premium public website with membership plans and WhatsApp enrolment, plus an admin dashboard to run members, trainers and attendance from one place.",
    features: ["Membership Plans", "Member Management", "Trainer Profiles", "Attendance Tracking", "Live Occupancy", "Admin Dashboard"],
    tech: ["Next.js", "Tailwind"],
    logoClassName: "bg-[#0B0B0B] text-[#C3FF3D]",
    logo: <Dumbbell className="w-5 h-5" strokeWidth={2.2} />,
    Preview: GymPreview,
    status: "upcoming",
    video: GYM_VIDEO,
    links: [{ label: "Live demo", href: "https://gym-template-pink.vercel.app/", kind: "live" }],
  },
];

function GymPreview() {
  return (
    <VideoPoster
      video={GYM_VIDEO}
      sizes="(min-width: 1024px) 680px, 92vw"
    />
  );
}

/* ─────────────────────────────────────────
   DEVICE FRAMES
   Everything inside a preview is sized in `em`, and the canvas sets
   font-size from its own width (cqw), so each composition scales as
   one image at every breakpoint instead of reflowing.
───────────────────────────────────────── */
function PreviewCanvas({
  label,
  background,
  children,
}: {
  label: string;
  background: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative flex h-full items-center overflow-hidden rounded-[20px]"
      style={{ background }}
    >
      <div className="@container relative w-full aspect-[16/11]">
        <div className="absolute inset-0 [font-size:1.25cqw] transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.02]">
          {children}
        </div>
      </div>
    </div>
  );
}

function BrowserWindow({
  tone = "dark",
  className,
  children,
}: {
  tone?: "dark" | "light";
  className?: string;
  children: React.ReactNode;
}) {
  const light = tone === "light";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[0.9em] ring-1 shadow-[0_1.6em_3.2em_-1em_rgba(0,0,0,0.5)]",
        light ? "bg-white ring-black/10" : "bg-[#15181D] ring-white/10",
        className
      )}
    >
      <div
        className={cn(
          "flex h-[2.4em] items-center gap-[0.5em] px-[0.9em] border-b",
          light ? "bg-[#F3F4F2] border-black/[0.06]" : "border-white/[0.06]"
        )}
      >
        <span className="size-[0.7em] rounded-full bg-[#FF5F57]" />
        <span className="size-[0.7em] rounded-full bg-[#FEBC2E]" />
        <span className="size-[0.7em] rounded-full bg-[#28C840]" />
        <span
          className={cn(
            "mx-auto h-[1.2em] w-[40%] rounded-full",
            light ? "bg-black/[0.06]" : "bg-white/[0.07]"
          )}
        />
      </div>
      {children}
    </div>
  );
}

function PhoneFrame({
  className,
  screenClassName,
  children,
}: {
  className?: string;
  screenClassName: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[2.3em] bg-[#0D0E12] p-[0.45em] ring-1 ring-white/15 shadow-[0_2em_3.5em_-1em_rgba(0,0,0,0.55)]",
        className
      )}
    >
      <div className={cn("relative overflow-hidden rounded-[1.9em]", screenClassName)}>
        <div className="relative flex h-[2em] items-center justify-between px-[1.4em]">
          <span className="text-[0.7em] font-semibold">9:41</span>
          <span className="absolute left-1/2 top-[0.45em] h-[1.1em] w-[32%] -translate-x-1/2 rounded-full bg-black" />
          <span className="h-[0.55em] w-[1.1em] rounded-[0.18em] bg-current opacity-70" />
        </div>
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SWAPNO MOTORS — REAL SCREENSHOTS
───────────────────────────────────────── */
const WINDOW_SIZES = "(min-width: 1024px) 480px, (min-width: 768px) 540px, 72vw";

function SwapnoPreview() {
  return (
    <PreviewCanvas
      label="Swapno Motors public website, admin dashboard and mobile site"
      background="radial-gradient(70% 60% at 15% 10%, rgba(107,255,79,0.16), transparent 70%), radial-gradient(60% 60% at 100% 100%, rgba(36,87,255,0.3), transparent 70%), #0A0D0B"
    >
      <BrowserWindow className="absolute right-[5%] top-[7%] w-[70%]">
        <Image
          src="/images/hero/swapno-dash.png"
          alt=""
          width={1912}
          height={912}
          sizes={WINDOW_SIZES}
          className="block h-auto w-full"
        />
      </BrowserWindow>

      <BrowserWindow className="absolute bottom-[9%] left-[5%] w-[72%]">
        <Image
          src="/swapno-fe.png"
          alt=""
          width={1897}
          height={920}
          sizes={WINDOW_SIZES}
          className="block h-auto w-full"
        />
      </BrowserWindow>

      <PhoneFrame
        className="absolute bottom-[5%] right-[6%] w-[19%]"
        screenClassName="bg-black text-white"
      >
        <Image
          src="/swapno-fe-mobile.png"
          alt=""
          width={465}
          height={907}
          sizes="(min-width: 1024px) 130px, (min-width: 768px) 150px, 19vw"
          className="block h-auto w-full"
        />
      </PhoneFrame>
    </PreviewCanvas>
  );
}

/* ─────────────────────────────────────────
   PUJA PARIKRAMA — REAL SCREENSHOTS
───────────────────────────────────────── */
function PujaParikramaPreview() {
  return (
    <PreviewCanvas
      label="Puja Parikrama landing page, live pandal map and mobile map view"
      background="radial-gradient(70% 60% at 85% 5%, rgba(251,191,36,0.22), transparent 70%), radial-gradient(60% 60% at 0% 100%, rgba(220,38,38,0.35), transparent 70%), #2A0B0B"
    >
      <BrowserWindow tone="light" className="absolute right-[4%] top-[6%] w-[60%]">
        <Image
          src="/images/projects/puja-parikrama-home.jpg"
          alt=""
          width={1600}
          height={1000}
          sizes={WINDOW_SIZES}
          className="block h-auto w-full"
        />
      </BrowserWindow>

      <BrowserWindow className="absolute bottom-[6%] left-[4%] w-[66%]">
        <Image
          src="/images/projects/puja-parikrama-map.jpg"
          alt=""
          width={1600}
          height={1000}
          sizes={WINDOW_SIZES}
          className="block h-auto w-full"
        />
      </BrowserWindow>

      <PhoneFrame
        className="absolute bottom-[5%] right-[6%] w-[18%]"
        screenClassName="bg-[#161616] text-white"
      >
        <Image
          src="/images/projects/puja-parikrama-map-mobile.jpg"
          alt=""
          width={540}
          height={1080}
          sizes="(min-width: 1024px) 130px, (min-width: 768px) 150px, 18vw"
          className="block h-auto w-full"
        />
      </PhoneFrame>
    </PreviewCanvas>
  );
}

/* ─────────────────────────────────────────
   CODEMATE & TRADING ZONE — REAL SCREENSHOTS
───────────────────────────────────────── */
const CARD_WINDOW_SIZES = "(min-width: 1024px) 340px, (min-width: 768px) 220px, 60vw";
const CARD_PHONE_SIZES = "(min-width: 1024px) 120px, (min-width: 768px) 80px, 22vw";

function CodeMatePreview() {
  return (
    <PreviewCanvas
      label="CodeMate landing page on desktop and mobile"
      background="radial-gradient(60% 60% at 85% 10%, rgba(236,72,153,0.35), transparent 70%), radial-gradient(60% 60% at 0% 100%, rgba(147,51,234,0.3), transparent 70%), #0B0510"
    >
      <BrowserWindow className="absolute left-[5%] top-[19%] w-[64%]">
        <Image
          src="/images/projects/codemate-home.jpg"
          alt=""
          width={1600}
          height={1000}
          sizes={CARD_WINDOW_SIZES}
          className="block h-auto w-full"
        />
      </BrowserWindow>
      <PhoneFrame className="absolute right-[5%] top-[9%] w-[23%]" screenClassName="bg-black text-white">
        <Image
          src="/images/projects/codemate-mobile.jpg"
          alt=""
          width={540}
          height={1080}
          sizes={CARD_PHONE_SIZES}
          className="block h-auto w-full"
        />
      </PhoneFrame>
    </PreviewCanvas>
  );
}

function TradingZonePreview() {
  return (
    <PreviewCanvas
      label="Trading Zone services page on desktop and home page on mobile"
      background="radial-gradient(60% 60% at 15% 10%, rgba(74,222,128,0.22), transparent 70%), radial-gradient(60% 60% at 100% 100%, rgba(20,83,45,0.5), transparent 70%), #060A07"
    >
      <PhoneFrame className="absolute left-[5%] top-[9%] w-[23%]" screenClassName="bg-[#0B0B0B] text-white">
        <Image
          src="/images/projects/trading-zone-mobile.jpg"
          alt=""
          width={540}
          height={1080}
          sizes={CARD_PHONE_SIZES}
          className="block h-auto w-full"
        />
      </PhoneFrame>
      <BrowserWindow className="absolute right-[5%] top-[19%] w-[64%]">
        <Image
          src="/images/projects/trading-zone-services.jpg"
          alt=""
          width={1600}
          height={1000}
          sizes={CARD_WINDOW_SIZES}
          className="block h-auto w-full"
        />
      </BrowserWindow>
    </PreviewCanvas>
  );
}

/* ─────────────────────────────────────────
   SATVIKAI — ILLUSTRATED UI
───────────────────────────────────────── */
const FOOD_BOWL_BG =
  "radial-gradient(circle at 32% 34%, #FDE68A 0 11%, transparent 12%), radial-gradient(circle at 62% 30%, #F87171 0 9%, transparent 10%), radial-gradient(circle at 68% 62%, #BBF7D0 0 12%, transparent 13%), radial-gradient(circle at 38% 66%, #FCA5A5 0 8%, transparent 9%), radial-gradient(circle at 50% 50%, #A3E635 0 42%, #4D7C0F 68%, #E7E5E4 69%, #D6D3D1 100%)";

function FoodBowl({ className }: { className?: string }) {
  return <span className={cn("block rounded-full", className)} style={{ background: FOOD_BOWL_BG }} />;
}

function ProgressRing({ value, className }: { value: number; className?: string }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <div className={cn("relative", className)}>
      <svg viewBox="0 0 100 100" className="size-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#E3F4EA" strokeWidth="10" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="#059669"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[1.7em] font-extrabold leading-none">{value}%</span>
        <span className="mt-[0.3em] text-[0.7em] text-slate-600">daily goal</span>
      </div>
    </div>
  );
}

const MACROS = [
  { label: "Calories", value: "1,850 kcal", pct: 82, bar: "bg-emerald-500" },
  { label: "Protein", value: "142 g", pct: 94, bar: "bg-sky-500" },
  { label: "Fibre", value: "28 g", pct: 70, bar: "bg-amber-400" },
];

const WEEK_INTAKE = [62, 78, 70, 88, 94, 81, 58];

function SatvikDashboardScreen() {
  return (
    <div className="flex aspect-[16/10] flex-col gap-[1em] bg-[#F7FAF8] p-[1.3em] text-[#0F172A]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[0.5em]">
          <span className="flex size-[1.9em] items-center justify-center rounded-[0.55em] bg-emerald-700 text-white">
            <Leaf className="size-[1.1em]" />
          </span>
          <span className="text-[1.15em] font-bold tracking-tight">SatvikAI</span>
        </div>
        <div className="flex items-center gap-[0.3em] text-[0.85em] font-semibold">
          <span className="rounded-full bg-emerald-700 px-[0.9em] py-[0.3em] text-white">Dashboard</span>
          <span className="px-[0.6em] text-slate-600">Meal plans</span>
          <span className="px-[0.6em] text-slate-600">Scan</span>
        </div>
        <span className="size-[1.9em] rounded-full bg-gradient-to-br from-amber-300 to-orange-400" />
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1.25fr_1fr] gap-[1em]">
        <div className="flex flex-col rounded-[0.9em] bg-white p-[1.1em] ring-1 ring-black/5">
          <div className="flex items-center justify-between">
            <span className="text-[0.85em] font-semibold text-slate-600">Today&apos;s nutrition</span>
            <span className="rounded-full bg-emerald-50 px-[0.6em] py-[0.15em] text-[0.72em] font-bold text-emerald-700">
              On track
            </span>
          </div>
          <div className="mt-[1em] flex items-center gap-[1.2em]">
            <ProgressRing value={94} className="size-[8.5em] shrink-0" />
            <div className="flex-1 space-y-[0.8em]">
              {MACROS.map((m) => (
                <div key={m.label}>
                  <div className="flex items-baseline justify-between text-[0.8em]">
                    <span className="text-slate-600">{m.label}</span>
                    <span className="font-bold">{m.value}</span>
                  </div>
                  <div className="mt-[0.3em] h-[0.45em] overflow-hidden rounded-full bg-slate-100">
                    <div className={cn("h-full rounded-full", m.bar)} style={{ width: `${m.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-[1.1em]">
            <div className="flex items-center justify-between text-[0.72em]">
              <span className="text-slate-600">This week</span>
              <span className="font-semibold text-emerald-700">5-day streak</span>
            </div>
            <div className="mt-[0.5em] flex h-[4.5em] items-end gap-[0.45em]">
              {WEEK_INTAKE.map((height, i) => (
                <span
                  key={i}
                  className={cn("flex-1 rounded-[0.3em]", i === 4 ? "bg-emerald-500" : "bg-emerald-100")}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
          <div className="mt-auto grid grid-cols-3 gap-[0.5em] pt-[1em]">
            {["Breakfast", "Lunch", "Dinner"].map((meal, i) => (
              <span
                key={meal}
                className={cn(
                  "flex items-center justify-center gap-[0.3em] rounded-[0.6em] py-[0.55em] text-[0.72em] font-semibold",
                  i < 2 ? "bg-emerald-50 text-emerald-800" : "bg-slate-100 text-slate-600"
                )}
              >
                {i < 2 && <Check className="size-[1em]" strokeWidth={3} />}
                {meal}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col rounded-[0.9em] bg-white p-[1.1em] ring-1 ring-black/5">
          <div className="flex items-center gap-[0.4em] text-[0.85em] font-semibold text-slate-600">
            <Sparkles className="size-[1em] text-emerald-600" />
            AI meal scan
          </div>
          <div className="mt-[1em] flex items-center gap-[0.8em]">
            <FoodBowl className="size-[4.4em] shrink-0" />
            <div className="min-w-0">
              <p className="truncate text-[1.05em] font-bold">Quinoa Salad</p>
              <p className="text-[0.78em] text-slate-600">420 kcal · 1 bowl</p>
            </div>
          </div>
          <div className="mt-[1em] flex flex-wrap gap-[0.4em]">
            <span className="rounded-full bg-emerald-50 px-[0.7em] py-[0.25em] text-[0.72em] font-semibold text-emerald-700">
              High protein
            </span>
            <span className="inline-flex items-center gap-[0.3em] rounded-full bg-amber-50 px-[0.7em] py-[0.25em] text-[0.72em] font-semibold text-amber-700">
              <TriangleAlert className="size-[1em]" />
              Sesame
            </span>
          </div>
          <div className="mt-[1em] rounded-[0.7em] bg-emerald-50/80 p-[0.8em]">
            <p className="flex items-center gap-[0.35em] text-[0.68em] font-semibold text-emerald-700">
              <Sparkles className="size-[1em]" />
              Suggested swap
            </p>
            <p className="mt-[0.3em] text-[0.8em] font-semibold">Lemon &amp; olive oil dressing</p>
            <p className="text-[0.66em] text-slate-600">Sesame-free · 40 kcal less</p>
          </div>
          <div className="mt-auto space-y-[0.5em] pt-[1em]">
            <div className="h-[0.5em] w-full rounded-full bg-slate-100" />
            <div className="h-[0.5em] w-4/5 rounded-full bg-slate-100" />
            <div className="h-[0.5em] w-3/5 rounded-full bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

const SCAN_CORNERS = [
  "left-[8%] top-[8%] border-l-[0.22em] border-t-[0.22em] rounded-tl-[0.6em]",
  "right-[8%] top-[8%] border-r-[0.22em] border-t-[0.22em] rounded-tr-[0.6em]",
  "left-[8%] bottom-[8%] border-l-[0.22em] border-b-[0.22em] rounded-bl-[0.6em]",
  "right-[8%] bottom-[8%] border-r-[0.22em] border-b-[0.22em] rounded-br-[0.6em]",
];

function SatvikScanScreen() {
  return (
    <div className="flex aspect-[9/18] flex-col gap-[0.8em] px-[1em] pb-[1.1em] pt-[0.4em]">
      <div className="flex items-center justify-between">
        <span className="text-[1.2em] font-bold">Scan meal</span>
        <span className="flex size-[1.8em] items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <Leaf className="size-[1em]" />
        </span>
      </div>

      <div className="relative aspect-square overflow-hidden rounded-[1em] bg-[#1C2620]">
        <FoodBowl className="absolute inset-[17%]" />
        {SCAN_CORNERS.map((corner) => (
          <span key={corner} className={cn("absolute size-[2em] border-emerald-400", corner)} />
        ))}
        <span className="absolute inset-x-[10%] top-[56%] h-[0.15em] rounded-full bg-emerald-400 shadow-[0_0_0.8em_#34D399]" />
      </div>

      <div className="rounded-[0.8em] bg-slate-50 p-[0.8em] ring-1 ring-black/5">
        <div className="flex items-center justify-between">
          <span className="text-[0.95em] font-bold">Quinoa Salad</span>
          <span className="text-[0.78em] font-semibold text-emerald-700">420 kcal</span>
        </div>
        <div className="mt-[0.5em] grid grid-cols-3 gap-[0.35em] text-center">
          {[
            ["Protein", "18g"],
            ["Carbs", "52g"],
            ["Fat", "14g"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[0.5em] bg-white py-[0.3em] ring-1 ring-black/5">
              <p className="text-[0.6em] text-slate-600">{label}</p>
              <p className="text-[0.8em] font-bold">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-[0.4em] rounded-[0.7em] bg-amber-50 px-[0.7em] py-[0.5em] text-[0.75em] font-semibold text-amber-800">
        <TriangleAlert className="size-[1.1em] shrink-0" />
        Sesame detected
      </div>

      <div className="mt-auto rounded-full bg-emerald-700 py-[0.6em] text-center text-[0.8em] font-bold text-white">
        Add to meal plan
      </div>
    </div>
  );
}

function SatvikPreview() {
  return (
    <PreviewCanvas
      label="SatvikAI nutrition dashboard and AI meal scanner"
      background="radial-gradient(80% 70% at 0% 0%, #CFF5E1, transparent 60%), radial-gradient(70% 70% at 100% 100%, #FDEFC3, transparent 60%), #EAF8F0"
    >
      <BrowserWindow tone="light" className="absolute left-[5%] top-[19%] w-[64%]">
        <SatvikDashboardScreen />
      </BrowserWindow>
      <PhoneFrame className="absolute right-[5%] top-[9%] w-[23%]" screenClassName="bg-white text-[#0F172A]">
        <SatvikScanScreen />
      </PhoneFrame>
    </PreviewCanvas>
  );
}

/* ─────────────────────────────────────────
   INTENTO — ILLUSTRATED UI
───────────────────────────────────────── */
const NOTES = [
  { title: "Investor call", time: "9:30" },
  { title: "Launch checklist", time: "Yesterday" },
  { title: "Design review", time: "Mon" },
];

type Priority = "High" | "Med" | "Low";

interface Task {
  title: string;
  priority: Priority;
  done?: boolean;
}

const TODAY_TASKS: Task[] = [
  { title: "Finalise pricing page", priority: "High" },
  { title: "Share roadmap with team", priority: "Med" },
  { title: "Review onboarding flow", priority: "Low", done: true },
  { title: "Reply to investor email", priority: "High" },
];

const TOMORROW_TASKS: Task[] = [
  { title: "Prep beta demo", priority: "Med" },
  { title: "Update store screenshots", priority: "Low" },
];

const PRIORITY_STYLES: Record<Priority, string> = {
  High: "bg-rose-500/15 text-rose-300",
  Med: "bg-amber-500/15 text-amber-300",
  Low: "bg-emerald-500/15 text-emerald-300",
};

function TaskRow({ task }: { task: Task }) {
  return (
    <div className="flex items-center gap-[0.6em] rounded-[0.9em] bg-white/[0.04] px-[0.8em] py-[0.7em] ring-1 ring-white/[0.06]">
      <span
        className={cn(
          "flex size-[1.2em] shrink-0 items-center justify-center rounded-full",
          task.done ? "bg-indigo-500" : "border-[0.12em] border-white/30"
        )}
      >
        {task.done && <Check className="size-[0.8em]" strokeWidth={3} />}
      </span>
      <span className={cn("min-w-0 flex-1 truncate text-[0.76em] font-medium", task.done && "text-white/60 line-through")}>
        {task.title}
      </span>
      <span className={cn("shrink-0 rounded-full px-[0.6em] py-[0.2em] text-[0.6em] font-bold", PRIORITY_STYLES[task.priority])}>
        {task.priority}
      </span>
    </div>
  );
}

function IntentoNotesScreen() {
  return (
    <div className="flex aspect-[9/18] flex-col gap-[0.75em] px-[1em] pt-[0.4em] text-[1.15em]">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[0.7em] font-medium text-indigo-300">Good morning</p>
          <p className="text-[1.5em] font-bold leading-tight">Notes</p>
        </div>
        <span className="size-[2em] rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-400" />
      </div>

      <div className="flex items-center gap-[0.5em] rounded-full bg-white/[0.06] px-[0.9em] py-[0.6em] ring-1 ring-white/10">
        <Search className="size-[0.95em] text-indigo-300" />
        <span className="text-[0.72em] text-white/50">Ask your notes anything…</span>
      </div>

      <div className="rounded-[1em] bg-gradient-to-br from-indigo-500/35 to-fuchsia-500/10 p-[0.9em] ring-1 ring-indigo-300/30">
        <div className="flex items-center gap-[0.35em] text-[0.62em] font-bold uppercase tracking-wider text-indigo-200">
          <Sparkles className="size-[1.1em]" />
          AI summary
        </div>
        <p className="mt-[0.4em] text-[1em] font-bold">Product Roadmap</p>
        <div className="mt-[0.5em] space-y-[0.35em]">
          <div className="h-[0.4em] w-full rounded-full bg-white/15" />
          <div className="h-[0.4em] w-3/4 rounded-full bg-white/15" />
        </div>
        <span className="mt-[0.7em] inline-flex rounded-full bg-indigo-400/20 px-[0.7em] py-[0.25em] text-[0.65em] font-semibold text-indigo-200">
          3 tasks extracted
        </span>
      </div>

      {NOTES.map((note) => (
        <div key={note.title} className="rounded-[0.9em] bg-white/[0.04] p-[0.8em] ring-1 ring-white/[0.06]">
          <div className="flex items-center justify-between gap-[0.5em]">
            <span className="truncate text-[0.82em] font-semibold">{note.title}</span>
            <span className="shrink-0 text-[0.62em] text-white/60">{note.time}</span>
          </div>
          <div className="mt-[0.45em] h-[0.4em] w-4/5 rounded-full bg-white/10" />
        </div>
      ))}

      <span className="mt-auto ml-auto flex size-[2.6em] items-center justify-center rounded-full bg-indigo-500 shadow-[0_0.5em_1.2em_rgba(99,102,241,0.5)]">
        <Plus className="size-[1.2em]" />
      </span>

      <div className="-mx-[1em] flex items-center justify-around border-t border-white/[0.06] pb-[1.1em] pt-[0.7em] text-white/35">
        <House className="size-[1.2em] text-indigo-300" />
        <Search className="size-[1.2em]" />
        <ListChecks className="size-[1.2em]" />
        <CircleUser className="size-[1.2em]" />
      </div>
    </div>
  );
}

function IntentoTasksScreen() {
  return (
    <div className="flex aspect-[9/18] flex-col gap-[0.65em] px-[1em] pb-[1em] pt-[0.4em] text-[1.15em]">
      <div>
        <p className="text-[0.7em] font-medium text-indigo-300">4 tasks · 2 high priority</p>
        <p className="text-[1.5em] font-bold leading-tight">Today</p>
      </div>

      <div className="flex gap-[0.4em] text-[0.65em] font-semibold">
        <span className="rounded-full bg-white px-[0.9em] py-[0.35em] text-[#1E1B4B]">All</span>
        <span className="rounded-full bg-white/[0.06] px-[0.9em] py-[0.35em] text-white/60">Priority</span>
        <span className="rounded-full bg-white/[0.06] px-[0.9em] py-[0.35em] text-white/60">Done</span>
      </div>

      {TODAY_TASKS.map((task) => (
        <TaskRow key={task.title} task={task} />
      ))}

      <p className="mt-[0.4em] text-[0.62em] font-bold uppercase tracking-wider text-white/60">Tomorrow</p>

      {TOMORROW_TASKS.map((task) => (
        <TaskRow key={task.title} task={task} />
      ))}

      <div className="mt-auto rounded-[0.9em] bg-white/[0.04] p-[0.9em] ring-1 ring-white/[0.06]">
        <div className="flex justify-between text-[0.68em]">
          <span className="text-white/60">Weekly progress</span>
          <span className="font-bold">72%</span>
        </div>
        <div className="mt-[0.5em] h-[0.45em] overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400" />
        </div>
      </div>
    </div>
  );
}

function IntentoPreview() {
  return (
    <PreviewCanvas
      label="Intento mobile app showing AI note summaries and prioritised tasks"
      background="radial-gradient(60% 60% at 15% 0%, rgba(129,140,248,0.5), transparent 70%), radial-gradient(60% 60% at 100% 100%, rgba(217,70,239,0.28), transparent 70%), #1E1B4B"
    >
      <PhoneFrame className="absolute left-[16%] top-[5%] w-[30%]" screenClassName="bg-[#0B0B1A] text-white">
        <IntentoNotesScreen />
      </PhoneFrame>
      <PhoneFrame className="absolute right-[16%] top-[10%] w-[30%]" screenClassName="bg-[#0B0B1A] text-white">
        <IntentoTasksScreen />
      </PhoneFrame>

      <span className="absolute left-[33%] top-[62%] inline-flex items-center gap-[0.5em] rounded-full bg-white px-[1em] py-[0.6em] text-[1.05em] font-semibold text-[#1E1B4B] shadow-[0_1em_2em_-0.5em_rgba(0,0,0,0.45)]">
        <Sparkles className="size-[1.1em] text-indigo-500" />
        3 tasks extracted
      </span>
    </PreviewCanvas>
  );
}

/* ─────────────────────────────────────────
   PROJECT CARD CONTENT
───────────────────────────────────────── */
const LIST_LABEL = "font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#6F6A5E]";

function ProjectDetails({ project, featured = false }: { project: Project; featured?: boolean }) {
  const featuresId = `${project.id}-features`;
  const techId = `${project.id}-tech`;

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:justify-between sm:gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
            aria-hidden="true"
            className={cn("flex size-11 shrink-0 items-center justify-center rounded-[12px]", project.logoClassName)}
          >
            {project.logo}
          </div>
          <div className="min-w-0">
            <h3
              id={`${project.id}-title`}
              className={cn(
                "font-heading font-bold leading-tight tracking-[-0.015em] text-[#111]",
                featured ? "text-[22px] sm:text-[26px]" : "text-[20px] sm:text-[22px]"
              )}
            >
              {project.name}
            </h3>
            <p className="mt-0.5 font-sans text-[13px] font-medium text-[#6B6B6B]">{project.category}</p>
          </div>
        </div>
        {project.status === "upcoming" ? (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border-[1.5px] border-[#222] bg-white px-2.5 py-1 font-sans text-[10.5px] font-bold uppercase tracking-wider text-[#111]">
            <span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-amber-500" />
            Coming soon
          </span>
        ) : (
          featured && (
            <span className="shrink-0 rounded-full border-[1.5px] border-[#222] bg-[#FFD43B] px-2.5 py-1 font-sans text-[10.5px] font-bold uppercase tracking-wider text-[#111]">
              Featured
            </span>
          )
        )}
      </div>

      <p
        className={cn(
          "mt-4 font-sans leading-[1.65] text-[#4A4A4A]",
          featured ? "text-[15px] sm:text-[16px]" : "text-[14.5px] sm:text-[15px]"
        )}
      >
        {project.summary}
      </p>

      <div className="mt-6">
        <p id={featuresId} className={LIST_LABEL}>
          {project.status === "upcoming" ? "What's included" : "What we built"}
        </p>
        <ul aria-labelledby={featuresId} className="mt-2.5 flex flex-wrap gap-2">
          {project.features.map((feature) => (
            <li
              key={feature}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#F0E3BC] bg-[#FFF8E6] px-3 py-1 font-sans text-[12.5px] font-semibold text-[#333]"
            >
              <Check className="size-3.5 shrink-0 text-[#D97706]" strokeWidth={2.75} aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <p id={techId} className={LIST_LABEL}>
          Tech stack
        </p>
        <ul aria-labelledby={techId} className="mt-2.5 flex flex-wrap gap-x-4 gap-y-2">
          {project.tech.map((tech) => (
            <li key={tech} className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[#333]">
              <span aria-hidden="true" className="inline-flex">
                <TechIcon name={tech} />
              </span>
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#EFE9DD] pt-4">
          <span className="font-sans text-[13px] font-medium text-[#6B6B6B]">
            {project.platform} · {project.year}
          </span>
          {project.links?.length ? (
            <div className="flex flex-wrap items-center gap-2">
              {project.video && (
                <VideoButton
                  video={project.video}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border-[1.5px] border-[#222] bg-[#FFD43B] px-3.5 font-sans text-[12.5px] font-semibold text-[#111] transition-colors hover:bg-[#F7CB2D]"
                >
                  <Play aria-hidden="true" className="size-3.5 fill-current" />
                  Watch video
                  <span className="sr-only">: {project.video.title}</span>
                </VideoButton>
              )}
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label}: ${project.name} (opens in a new tab)`}
                  className={cn(
                    "inline-flex h-9 items-center gap-1.5 rounded-full border-[1.5px] px-3.5 font-sans text-[12.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    link.kind === "live"
                      ? "border-[#222] bg-[#111] text-white hover:bg-primary hover:border-primary"
                      : "border-[#222] bg-white text-[#111] hover:bg-[#F5F2EB]"
                  )}
                >
                  {link.kind === "github" && <GitHubIcon className="size-3.5" />}
                  {link.label}
                  {link.kind === "live" && <ArrowUpRight aria-hidden="true" className="size-3.5" />}
                </a>
              ))}
            </div>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-sans text-[12px] font-semibold text-emerald-700">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
              Delivered
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("fill-current", className)}>
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.91c.58.1.79-.25.79-.56v-2.02c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

const CARD_BASE =
  "group overflow-hidden rounded-[28px] border-[1.5px] border-[#E6DFD1] bg-white p-3 sm:p-4 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_16px_40px_-20px_rgba(17,17,17,0.18)]";

/* ─────────────────────────────────────────
   MAIN FEATURED PROJECTS SECTION
───────────────────────────────────────── */
export function Projects() {
  const featured = PROJECTS.filter((project) => project.featured && !project.status);
  const others = PROJECTS.filter((project) => !project.featured && !project.status);
  const upcoming = PROJECTS.filter((project) => project.status === "upcoming");
  const youtube = SOCIAL_LINKS.find((social) => social.name === "YouTube")!;

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="relative w-full bg-background overflow-hidden py-20 sm:py-24"
      >
        {/* ── Background Texture ── */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.12]">
          <Image
            src="/images/hero/GWH_Background Texture.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* ── Blueprint Grid ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.025] z-0"
          aria-hidden="true"
        >
          <defs>
            <pattern id="bpGridProjects" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#2457FF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bpGridProjects)" />
        </svg>

        <Container className="relative z-10">
          {/* ── Section Header ── */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end lg:gap-14">
            <motion.div {...reveal()}>
              <Eyebrow>Featured work</Eyebrow>
              <h2 id="projects-heading" className={cn(SECTION_TITLE, "mt-5")}>
                <span className="block">Real products.</span>
                <span className="block">Real businesses.</span>
                <Highlight>Real results.</Highlight>
              </h2>
            </motion.div>

            <motion.div {...reveal(0.08)} className="lg:pb-2">
              <p className={SECTION_LEAD}>
                We&apos;ve helped founders launch production-ready digital products that are fast,
                scalable, and built for growth. Here&apos;s a look at what we&apos;ve shipped.
              </p>
              <a
                href={youtube.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-heading text-[15px] font-bold text-[#111] underline decoration-[#222]/25 decoration-2 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
              >
                <YouTubeIcon className="size-5" />
                Watch our build walkthroughs on YouTube
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </motion.div>
          </div>

          {/* ── Projects ── */}
          <div className="mt-10 lg:mt-14 grid gap-5 lg:gap-6">
            {featured.map((project, i) => {
              const flipped = i % 2 === 1;
              return (
                <motion.article
                  key={project.id}
                  {...reveal()}
                  aria-labelledby={`${project.id}-title`}
                  className={cn(
                    CARD_BASE,
                    "grid lg:gap-4",
                    flipped
                      ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]"
                      : "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]"
                  )}
                >
                  <div className={cn("h-full", flipped && "lg:order-2")}>
                    <project.Preview />
                  </div>
                  <div
                    className={cn(
                      "px-2 pb-2 pt-6 sm:px-4 sm:pb-4 lg:py-6",
                      flipped ? "lg:order-1 lg:pl-5 lg:pr-6" : "lg:pl-6 lg:pr-5"
                    )}
                  >
                    <ProjectDetails project={project} featured />
                  </div>
                </motion.article>
              );
            })}

            <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
              {others.map((project, i) => (
                <motion.article
                  key={project.id}
                  {...reveal(0.08 * (i % 2))}
                  aria-labelledby={`${project.id}-title`}
                  className={cn(CARD_BASE, "flex h-full flex-col")}
                >
                  <div className="shrink-0">
                    <project.Preview />
                  </div>
                  <div className="flex flex-1 flex-col px-2 pb-2 pt-6 sm:px-3 sm:pb-3">
                    <ProjectDetails project={project} />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* ── Upcoming templates ── */}
          {upcoming.length > 0 && (
            <div className="mt-14 lg:mt-16">
              <motion.div {...reveal()} className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className={LIST_LABEL}>Coming soon</p>
                  <h3 className="mt-2 font-heading text-[26px] font-extrabold tracking-[-0.02em] text-[#111] sm:text-[30px]">
                    Ready-made templates, launching next
                  </h3>
                </div>
              </motion.div>
              <div className="mt-6 grid gap-5 lg:gap-6">
                {upcoming.map((project) => (
                  <motion.article
                    key={project.id}
                    {...reveal()}
                    aria-labelledby={`${project.id}-title`}
                    className={cn(CARD_BASE, "grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-4")}
                  >
                    <div className="flex h-full items-center">
                      <project.Preview />
                    </div>
                    <div className="px-2 pb-2 pt-6 sm:px-4 sm:pb-4 lg:py-6 lg:pl-6 lg:pr-5">
                      <ProjectDetails project={project} featured />
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          )}

          {/* ── Closing CTA ── */}
          <motion.div
            {...reveal()}
            className="relative mt-10 lg:mt-14 overflow-hidden rounded-[28px] border-[1.5px] border-[#222] bg-[#111] px-6 py-9 sm:px-10 sm:py-11"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/40 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-28 left-1/3 size-60 rounded-full bg-[#FFD43B]/15 blur-3xl"
            />

            <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#FFD43B]">
                  Your product could be next
                </p>
                <h3 className="mt-2 font-heading text-[26px] sm:text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white">
                  Have an idea worth building?
                </h3>
                <p className="mt-3 font-sans text-[14.5px] sm:text-[15px] leading-[1.65] text-white/70">
                  Book a free 30-minute strategy session. Most MVPs go from brief to launch in <span className="whitespace-nowrap">2–4 weeks</span>.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
                <Link
                  href="#contact"
                  className="group/cta inline-flex h-[50px] items-center justify-center gap-2 rounded-xl border-[1.5px] border-[#FFD43B] bg-[#FFD43B] px-6 font-heading text-[14.5px] font-bold text-[#111] transition-all hover:-translate-y-0.5 hover:bg-[#F7CB2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
                >
                  Start your project
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
                </Link>
                <Link
                  href="#process"
                  className="inline-flex h-[50px] items-center justify-center rounded-xl border-[1.5px] border-white/25 px-6 font-heading text-[14.5px] font-bold text-white transition-colors hover:border-white/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
                >
                  See how we work
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </MotionConfig>
  );
}
