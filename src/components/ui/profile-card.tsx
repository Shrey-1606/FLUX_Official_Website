"use client";

import Image from "next/image";
import styles from "./profile-card.module.css";

export type ProfileCardProps = {
  name: string;
  /** shown as the description line under the name */
  role: string;
  /** path inside /public. Leave out to show initials. */
  image?: string;
  /** optional extra line, shown under the role */
  blurb?: string;
  /** instagram handle ("shrey.dev" / "@shrey.dev") or a full URL. Leave out to disable the button. */
  instagram?: string;
  /** shows the green tick next to the name */
  verified?: boolean;
  className?: string;
};

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

const instaUrl = (v: string) =>
  /^https?:\/\//i.test(v)
    ? v
    : `https://www.instagram.com/${v.replace(/^@/, "").replace(/\/$/, "")}/`;

export default function ProfileCard({
  name,
  role,
  image,
  blurb,
  instagram,
  verified,
  className,
}: ProfileCardProps) {
  return (
    <article className={`${styles.card} ${className ?? ""}`}>
      <div className={styles.media}>
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="320px"
            className={styles.photo}
            draggable={false}
          />
        ) : (
          <span className={styles.initials}>{initials(name)}</span>
        )}
      </div>
      <div className={styles.fade} />

      <div className={styles.body}>
        <h3 className={styles.name}>
          {name}
          {verified && (
            <svg className={styles.badge} viewBox="0 0 20 20" aria-label="Verified">
              <circle cx="10" cy="10" r="10" fill="#22c55e" />
              <path
                d="M6 10.3l2.8 2.8L14 7.8"
                fill="none"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </h3>
        <p className={styles.role}>{role}</p>
        {blurb && <p className={styles.blurb}>{blurb}</p>}

        {instagram ? (
          <a
            className={styles.follow}
            href={instaUrl(instagram)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow +
          </a>
        ) : (
          <span className={`${styles.follow} ${styles.disabled}`} aria-disabled="true">
            Follow +
          </span>
        )}
      </div>
    </article>
  );
}
