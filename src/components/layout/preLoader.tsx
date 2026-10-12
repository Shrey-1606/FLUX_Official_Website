"use client";

import { useEffect, useState } from "react";
import styles from "./preLoader.module.css";
import { markSiteReady } from "@/lib/siteReady";

export default function PreLoader() {
  const [show, setShow] = useState(false);
  const [exit, setExit] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const navEntry = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;

    const isReload = navEntry?.type === "reload";
    const seen = sessionStorage.getItem("flux-preloader-seen");

    if (seen && !isReload) {
      markSiteReady(); // no preloader this time, let the page animate straight away
      return;
    }

    // --- SCROLL LOCK LOGIC START ---
    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const preventKeyScroll = (e: KeyboardEvent) => {
      const keys = ["ArrowUp", "ArrowDown", "Space", "PageUp", "PageDown", "Home", "End"];
      if (keys.includes(e.code)) {
        e.preventDefault();
        return false;
      }
    };

    // Block all input types that cause scrolling
    const lockScroll = () => {
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("keydown", preventKeyScroll, { passive: false });
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };

    const unlockScroll = () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeyScroll);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };

    lockScroll();
    // --- SCROLL LOCK LOGIC END ---

    setShow(true);
    sessionStorage.setItem("flux-preloader-seen", "true");

    const startTime = performance.now();
    const duration = 2200;
    let animationFrame: number;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);

      setProgress(Math.floor(easedProgress * 100));

      if (rawProgress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        setTimeout(() => setExit(true), 300);
        setTimeout(() => {
          setShow(false);
          unlockScroll(); // Release the locks only when preloader is gone
          markSiteReady(); // page animations start now
        }, 950);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      unlockScroll(); // Cleanup
    };
  }, []);

  if (!show) return null;

  return (
    <div data-preloader className={`${styles.preloader} ${exit ? styles.exit : ""}`}>
      <div className={styles.logoWrap}>
        <img src="/icons/flux_logo.png" alt="Flux Logo" draggable={false} />
      </div>

      <div className={styles.loaderBar}>
        <div className={styles.progress} style={{ width: `${progress}%` }} />
      </div>

      <p className={styles.percentage}>{progress}%</p>
    </div>
  );
}