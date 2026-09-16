import { MapPinned, Smartphone } from "lucide-react";

/* ─────────────────────────────────────────
   TECH STACK ICONS
───────────────────────────────────────── */
export function TechIcon({ name }: { name: string }) {
  switch (name) {
    case "Next.js":
      return (
        <span className="w-4 h-4 rounded-full bg-black flex items-center justify-center text-white shrink-0">
          <svg viewBox="0 0 180 180" className="w-2.5 h-2.5 fill-current">
            <path d="M140 160L60 60V160H40V20H60L140 120V20H160V160H140Z" />
          </svg>
        </span>
      );
    case "Prisma":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#2D3748] shrink-0">
          <path d="M22.5 16.5L12 1.5L1.5 16.5L6 22.5H18L22.5 16.5ZM12 4.5L19.5 15H15L12 9L9 15H4.5L12 4.5Z" />
        </svg>
      );
    case "Supabase":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#3ECF8E] shrink-0">
          <path d="M13.35 24v-9.52h7.83c.73 0 1.13-.85.67-1.42L9.65 0v9.52H1.82c-.73 0-1.13.85-.67 1.42L13.35 24z" />
        </svg>
      );
    case "Tailwind":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#38BDF8] shrink-0">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C3.666 17.818 5.027 19.2 8.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C6.336 13.382 4.975 12 2.001 12z" />
        </svg>
      );
    case "React":
    case "React Native":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-[#149ECA] shrink-0" strokeWidth="2">
          <ellipse cx="12" cy="12" rx="9" ry="3.5" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="#149ECA" />
        </svg>
      );
    case "Node.js":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#5FA04E] shrink-0">
          <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm0 2.3l7.5 4.1v7.2L12 19.7l-7.5-4.1V8.4L12 4.3z" />
        </svg>
      );
    case "MongoDB":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#47A248] shrink-0">
          <path d="M12 1.5s-7 7.5-7 13.5c0 3.86 3.14 7 7 7s7-3.14 7-7c0-6-7-13.5-7-13.5zm0 18c-2.48 0-4.5-2.02-4.5-4.5 0-3.3 3.3-8.1 4.5-9.7 1.2 1.6 4.5 6.4 4.5 9.7 0 2.48-2.02 4.5-4.5 4.5z" />
        </svg>
      );
    case "Gemini AI":
    case "Gemini":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#1A73E8] shrink-0">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      );
    case "Expo":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-black shrink-0">
          <path d="M12 2L1 21h22L12 2zm0 4.5l7.5 13h-15L12 6.5z" />
        </svg>
      );
    case "Firebase":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
          <path fill="#FFA000" d="M5 19 8.2 3.2c.1-.5.8-.6 1-.1L12 8.5 5 19Z" />
          <path fill="#F57C00" d="M13.4 10.3 12 7.6 5 19l8.4-8.7Z" />
          <path fill="#FFCA28" d="m5 19 11.6-13c.3-.4 1-.2 1 .3L19 19l-6.1 3.4a1.8 1.8 0 0 1-1.8 0L5 19Z" />
        </svg>
      );
    case "OpenStreetMap":
      return <MapPinned className="w-4 h-4 text-[#7EBC6F] shrink-0" strokeWidth={2.2} />;
    case "PWA":
      return <Smartphone className="w-4 h-4 text-[#5A0FC8] shrink-0" strokeWidth={2.2} />;
    case "Socket.io":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
          <circle cx="12" cy="12" r="9.5" stroke="#111" strokeWidth="2" />
          <path d="M13.6 5.5 8 13h3.6l-1.2 5.5L16 11h-3.6l1.2-5.5Z" fill="#111" />
        </svg>
      );
    case "TypeScript":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
          <rect width="24" height="24" rx="3" fill="#3178C6" />
          <path
            fill="#fff"
            d="M13.2 12.6h-2.4V20H9v-7.4H6.6V11h6.6v1.6Zm.9 6.8v-1.9c.36.3.76.52 1.2.67.44.15.88.22 1.33.22.26 0 .49-.02.68-.07.2-.05.36-.11.49-.2a.8.8 0 0 0 .29-.3.8.8 0 0 0-.06-.85 1.4 1.4 0 0 0-.38-.35 4 4 0 0 0-.58-.31l-.72-.3c-.66-.28-1.16-.62-1.48-1.02-.33-.4-.49-.89-.49-1.46 0-.44.09-.83.27-1.15.18-.32.42-.58.72-.79.3-.2.66-.36 1.06-.46.4-.1.83-.14 1.28-.14.44 0 .83.03 1.17.08.34.05.66.14.95.25v1.8a3 3 0 0 0-.47-.26 3.7 3.7 0 0 0-1.03-.3 3.4 3.4 0 0 0-.52-.03c-.23 0-.44.02-.63.07-.19.04-.35.1-.48.19a.9.9 0 0 0-.3.28.7.7 0 0 0-.11.39c0 .15.04.28.12.4.08.12.19.23.34.33.15.1.33.2.54.3l.72.31c.35.15.66.3.94.47.28.17.52.35.72.56.2.21.35.44.46.71.1.27.16.58.16.93 0 .48-.1.89-.28 1.22-.18.33-.43.59-.74.8-.31.2-.68.34-1.09.43-.42.08-.86.12-1.32.12-.47 0-.92-.04-1.35-.12a4 4 0 0 1-1.1-.36Z"
          />
        </svg>
      );
    case "Framer Motion":
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#BB4B96] shrink-0">
          <path d="M5 2h14v7h-7L5 2Zm0 7h7l7 7h-7v6l-7-7V9Z" />
        </svg>
      );
    default:
      return <span className="w-2 h-2 rounded-full bg-primary" />;
  }
}
