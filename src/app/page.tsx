"use client";

import Hero from "@/app/home/Hero";
import Dock from "@/components/reactbits/Dock";
import { HomeIcon, Info, Users } from "lucide-react";
import { useLabs } from "@/context/LabsContext";

export default function Home() {
  const { isOpen, toggleOpen } = useLabs();
  const dockItems = [
    {
      icon: <HomeIcon size={20} />,
      label: "Home",
      onClick: () =>
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      icon: <Info size={20} />,
      label: "About",
      onClick: () =>
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      icon: <Users size={20} />,
      label: "Team",
      onClick: () =>
        document.getElementById("team")?.scrollIntoView({ behavior: "smooth" }),
    },

  ];

  return (
    <>
      <Dock
        items={dockItems}
        panelHeight={68}
        baseItemSize={48}
        magnification={68}
      />

      <main className="landingPage">
        <Hero />

        <section id="about" className="section aboutSection circuitSection">
          <div className="sectionContent">
            <h2>Build Real Apps, Not Just Tutorials</h2>
            <p className="description">
              Learn modern frontend development, create reusable components, and
              build scalable mobile apps with React Native. Work on real
              projects, not just theory.
            </p>
          </div>
        </section>

        <section id="contact" className="section finalSection circuitSection">
          <div className="sectionContent">
            <h2>Learn. Build. Collaborate.</h2>

            <div className="cardGrid">
              <div id="flux-labs" className="infoCard">
                <h3>Flux Labs</h3>
                <p>
                  Hands-on projects building mobile apps,
                  and full-stack products.
                </p>
		<button
		  type="button"
		  className="cardButton"
		  onClick={() => {
		    if (!isOpen) toggleOpen();
		  }}
		>
		  Explore Labs <span>↗</span>
		</button>
              </div>

              <div id="team" className="infoCard">
                <h3>Team</h3>
                <p>
                  A community of developers and designers working together to
                  grow and build impactful projects.
                </p>
	        <a href="/about" className="cardButton">
      		Meet the Team <span>↗</span>
      		</a>
              </div>

              <div id="events" className="infoCard">
                <h3>Events</h3>
                <p>
                  Workshops, Hackathons, Flux Labs Challenges
                </p>
                <a href="/events" className="cardButton">
      		View Events <span>↗</span>
    		</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
