"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";
import { onSiteReady } from "@/lib/siteReady";

/**
 * Left half of the circuit, drawn in a 1600x700 box with the centre at x=800.
 * Every wire starts far off-screen (x = START_X) so parallax / `slice`
 * cropping can never reveal a wire's tail end, and runs inward to the middle.
 * The right half is the same set mirrored.
 *
 * Only 4 wires per side, and the ones that cross the bottom-left / bottom-right
 * text blocks or run straight through the middle of the wordmark are gone.
 */
const START_X = -700;
const END_X = 720;

const WIRES = [
  "M-700 206 H368 L420 258 H572 L610 296 H720",
  "M-700 292 H186 L210 316 H470 L500 336 H720",
  "M-700 438 H360 L400 398 H566 L600 364 H720",
  "M-700 594 H290 L330 554 H420 L480 494 H600 L690 404 H720",
];

// The pulse travels along the same shapes but starts just past the screen
// edge, so the bright spark is visible for its whole trip instead of spending
// half of it off-screen.
const PULSE_WIRES = WIRES.map((d) => d.replace("M-700", "M-60"));

// solder dots (left half): one per wire, same index as WIRES, sitting on a corner
const DOTS: [number, number][] = [
  [330, 206],
  [470, 316],
  [360, 438],
  [290, 594],
];

/**
 * Intro timeline (seconds):
 *   0.2 - 1.6   FLUX fades in            (see .word in the CSS)
 *   1.8 +       wires start emerging from the screen edges, one after another
 *   ~6          wires done, current pulses begin
 */
const WIRE_START = 1.8;
const WIRE_STAGGER = 0.15;
const WIRE_DUR = 3.6;

type Pulse = { i: number; n: number };

// One independent pulse scheduler per side, so left and right never sync.
// First pulses wait until the wires have finished drawing.
function usePulse(firstMin: number, firstMax: number) {
  const [pulse, setPulse] = useState<Pulse | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setTimeout>;
    let last = -1;
    let n = 0;

    const fire = () => {
      let i = Math.floor(Math.random() * WIRES.length);
      if (i === last) i = (i + 1) % WIRES.length;
      last = i;
      setPulse({ i, n: ++n });
      timer = setTimeout(fire, 3500 + Math.random() * 4500);
    };

    // the clock only starts once the preloader is gone
    const stop = onSiteReady(() => {
      timer = setTimeout(fire, firstMin + Math.random() * (firstMax - firstMin));
    });
    return () => {
      stop();
      clearTimeout(timer);
    };
  }, [firstMin, firstMax]);

  return pulse;
}

function Half({ pulse }: { pulse: Pulse | null }) {
  return (
    <>
      {WIRES.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          className={styles.wire}
          style={{
            animationDuration: `${WIRE_DUR}s`,
            animationDelay: `${WIRE_START + i * WIRE_STAGGER}s`,
          }}
        />
      ))}
      {DOTS.map(([x, y], i) => {
        // appear at the moment the wire's tip reaches the dot
        const frac = (x - START_X) / (END_X - START_X);
        const base = WIRE_START + i * WIRE_STAGGER;
        return (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="6"
            fill="url(#fluxWire)"
            stroke="none"
            className={styles.dot}
            style={{
              animationDelay: `max(${base}s, calc(${base}s + ${WIRE_DUR}s * (${frac} - var(--skip)) / (1 - var(--skip))))`,
            }}
          />
        );
      })}
      {pulse && (
        <path
          key={pulse.n}
          d={PULSE_WIRES[pulse.i]}
          pathLength={1}
          stroke="url(#fluxPulse)"
          className={styles.pulse}
        />
      )}
    </>
  );
}

function Wires({ pulseL, pulseR }: { pulseL: Pulse | null; pulseR: Pulse | null }) {
  return (
    <g fill="none" stroke="url(#fluxWire)" strokeWidth="2.5" strokeLinejoin="round">
      <Half pulse={pulseL} />
      <g transform="translate(1600 0) scale(-1 1)">
        <Half pulse={pulseR} />
      </g>
    </g>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  // wires are done at ~6s, so the first pulses come right after that
  const pulseL = usePulse(5500, 7000);
  const pulseR = usePulse(6500, 8500);

  // --skip = fraction of each wire that is off-screen at the start.
  // The draw animation jumps past it, so the wires visibly emerge from the
  // screen edge immediately instead of spending seconds drawing off-screen.
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();
      const aspect = r.width / r.height;
      // width of the viewBox that is visible with preserveAspectRatio="slice"
      const visibleW = aspect >= 1600 / 700 ? 1600 : 700 * aspect;
      const visibleLeft = 800 - visibleW / 2;
      // margin for the parallax shift, then convert x -> fraction of path
      const skip = ((visibleLeft - 60 - START_X) / (END_X - START_X)) * 0.95;
      el.style.setProperty("--skip", Math.min(Math.max(skip, 0), 0.8).toFixed(3));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Parallax: pointer + scroll feed CSS variables, so React never re-renders.
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;

    const frame = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--mx", cx.toFixed(3));
      el.style.setProperty("--my", cy.toFixed(3));
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(frame) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      kick();
    };
    const onLeave = () => {
      tx = ty = 0;
      kick();
    };
    const onScroll = () => {
      el.style.setProperty("--sy", String(Math.min(window.scrollY, window.innerHeight * 1.2)));
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="home" ref={root} className={styles.hero}>
      <div className={`${styles.layer} ${styles.glow}`} aria-hidden />

      {/* back wires: larger, dimmer, slower. Placed BEFORE the wordmark so they pass behind it */}
      <svg className={`${styles.layer} ${styles.wiresBack}`} viewBox="0 0 1600 700" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          {/* wires fade out linearly as they approach the centre (x = 720),
              so the wordmark and text stay readable. Fully opaque from x = 120 outwards. */}
          <linearGradient id="fluxWire" gradientUnits="userSpaceOnUse" x1="720" y1="0" x2="120" y2="0">
            <stop offset="0" stopColor="#fff3c4" stopOpacity="0.04" />
            <stop offset="1" stopColor="#ffc400" stopOpacity="1" />
          </linearGradient>
          {/* the travelling pulse fades the same way, just a bit less */}
          <linearGradient id="fluxPulse" gradientUnits="userSpaceOnUse" x1="720" y1="0" x2="120" y2="0">
            <stop offset="0" stopColor="#fff7d6" stopOpacity="0.12" />
            <stop offset="1" stopColor="#fff7d6" stopOpacity="1" />
          </linearGradient>
        </defs>
        <g className={styles.backScale}>
          <Wires pulseL={null} pulseR={null} />
        </g>
      </svg>

      <h1 className={`${styles.layer} ${styles.word}`}>
        <span className={styles.glitch}>FLUX</span>
      </h1>

      {/* front wires: crisp, faster, drawn over the wordmark */}
      <svg className={`${styles.layer} ${styles.wiresFront}`} viewBox="0 0 1600 700" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <Wires pulseL={pulseL} pulseR={pulseR} />
      </svg>

      <div className={`${styles.layer} ${styles.left}`}>
        <p>
          Build apps.
          <br />
          Learn React.
          <br />
          Ship ideas.
        </p>
      </div>

      <div className={`${styles.layer} ${styles.right}`}>
        <p>
          A college app development club.
          <br />
          React, React Native
          <br />& real-world products.
        </p>
      </div>
    </section>
  );
}
