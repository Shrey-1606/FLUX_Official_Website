"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { useLabs } from "@/context/LabsContext"; // Added

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleOpen } = useLabs(); // Access the window trigger

  const closeMenu = () => setIsOpen(false);

  // Custom handler for Flux Labs to open window and close menu
  const handleLabsClick = (e) => {
    e.preventDefault(); // Stop navigation
    toggleOpen();       // Open the OS window
    closeMenu();        // Close the navbar overlay
  };

  return (
    <>
      <div className={`${styles.navTrigger} ${isOpen ? styles.hidden : ""}`}>
        <button
          className={`${styles.btn} ${styles.btnThree}`}
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation menu"
          type="button"
        >
          <span>Navigate</span>
        </button>
      </div>

      <div
        className={`${styles.overlay} ${isOpen ? styles.active : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
      >
        <div className={styles.menu}>
          <button
            className={styles.closeBtn}
            onClick={closeMenu}
            aria-label="Close navigation menu"
            type="button"
          >
            ✕
          </button>

          <div className={styles.brand}>
            <Image
              src="/icons/flux_logo.png"
              alt="IEEE Logo"
              width={220}
              height={80}
              draggable={false}
              priority
            />
          </div>

          <div className={styles.navLinks}>
            <Link href="/" onClick={closeMenu}>Home</Link>
            <Link href="/about" onClick={closeMenu}>About Us</Link>
            <Link href="/contact" onClick={closeMenu}>Contact Us</Link>
            
            <Link href="#" onClick={handleLabsClick}>Flux Labs</Link>
            
            <Link href="/events" onClick={closeMenu}>Events</Link>
          </div>

          <div className={styles.leadership}>
            <div className={styles.leadHeader}>Leadership</div>

            <div className={styles.leadCard}>
              <Image
                src="/images/shrey.png"
                alt="Shreyansh"
                width={60}
                height={60}
                draggable={false}
              />
              <div className={styles.cardInfo}>
                <h3>Shreyansh Upadhyaya</h3>
                <span>Chair</span>
              </div>
            </div>

            <div className={styles.leadCard}>
              <Image
                src="/images/sammy.png"
                alt="Sammy"
                width={60}
                height={60}
                draggable={false}
              />
              <div className={styles.cardInfo}>
                <h3>Sanmitra Patil</h3>
                <span>Chair</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}