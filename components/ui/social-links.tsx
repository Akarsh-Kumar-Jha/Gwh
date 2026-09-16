import { SOCIAL_LINKS, type SocialName } from "@/lib/site";
import { cn } from "@/lib/utils";

export function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("shrink-0", className)}>
      <path
        fill="#FF0000"
        d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z"
      />
      <path fill="#fff" d="m9.6 15.6 6.3-3.6-6.3-3.6v7.2Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("shrink-0", className)}>
      {/* Solid brand colour: a gradient would need a unique <defs> id per instance */}
      <rect width="24" height="24" rx="6" fill="#E1306C" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.1" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="16.3" cy="7.7" r="1" fill="#fff" />
    </svg>
  );
}

const ICONS: Record<SocialName, typeof YouTubeIcon> = {
  YouTube: YouTubeIcon,
  Instagram: InstagramIcon,
};

/** YouTube and Instagram links, shown as labelled pills. */
export function SocialLinks({
  className,
  showHandle = false,
  tone = "light",
}: {
  className?: string;
  showHandle?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {SOCIAL_LINKS.map((social) => {
        const Icon = ICONS[social.name];
        return (
          <li key={social.name}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.name}: ${social.handle} (opens in a new tab)`}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-full border px-3.5 font-sans text-[14px] font-semibold transition-colors",
                tone === "light"
                  ? "border-[#222]/15 bg-white text-[#111] hover:border-[#222]"
                  : "border-white/15 bg-white/5 text-white hover:border-white/40"
              )}
            >
              <Icon className="size-[18px]" />
              {showHandle ? social.handle : social.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
