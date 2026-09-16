export const SITE = {
  name: "Grow With Hustler",
  url: "https://www.growwithhustler.in",
  email: "growwithhustler@gmail.com",
  tagline: "We build software that grows businesses.",
  description:
    "Grow With Hustler is a product development agency building websites, web and mobile apps, SaaS platforms, AI solutions and automations for founders and growing businesses.",
} as const;

export const SOCIAL_LINKS = [
  { name: "YouTube", handle: "@grow.with.hustler", href: "https://www.youtube.com/@grow.with.hustler" },
  { name: "Instagram", handle: "@growwithhustler.in", href: "https://www.instagram.com/growwithhustler.in/" },
] as const;

export type SocialName = (typeof SOCIAL_LINKS)[number]["name"];

export const NAV_ITEMS = [
  { name: "Services", href: "/#services", section: "services" },
  { name: "Projects", href: "/#projects", section: "projects" },
  { name: "Process", href: "/#process", section: "process" },
  { name: "Testimonials", href: "/#testimonials", section: "testimonials" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/#contact", section: "contact" },
] as const;
