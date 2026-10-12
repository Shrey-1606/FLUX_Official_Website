"use client";

import { useEffect, useState } from "react";
import Aurora from "@/components/reactbits/Aurora";
import styles from "./events.module.css";

const upcomingEvents = [
  {
    title: "Full Stack App Development Workshop",
    date: "Coming Soon",
    type: "Workshop",
    description:
      "A beginner-friendly session introducing React Native, components, styling, navigation, and deployment basics.",
  },
  {
    title: "Android App Development Hackathon",
    date: "Coming Soon",
    type: "Hackathon",
    description:
      "An Android/iOS App Development Hackathon with multiple given tracks, Compete and Conquer.",
  },
  {
    title: "Flux Labs Project Sprint",
    date: "Starting soon",
    type: "Build Sprint",
    description:
      "A hands-on project sprint where members work in teams to ship real app prototypes.",
  },
];


export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] =
    useState<(typeof pastEvents)[number] | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  // 🔥 NEW: force re-render for animation
  const [imageKey, setImageKey] = useState(0);

  const openGallery = (event: (typeof pastEvents)[number]) => {
    setSelectedEvent(event);
    setActiveImage(0);
    setImageKey((prev) => prev + 1);
  };

  const closeGallery = () => {
    setSelectedEvent(null);
    setActiveImage(0);
  };

  const nextImage = () => {
    if (!selectedEvent) return;

    setActiveImage((prev) =>
      prev === selectedEvent.images.length - 1 ? 0 : prev + 1
    );

    setImageKey((prev) => prev + 1);
  };

  const prevImage = () => {
    if (!selectedEvent) return;

    setActiveImage((prev) =>
      prev === 0 ? selectedEvent.images.length - 1 : prev - 1
    );

    setImageKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (!selectedEvent) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEvent]);

  return (
    <main className={styles.eventsPage}>
      <div className={styles.auroraBg}>
        <Aurora
          colorStops={["#ffffff", "#ffc400", "#ff9500"]}
          blend={0.45}
          amplitude={1}
          speed={0.45}
        />
      </div>

      {/* UPCOMING (unchanged) */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>{/*What&apos;s Next*/}</p>
          <h2>Upcoming Events</h2>
        </div>

        <div className={styles.upcomingGrid}>
          {upcomingEvents.map((event) => (
            <article className={styles.upcomingCard} key={event.title}>
              <div className={styles.cardTop}>
                <span>{event.type}</span>
                <p>{event.date}</p>
              </div>

              <div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PAST EVENTS (write past events here)*/}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}></p> {/*Write archive here*/}
          <h2></h2>
        </div>

        <div className={styles.pastGrid}>
          {pastEvents.map((event) => (
            <button
              key={event.title}
              type="button"
              className={styles.pastCard}
              onClick={() => openGallery(event)}
            >
              <div className={styles.coverWrap}>
                <img src={event.cover} alt={event.title} />
              </div>

              <div className={styles.pastContent}>
                <span>{event.date}</span>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <small>Open Gallery →</small>
              </div>
            </button>
          ))}
        </div>
      </section>


      {selectedEvent && (
        <div className={styles.modalOverlay} onClick={closeGallery}>
          <div
            className={styles.sliderModal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeBtn}
              onClick={closeGallery}
            >
              ✕
            </button>

            <div className={styles.slideFrame}>
              <button
                className={`${styles.arrowBtn} ${styles.leftArrow}`}
                onClick={prevImage}
              >
                ‹
              </button>

              <img
                key={imageKey}
                src={selectedEvent.images[activeImage]}
                alt="event"
                className={styles.slideImage}
              />

              <button
                className={`${styles.arrowBtn} ${styles.rightArrow}`}
                onClick={nextImage}
              >
                ›
              </button>

              <div className={styles.counter}>
                {activeImage + 1} / {selectedEvent.images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
