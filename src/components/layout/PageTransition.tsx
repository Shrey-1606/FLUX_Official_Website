"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./PageTransition.module.css";

const COVER_MS = 150; // how long the old page takes to fade out
const FAILSAFE_MS = 3000; // never stay covered if a navigation never finishes

/**
 * Route transitions.
 *
 *  - Leaving: a click on an internal link first fades the current page out
 *    very quickly (a dark layer fades in), then the navigation happens.
 *  - Arriving: when the new route is in, the layer fades away while its
 *    backdrop blur sharpens, so the new page "comes into focus".
 *
 * It is one fixed layer under the navbar and never touches the page's own
 * markup, so fixed backgrounds / the dock keep working. Flux Labs is a
 * floating window (no route change, hash link), so it is never affected.
 */
export default function PageTransition() {
  const overlay = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const leaving = useRef(false);
  const failsafe = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // New route arrived -> focus in
  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    const el = overlay.current;
    if (!el) return;
    clearTimeout(failsafe.current);
    leaving.current = false;
    el.classList.remove(styles.cover);
    el.classList.add(styles.reveal);
  }, [pathname]);

  // Clicking an internal link -> quick fade out, then navigate
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;

      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname.startsWith("/labs")) return; // Flux Labs: no transition
      if (url.pathname === window.location.pathname && url.search === window.location.search) return; // same page / #hash

      e.preventDefault(); // Next's <Link> sees this and skips its own navigation
      if (leaving.current) return;
      leaving.current = true;

      const el = overlay.current;
      el?.classList.remove(styles.reveal);
      el?.classList.add(styles.cover);

      setTimeout(() => router.push(url.pathname + url.search + url.hash), COVER_MS);
      failsafe.current = setTimeout(() => {
        leaving.current = false;
        el?.classList.remove(styles.cover);
      }, FAILSAFE_MS);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return (
    <div
      ref={overlay}
      className={styles.overlay}
      aria-hidden
      onAnimationEnd={(e) => e.currentTarget.classList.remove(styles.reveal)}
    />
  );
}
