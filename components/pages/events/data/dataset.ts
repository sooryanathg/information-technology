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
  /** ISO format, yyyy-mm-dd */
  date: string;
  /** Path under /public */
  image?: string;
};

export const categories: { title: EventCategory; color: string; icon: string }[] = [
  { title: "Tech", color: "bg-copper-300", icon: "/events/gear.webp" },
  { title: "Non-Tech", color: "bg-copper-400", icon: "/events/gear.webp" },
  { title: "Talks", color: "bg-copper-500", icon: "/events/gear.webp" },
  { title: "Seminars", color: "bg-clay", icon: "/events/gear.webp" },
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
