"use client";

import ProfileCard from "@/components/ui/profile-card";
import styles from "./about.module.css";

type Member = {
  name: string;
  role: string;
  image?: string;
  blurb?: string;

  instagram?: string;
};


const CORE_MEMBERS: Member[] = [
  { name: "Shreyansh Upadhyaya", role: "Chair", image: "/images/shrey.png",blurb:"One vision, Infinite possibilities", instagram: "https://www.instagram.com/_shrey.06?psln=N2U3eDBwcWlrNDM1" },
  { name: "Sanmitra Patil", role: "Vice Chair",blurb:"", image: "/images/sammy.png", instagram: "" },
  { name: "Sanket Suresh Vernekar", role: "Technical Head", image:"/images/sanket.png", instagram: "https://www.instagram.com/vernekar_sanket?cplk=Mmd5Zzd6dGlkdXEy"},
  { name: "Sathvik M Anur", role: "Events Head", image: "/images/sathvik.png", instagram:"https://www.instagram.com/sathvik_anur?psln=NmUzdmV3Mmx0ZTc0&utm_source=qr"},
  { name: "MC Dhanush Rao", role: "Events Head", instagram: "https://www.instagram.com/mc_dhanush_rao/?utm_source=ig_web_button_share_sheet"},
  { name: "Manu Dhulipala", role: "Designing Head", image: "/images/manu.png", instagram:"https://www.instagram.com/manudhulipala/?utm_source=ig_web_button_share_sheet" },
  { name: "Prasun Dutta", role: "Designing Head", instagram:"https://www.instagram.com/pasu.hq/?utm_source=ig_web_button_share_sheet" },
  { name: "Manav Sharma", role: "Socials Head", image: "/images/manav.png", instagram: "https://www.instagram.com/m4navsharma?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw==" },
];

const SENIORS: Member[] = [
  { name: "Joshua Rayudu", role: "Events", image: "/images/joshua.png", instagram:"https://www.instagram.com/joshua.rayudu?vrfl=d3Z6bGM3dGo4aGVn"},
  { name: "Mohith Kotagiri", role: "Events", image: "/images/mohith.png", instagram:"https://www.instagram.com/mohith.priv.hb/?utm_source=ig_web_button_share_sheet" },
];



const SECTIONS = [
  { title: "Core Members", people: CORE_MEMBERS },
  { title: "Seniors", people: SENIORS },
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.hero}>
          <h1>The Team behind FLUX</h1>
          <p className={styles.description}></p>
        </header>

        {SECTIONS.map(({ title, people }) => (
          <section key={title} className={styles.group} aria-labelledby={`about-${title}`}>
            <h2 id={`about-${title}`} className={styles.groupTitle}>
              {title}
            </h2>

            <div className={styles.grid}>
              {people.map((p, i) => (
                <ProfileCard
                  key={`${p.name}-${i}`}
                  className={styles.profile}
                  name={p.name}
                  role={p.role}
                  image={p.image}
                  blurb={p.blurb}
                  instagram={p.instagram}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
