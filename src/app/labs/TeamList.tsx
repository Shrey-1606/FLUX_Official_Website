"use client";
import { memo, useEffect, useState } from "react";
import styles from "./Labs.module.css";

type Team = { id: string; name: string; members: { name: string }[] };

function TeamList({ challengeId, reload }: { challengeId: string; reload: number }) {
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    fetch(`/api/labs/teams?challenge=${encodeURIComponent(challengeId)}`, {
      signal: ac.signal,
      cache: "no-store",
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        setTeams(d.teams);
        setFailed(false);
      })
      .catch((e) => e?.name !== "AbortError" && setFailed(true));
    return () => ac.abort();
  }, [challengeId, reload]);

  return (
    <div className={styles.panel}>
      <div className={styles.panelHead}>
        <h2 className={styles.panelTitle}>Those Who Chose Violence</h2>
        {teams && teams.length > 0 && <span className={styles.count}>{teams.length}</span>}
      </div>

      {failed ? (
        <p className={styles.muted}>Couldn&apos;t load teams right now.</p>
      ) : !teams ? (
        <p className={styles.muted}>Loading…</p>
      ) : teams.length === 0 ? (
        <p className={styles.muted}>No teams yet. Be the first to accept the challenge.</p>
      ) : (
        <ul className={styles.teamList}>
          {teams.map((t) => {
            const isOpen = open === t.id;
            return (
              <li key={t.id}>
                <button
                  className={styles.teamBtn}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : t.id)}
                >
                  <span>{t.name}</span>
                  <span className={styles.chev} aria-hidden>
                    ›
                  </span>
                </button>
                {isOpen && (
                  <ul className={styles.people}>
                    {t.members.map((m, i) => (
                      <li key={i} className={styles.person}>
                        <span className={styles.avatar}>{m.name.trim().charAt(0).toUpperCase()}</span>
                        {m.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default memo(TeamList);
