export type Challenge = {
  id: string;
  title: string;
  description: string;
  tools: string[];
  /** ISO date with offset. The challenge runs for CHALLENGE_DAYS from here. */
  start: string;
};

export const CHALLENGE_DAYS = 14;
const DAY = 86_400_000;

/**
 * Two slots at a time: the live one and the one queued after it.
 * Renew monthly: replace both entries, keeping the second start
 * exactly CHALLENGE_DAYS after the first.
 */
export const CHALLENGES: readonly Challenge[] = [
  {/*{
    id: "2026-10-a",
    title: "Chatbot creator, simple and accessible for small businesses",
    description:
      "Small businesses often struggle to provide timely and consistent customer support due to limited resources and lack of technical expertise. Existing chatbot solutions are either too expensive, overly complex, or require coding knowledge, making them inaccessible for many small business owners. \nThere is a need for a simple, affordable, and no-code/low-code platform that enables small businesses to easily create, customize, and deploy chatbots for handling customer queries, improving engagement, and automating routine interactions across platforms like websites and messaging apps.",
    tools: ["React Native + Expo", "NativeWind / Tamagui", "Supabase (PostgreSQL)", "Railway / Render"],
    start: "2026-09-23T00:00:00+05:30",
  },
  {
    id: "2026-10-b",
    title: "Organizing the Unorganized Venue Booking Ecosystem",
    description:
      "Venue booking for events remains largely unorganized, with fragmented listings, lack of transparency in pricing, and inefficient communication between customers and venue owners. This makes it difficult for users to discover, compare, and book venues seamlessly.\nBuild a platform that streamlines venue discovery and booking by bringing structured listings, real-time availability, transparent pricing, and direct communication into one unified system.",
    tools: ["React Native + Expo", "FastAPI (Python)", "Supabase", "Websockets"],
    start: "2026-10-07T00:00:00+05:30",
  },
*/}];

export type Slot = { challenge: Challenge; startsAt: number; endsAt: number };

// Entries with an unparseable date are dropped instead of silently never going live.
const slots: Slot[] = CHALLENGES.map((challenge) => {
  const startsAt = new Date(challenge.start).getTime();
  return { challenge, startsAt, endsAt: startsAt + CHALLENGE_DAYS * DAY };
}).filter((s) => Number.isFinite(s.startsAt));

/** The live slot, or the next upcoming one if nothing is live right now. */
export function getCurrent(now: number): { slot: Slot | null; live: boolean } {
  const live = slots.find((s) => now >= s.startsAt && now < s.endsAt);
  if (live) return { slot: live, live: true };
  const upcoming = slots.find((s) => s.startsAt > now) ?? null;
  return { slot: upcoming, live: false };
}
