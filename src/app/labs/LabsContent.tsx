"use client";
import { useCallback, useState } from "react";
import styles from "./Labs.module.css";
import Countdown from "./Countdown";
import SubmissionForm from "./SubmissionForm";
import TeamForm from "./TeamForm";
import TeamList from "./TeamList";
import { getCurrent } from "./challenges";

type View = "brief" | "team" | "submit";

export default function LabsContent() {
  const [view, setView] = useState<View>("brief");
  const [notice, setNotice] = useState("");
  const [reload, setReload] = useState(0); // bump to refetch the teams panel
  const [, refresh] = useState(0); // bump to re-check which problem is live
  const onDone = useCallback(() => refresh((n) => n + 1), []);

  const { slot, live } = getCurrent(Date.now());

  if (!slot) {
    return (
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>Flux Labs</p>
        <h1 className={styles.title}>No active problem</h1>
        <p className={styles.desc}>The next problem statement drops soon. Check back shortly.</p>
      </div>
    );
  }

  const { challenge } = slot;
  const current: View = live ? view : "brief";
  const go = (v: View) => {
    setNotice("");
    setView(v);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.layout}>
        <div className={styles.main}>
          {current === "team" && (
            <TeamForm
              challengeId={challenge.id}
              onBack={() => go("brief")}
              onDone={(name) => {
                setNotice(`${name} is in. Your team now shows on the right.`);
                setReload((n) => n + 1);
                setView("brief");
              }}
            />
          )}

          {current === "submit" && (
            <SubmissionForm
              challengeId={challenge.id}
              challengeTitle={challenge.title}
              onBack={() => go("brief")}
            />
          )}

          {current === "brief" && (
            <>
              {notice && <div className={styles.notice}>{notice}</div>}
              <p className={styles.eyebrow}>Flux Labs / {live ? "Live problem" : "Up next"}</p>
              <h1 className={styles.title}>{challenge.title}</h1>
              <p className={styles.desc}>{challenge.description}</p>

              <div className={styles.block}>
                <span className={styles.label}>Tools</span>
                <ul className={styles.tools}>
                  {challenge.tools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>

              <Countdown
                target={live ? slot.endsAt : slot.startsAt}
                label={live ? "Closes in" : "Opens in"}
                onDone={onDone}
              />

              {live && (
                <div className={styles.btnRow}>
                  <button className={styles.cta} onClick={() => go("team")}>
                    Accept the challenge
                  </button>
                  <button className={`${styles.cta}`} onClick={() => go("submit")}>
                    Submit solution
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <aside className={styles.side}>
          <TeamList challengeId={challenge.id} reload={reload} />
        </aside>
      </div>
    </div>
  );
}
