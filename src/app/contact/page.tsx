"use client";

import { FormEvent } from "react";
import Topography from "@/components/reactbits/Topography";
import styles from "./contact.module.css";

export default function ContactPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const clubEmail = "fluxlabs@pes.edu";
    const mailSubject = encodeURIComponent(subject);
    const mailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${clubEmail}?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <main className={styles.contactPage}>
      <div className={styles.auroraBg}>
	  <Topography
	    lowColor="#EAB308"
	    midColor="#EAB308"
	    highColor="#FFFFFF"
	    speed={0.25}
	    morphAmount={2}
	    morphSpeed={0.05}
	    bands={2.5}
	    thickness={0.01}
	    scale={1.8}
	    pixelSize={1}
	    glow={0.5}
	    colorMode="elevation"
	    contrast={3}
	    brightness={1}
	    fillBands={false}
	    opacity={1}
	    grain
	    grainIntensity={0}
	    mouseInteraction
	    mouseRadius={0.3}
	    mouseStrength={0.5}
  	/>
      </div>

      <section className={styles.contactCard}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Contact Flux</p>

          <h1>Let&apos;s Build Something Together.</h1>

          <p className={styles.description}>
            Have a question, collaboration idea, event proposal, or want to join
            Flux Labs? Fill out the form and your mail app will open with
            everything drafted.
          </p>

          <div className={styles.emailNote}>
            <span>Club Email</span>
            <a href="mailto:fluxlabs@pes.edu">fluxlabs@pes.edu</a>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <input type="text" name="name" placeholder="Your name" required />

            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
            />
          </div>

          <input type="text" name="subject" placeholder="Subject" required />

          <textarea
            name="message"
            placeholder="Tell us what you want to discuss..."
            rows={6}
            required
          />

          <button type="submit">Send Message</button>
        </form>
      </section>
    </main>
  );
}
