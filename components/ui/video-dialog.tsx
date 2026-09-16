"use client";

import * as React from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface YouTubeVideo {
  id: string;
  title: string;
  /** Local poster image (a copy of the YouTube thumbnail), 1280×720 */
  poster: string;
  /** Human readable length, e.g. "34 min" */
  duration?: string;
}

/**
 * Plays a YouTube video in a native modal <dialog> (focus trap, Escape to close and
 * focus restore come from the browser). Nothing is loaded from YouTube until it opens.
 */
function VideoDialog({ video, open, onClose }: { video: YouTubeVideo; open: boolean; onClose: () => void }) {
  const ref = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={video.title}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="m-auto w-[min(calc(100vw-32px),1100px)] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
    >
      {open && (
        <div className="relative">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="line-clamp-1 font-heading text-[15px] font-bold text-white sm:text-[17px]">{video.title}</p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#111] transition-colors hover:bg-[#FFD43B]"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
          <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="size-full"
            />
          </div>
        </div>
      )}
    </dialog>
  );
}

/** Button that opens the video dialog. */
export function VideoButton({
  video,
  className,
  children,
}: {
  video: YouTubeVideo;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className} aria-haspopup="dialog">
        {children}
      </button>
      <VideoDialog video={video} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

/** Large clickable poster with a play button; opens the video dialog. */
export function VideoPoster({
  video,
  className,
  sizes,
}: {
  video: YouTubeVideo;
  className?: string;
  sizes: string;
}) {
  return (
    <VideoButton
      video={video}
      className={cn(
        "group/poster relative block aspect-video w-full overflow-hidden rounded-[20px] bg-black text-left",
        className
      )}
    >
      <Image
        src={video.poster}
        alt=""
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover/poster:scale-[1.03]"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-white text-[#111] shadow-[0_10px_30px_rgba(0,0,0,0.4)] ring-8 ring-white/25 transition-transform duration-300 group-hover/poster:scale-110 sm:size-20">
          <Play aria-hidden="true" className="ml-1 size-7 fill-current sm:size-8" />
        </span>
      </span>
      <span className="sr-only">Play video: {video.title}</span>
      <span aria-hidden="true" className="absolute inset-x-3 bottom-3 flex items-center justify-end gap-3 sm:inset-x-5 sm:bottom-5 sm:justify-between">
        {/* The thumbnail already carries the title artwork, so only a short label is shown */}
        <span className="hidden rounded-full bg-black/60 px-3 py-1.5 font-sans text-[13px] font-semibold text-white sm:inline">
          Watch the walkthrough
        </span>
        {video.duration && (
          <span className="shrink-0 rounded-full bg-black/60 px-2.5 py-1 font-sans text-[12px] font-semibold text-white">
            {video.duration}
          </span>
        )}
      </span>
    </VideoButton>
  );
}
