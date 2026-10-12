import { NextResponse } from "next/server";

type Member = { name: string; srn: string; email: string };
type Team = { id: string; challengeId: string; name: string; members: Member[] };

/**
 * In-memory store: fine for local dev, but it is wiped on every restart and
 * is not shared between serverless instances. Replace `teams` with a real
 * table (e.g. Supabase) before going live.
 */
const g = globalThis as unknown as { __fluxTeams?: Team[] };
const teams = (g.__fluxTeams ??= []);

const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });

// Public list: team + member NAMES only. SRNs and emails never leave the server.
export async function GET(req: Request) {
  const challenge = new URL(req.url).searchParams.get("challenge") ?? "";
  const list = teams
    .filter((t) => t.challengeId === challenge)
    .map((t) => ({ id: t.id, name: t.name, members: t.members.map((m) => ({ name: m.name })) }));
  return NextResponse.json({ teams: list }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return fail("Invalid request.");

  const challengeId = clean(body.challengeId, 64);
  const name = clean(body.teamName, 40);
  const raw: unknown[] = Array.isArray(body.members) ? body.members : [];

  if (!challengeId) return fail("Missing challenge.");
  if (name.length < 2) return fail("Team name must be at least 2 characters.");
  if (raw.length < 1 || raw.length > 4) return fail("A team needs 1 to 4 members.");

  const members: Member[] = raw.map((m) => {
    const x = (m ?? {}) as Record<string, unknown>;
    return {
      name: clean(x.name, 60),
      srn: clean(x.srn, 24).toUpperCase(),
      email: clean(x.email, 100).toLowerCase(),
    };
  });

  if (members.some((m) => !m.name || !m.srn || !EMAIL.test(m.email))) {
    return fail("Fill in every member's name, SRN and a valid email.");
  }
  const srns = members.map((m) => m.srn);
  if (new Set(srns).size !== srns.length) return fail("The same SRN is listed twice.");

  const inChallenge = teams.filter((t) => t.challengeId === challengeId);
  if (inChallenge.some((t) => t.name.toLowerCase() === name.toLowerCase())) {
    return fail("That team name is taken.", 409);
  }
  if (inChallenge.some((t) => t.members.some((m) => srns.includes(m.srn)))) {
    return fail("One of these SRNs is already on a team.", 409);
  }

  const team: Team = { id: crypto.randomUUID(), challengeId, name, members };
  teams.push(team);
  return NextResponse.json({ team: { id: team.id, name: team.name } }, { status: 201 });
}
