"use client";
import { memo, useEffect, useState } from "react";
import styles from "./Labs.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

function Countdown({ target, label, onDone }: { target: number; label: string; onDone?: () => void }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setLeft(diff);
      if (diff === 0) onDone?.();
      return diff;
    };
    if (tick() === 0) return;
    const id = setInterval(() => tick() === 0 && clearInterval(id), 1000);
    return () => clearInterval(id);
  }, [target, onDone]);

  const s = Math.floor((left ?? 0) / 1000);
  const parts: [string, string][] = [
    [pad(Math.floor(s / 86400)), "d"],
    [pad(Math.floor((s % 86400) / 3600)), "h"],
    [pad(Math.floor((s % 3600) / 60)), "m"],
    [pad(s % 60), "s"],
  ];

  return (
    <div className={styles.timer} aria-label={label}>
      <span className={styles.timerLabel}>{label}</span>
      <span className={styles.timerDigits}>
        {left === null
          ? "--:--:--:--"
          : parts.map(([v, u], i) => (
              <span key={u}>
                {v}
                <em>{u}</em>
                {i < 3 ? " " : ""}
              </span>
            ))}
      </span>
    </div>
  );
}

export default memo(Countdown);
