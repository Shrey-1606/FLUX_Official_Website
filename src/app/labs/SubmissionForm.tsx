"use client";
import { useState } from "react";
import styles from "./Labs.module.css";

type Status = "idle" | "sending" | "done" | "error";

const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "srn", label: "SRN", type: "text", autoComplete: "off" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "github", label: "GitHub URL", type: "url", autoComplete: "url", placeholder: "https://github.com/you/repo" },
] as const;

export default function SubmissionForm({
  challengeId,
  challengeTitle,
  onBack,
}: {
  challengeId: string;
  challengeTitle: string;
  onBack: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      // Wire this endpoint to your DB / Google Sheet / webhook
      const res = await fetch("/api/labs/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, challengeId }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div>
        <div className={styles.tick}>✓</div>
        <p className={styles.eyebrow}>Flux Labs / Submitted</p>
        <h1 className={styles.title}>Got it.</h1>
        <p className={styles.desc}>Your solution is in. We will review it before the window closes.</p>
        <button className={styles.ghost} onClick={onBack}>
          Back to problem
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <button type="button" className={styles.ghost} onClick={onBack}>
        ← Back
      </button>

      <div>
        <span className={styles.chip}>Submitting for · {challengeTitle}</span>
        <div className={styles.notice} style={{ marginBottom: 0 }}>
          Your repo must be public, with a recorded Loom demo of the technical implementation.
        </div>
      </div>

      {FIELDS.map((f, i) => (
        <label key={f.name} className={styles.field}>
          <span className={styles.label}>
            <span className={styles.step}>{i + 1}</span>
            {f.label}
          </span>
          <input
            className={styles.input}
            name={f.name}
            type={f.type}
            autoComplete={f.autoComplete}
            placeholder={"placeholder" in f ? f.placeholder : undefined}
            required
          />
        </label>
      ))}

      <label className={styles.field}>
        <span className={styles.label}>
          <span className={styles.step}>5</span>Description
        </span>
        <textarea
          className={styles.input}
          name="description"
          rows={4}
          required
          placeholder="Your approach, what works, what doesn't"
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>
          <span className={styles.step}>6</span>Tools used
        </span>
        <input className={styles.input} name="tools" required placeholder="e.g. React Native, Supabase" />
      </label>

      {status === "error" && <p className={styles.error}>Something went wrong. Try again.</p>}

      <button type="submit" className={`${styles.cta} ${styles.fullBtn}`} disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
