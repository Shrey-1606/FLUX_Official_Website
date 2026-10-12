/**
 * "Site ready" signal.
 *
 * While the preloader is on screen, <html> carries a `data-preloading`
 * attribute (set by the inline script in layout.tsx before first paint).
 * globals.css pauses every CSS animation on the page while it is present, and
 * JS timers that should wait (like the Hero pulses) use onSiteReady().
 * The preloader calls markSiteReady() when it has fully gone.
 */
export const READY_EVENT = "flux:ready";

export function markSiteReady() {
  document.documentElement.removeAttribute("data-preloading");
  window.dispatchEvent(new Event(READY_EVENT));
}

/** Runs cb once the preloader is done (immediately if there is none). Returns a cleanup. */
export function onSiteReady(cb: () => void) {
  if (!document.documentElement.hasAttribute("data-preloading")) {
    cb();
    return () => {};
  }
  window.addEventListener(READY_EVENT, cb, { once: true });
  return () => window.removeEventListener(READY_EVENT, cb);
}
