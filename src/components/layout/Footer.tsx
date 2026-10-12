"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        
        <div className={styles.logoGroup}>
          <img src="/icons/flux_logo.png" alt="Logo 1" />
          <img src="/icons/logoPesu.png" alt="Logo 2" />
        </div>

        <div className={styles.center}>
          <h2 className={styles.logo}>FLUX</h2>
          <p className={styles.tagline}>
            Build Apps. Learn React. Ship Ideas.
          </p>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Flux Labs • All Rights Reserved
          </p>
        </div>

        <div className={styles.socials}>
          
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11.5 19h-3v-9h3v9zm-1.5-10.3c-1 0-1.7-.7-1.7-1.7s.7-1.7 1.7-1.7 1.7.7 1.7 1.7-.7 1.7-1.7 1.7zm13 10.3h-3v-4.7c0-1.1 0-2.5-1.6-2.5s-1.8 1.2-1.8 2.4v4.8h-3v-9h2.9v1.2h.1c.4-.8 1.4-1.6 2.8-1.6 3 0 3.6 2 3.6 4.6v4.8z" />
            </svg>
          </a>

          <a href="https://github.com" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5c-6.6 0-12 5.4-12 12 0 5.3 3.4 9.8 8.2 11.4.6.1.8-.2.8-.6v-2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.9 1.3 3.6 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.6-1.3-5.6-6 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11.1 11.1 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.7-2.9 5.7-5.7 6 .4.4.8 1.1.8 2.2v3.2c0 .4.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4 0-6.6-5.4-12-12-12z" />
            </svg>
          </a>

          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 2c-2.8 0-5 2.2-5 5v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5v-10c0-2.8-2.2-5-5-5h-10zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3h-10c-1.7 0-3-1.3-3-3v-10c0-1.7 1.3-3 3-3zm5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2.2a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6zm4.8-.9a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" />
            </svg>
          </a>

        </div>
      </div>
    </footer>
  );
}