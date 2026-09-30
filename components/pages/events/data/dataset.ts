// Event data for the events page.

export type EventCategory = "Tech" | "Non-Tech" | "Talks" | "Seminars";
export type EventStatus = "upcoming" | "past";

export type EventItem = {
  id: number;
  title: string;
  description: string;
  duration: string;
  org: string;
  mode: string;
  category: EventCategory;
  status: EventStatus;
  /** ISO date, yyyy-mm-dd */
  date: string;
  /** Cover photo in /public. Cards without one show a warm placeholder. */
  image?: string;
};

// Light-to-dark orange ramp, left to right, as in the design.
export const categories: { title: EventCategory; bg: string; hover: string; icon: string }[] = [
  { title: "Tech", bg: "bg-[#DC9A6C]", hover: "hover:bg-[#d38f60]", icon: "/events/gear.webp" },
  { title: "Non-Tech", bg: "bg-[#CF8A5A]", hover: "hover:bg-[#c47f4f]", icon: "/events/gear.webp" },
  { title: "Talks", bg: "bg-[#BD7A4B]", hover: "hover:bg-[#b16f41]", icon: "/events/gear.webp" },
  { title: "Seminars", bg: "bg-[#9C6441]", hover: "hover:bg-[#8f5a39]", icon: "/events/gear.webp" },
];

const matrix = {
  title: "IEEE MATRIX 3.0",
  description: "IEEE MATRIX 3.0 is a high-energy hackathon organized by IEEE Student Branch Gec Palakkad",
  duration: "2h",
  org: "IEEE",
  mode: "Online",
};

export const events: EventItem[] = [
  { id: 1, ...matrix, category: "Tech", status: "upcoming", date: "2026-10-12" },
  { id: 2, ...matrix, category: "Non-Tech", status: "upcoming", date: "2026-10-18" },
  { id: 3, ...matrix, category: "Talks", status: "upcoming", date: "2026-10-25" },
  { id: 4, ...matrix, category: "Seminars", status: "upcoming", date: "2026-11-02" },
  { id: 5, ...matrix, category: "Tech", status: "upcoming", date: "2026-11-09" },
  { id: 6, ...matrix, category: "Talks", status: "upcoming", date: "2026-11-16" },
  { id: 7, ...matrix, category: "Tech", status: "past", date: "2026-08-21" },
  { id: 8, ...matrix, category: "Seminars", status: "past", date: "2026-09-05" },
];
