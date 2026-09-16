"use client";

import * as React from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Respect users who ask the OS for less motion: keep native scrolling.
    const lenis = reduceMotion
      ? null
      : new Lenis({
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          autoRaf: true,
          // Leave open dialogs (video player) to native handling; globals.css locks page scroll.
          prevent: (node) => node.nodeName === "DIALOG" || !!node.closest?.("dialog"),
        });

    // Same-page hash links (e.g. "/#contact" while on "/") are handled here, in the capture
    // phase, so Next.js navigation and the smooth scroller don't both try to scroll.
    // Both Lenis and scrollIntoView honour `scroll-padding-top` (navbar clearance in globals.css).
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank") return;

      const url = new URL(anchor.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      // Let React onClick handlers (menu close, service pre-select) still run.
      queueMicrotask(() => {
        if (url.hash !== location.hash) history.pushState(null, "", url.hash);
        if (lenis) {
          // Sync with any native scroll Lenis hasn't observed yet (same-frame programmatic
          // scroll, find-in-page), mirroring Lenis's own onNativeScroll handling.
          if (!lenis.isScrolling || lenis.isScrolling === "native") {
            lenis.animatedScroll = lenis.targetScroll = lenis.actualScroll;
          }
          lenis.scrollTo(target);
        } else {
          target.scrollIntoView({ block: "start" });
        }
      });
    };

    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
