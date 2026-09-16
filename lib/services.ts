/**
 * Single source of truth for the services we offer. The Services section
 * renders these cards and the contact form uses the same values and labels,
 * so the two can never drift apart.
 */
export const SERVICE_VALUES = ["website", "app", "saas", "ai", "automation", "other"] as const;

export type ServiceValue = (typeof SERVICE_VALUES)[number];

export interface Service {
  value: ServiceValue;
  /** Short label used in the contact form dropdown */
  label: string;
  title: string;
  summary: string;
  deliverables: string[];
  cta: string;
}

export const SERVICES: Service[] = [
  {
    value: "website",
    label: "Website",
    title: "Website Development",
    summary:
      "Fast, SEO-ready business websites and landing pages that look sharp on every screen and turn visitors into enquiries.",
    deliverables: ["Business & marketing sites", "Landing pages", "SEO & Core Web Vitals"],
    cta: "Plan my website",
  },
  {
    value: "app",
    label: "App",
    title: "App Development",
    summary:
      "Web apps and iOS & Android apps with secure sign-in, real-time features and interfaces people enjoy using.",
    deliverables: ["Web apps & dashboards", "iOS & Android apps", "Real-time features"],
    cta: "Plan my app",
  },
  {
    value: "saas",
    label: "SaaS Platform",
    title: "SaaS Platforms",
    summary:
      "Multi-user products with accounts, roles and admin panels, built on an architecture that scales as you grow.",
    deliverables: ["Accounts & user roles", "Admin panels", "Analytics & reporting"],
    cta: "Plan my SaaS",
  },
  {
    value: "ai",
    label: "AI Solution",
    title: "AI Solutions",
    summary:
      "AI features that do real work: assistants, image and document analysis, and smart search built into your product.",
    deliverables: ["AI assistants & chat", "Image & document analysis", "Smart search"],
    cta: "Plan my AI feature",
  },
  {
    value: "automation",
    label: "Automation",
    title: "Automation & Integrations",
    summary:
      "Connect the tools you already use and remove repetitive manual work with reliable workflows and APIs.",
    deliverables: ["Workflow automation", "API integrations", "CRM, email & payments"],
    cta: "Plan my automation",
  },
  {
    value: "other",
    label: "Other",
    title: "Something Else?",
    summary:
      "Have an idea that doesn't fit a box? Tell us what you're trying to achieve and we'll suggest the right approach.",
    deliverables: ["Custom software", "Technical consulting", "Product strategy"],
    cta: "Tell us your idea",
  },
];

export const SERVICE_SELECT_EVENT = "gwh:select-service";

/** Pre-selects a service in the contact form (listened to by the CTA section). */
export function selectService(value: ServiceValue) {
  window.dispatchEvent(new CustomEvent<ServiceValue>(SERVICE_SELECT_EVENT, { detail: value }));
}
