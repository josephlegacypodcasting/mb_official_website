/*
 * The Market Better team, as shown on /mike/team.
 *
 * Photos: one portrait per person, picked from components/Headshots and
 * resized to 800x1000 into public/team. Every pick is a studio frame on a
 * neutral background so the grid reads as one set.
 *
 * Roles: only two are confirmed — Mike's and Anna's, both taken from the
 * Show's existing "The Team" page on marketbetter.xyz. The rest are blank
 * because nothing in the repo or on the live properties records them; a blank
 * role renders as name-only rather than as a guess. Fill them in here and the
 * page picks them up — no other file needs touching.
 *
 * (The Show's team page also lists Logan Lyles, Lead Host, and Eric West,
 * Director of Sales. Neither has a headshot in the folder, so neither is here.)
 */
export type TeamMember = {
  slug: string;
  name: string;
  role: string;
};

export const TEAM: TeamMember[] = [
  { slug: "mike-mcgrath", name: "Mike McGrath", role: "Chief Executive Officer" },
  { slug: "anna-mccoy", name: "Anna McCoy", role: "Director of Marketing" },
  { slug: "adriana-gastelum", name: "Adriana Gastelum", role: "" },
  { slug: "alejandra", name: "Alejandra", role: "" },
  { slug: "bilal", name: "Bilal", role: "" },
  { slug: "carol-lynne", name: "Carol-Lynne", role: "" },
  { slug: "chris", name: "Chris", role: "" },
  { slug: "dima", name: "Dima", role: "" },
  { slug: "filip", name: "Filip", role: "" },
  { slug: "joseph-clavijo", name: "Joseph Clavijo", role: "" },
  { slug: "luka", name: "Luka", role: "" },
  { slug: "paty", name: "Paty", role: "" },
  { slug: "quinten", name: "Quinten", role: "" },
  { slug: "tessa", name: "Tessa", role: "" },
  { slug: "valentina", name: "Valentina", role: "" },
  { slug: "valeria-lopez", name: "Valeria Lopez", role: "" },
  { slug: "valeria-torres", name: "Valeria Torres", role: "" },
  { slug: "zeljko", name: "Zeljko", role: "" },
];

export const teamPhoto = (member: TeamMember) => `/team/${member.slug}.jpg`;
