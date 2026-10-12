"use client";
import { useRef, useState } from "react";
import styles from "./Labs.module.css";

const MIN = 1;
const MAX = 4;

export default function TeamForm({
  challengeId,
  onBack,
  onDone,
}: {
  challengeId: string;
  onBack: () => void;
  onDone: (teamName: string) => void;
}) {
  // Inputs are uncontrolled; ids only track which member cards exist.
  const [ids, setIds] = useState([0]);
  const nextId = useRef(1);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    const names = fd.getAll("name");
    const srns = fd.getAll("srn");
    const emails = fd.getAll("email");
    const teamName = String(fd.get("teamName") ?? "").trim();
    const members = names.map((n, i) => ({
      name: String(n),
      srn: String(srns[i]),
      email: String(emails[i]),
    }));

    try {
      const res = await fetch("/api/labs/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId, teamName, members }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) return onDone(data.team?.name ?? teamName);
      setError(data.error ?? "Could not register. Try again.");
    } catch {
      setError("Network error. Try again.");
    }
    setSending(false);
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <button type="button" className={styles.ghost} onClick={onBack}>
        ← Back
      </button>

      <div>
        <p className={styles.eyebrow}>Accept the challenge</p>
        <h1 className={styles.title}>Form your team</h1>
        <p className={styles.desc} style={{ marginBottom: 0 }}>
          Solo or up to {MAX} people. Only team and member names are shown publicly.
        </p>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Team name</span>
        <input className={styles.input} name="teamName" required minLength={2} maxLength={40} placeholder="e.g. Null Pointers" />
      </label>

      {ids.map((id, i) => (
        <div key={id} className={styles.memberCard}>
          <div className={styles.memberHead}>
            <span className={styles.badge}>Member {i + 1}</span>
            {ids.length > MIN && (
              <button
                type="button"
                className={styles.remove}
                aria-label={`Remove member ${i + 1}`}
                onClick={() => setIds(ids.filter((x) => x !== id))}
              >
                ×
              </button>
            )}
          </div>
          <div className={styles.row2}>
            <input className={styles.input} name="name" placeholder="Name" autoComplete="name" required maxLength={60} />
            <input className={styles.input} name="srn" placeholder="SRN" autoComplete="off" required maxLength={24} />
            <input
              className={`${styles.input} ${styles.span2}`}
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              required
              maxLength={100}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        className={styles.add}
        disabled={ids.length >= MAX}
        onClick={() => setIds([...ids, nextId.current++])}
      >
        + Add member ({ids.length}/{MAX})
      </button>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={`${styles.cta} ${styles.fullBtn}`} disabled={sending}>
        {sending ? "Registering…" : "Register team"}
      </button>
    </form>
  );
}
