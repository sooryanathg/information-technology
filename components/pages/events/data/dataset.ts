export type EventCategory = "Tech" | "Non-Tech" | "Talks" | "Seminars";
export type EventStatus = "upcoming" | "past";

export type EventItem = {
  id: number;
  title: string;
  description: string;
  /** Shown when there is no `time`, e.g. "2h" or "Full Day" */
  duration: string;
  org: string;
  mode: string;
  category: EventCategory;
  /** yyyy-mm-dd. Leave out if unknown; such events count as past. */
  date?: string;
  /** Last day of a multi-day event, yyyy-mm-dd */
  endDate?: string;
  /** e.g. "10:00 AM – 3:00 PM" */
  time?: string;
  /** e.g. "IT Lab 234" */
  venue?: string;
  /** Primary cover image URL */
  image?: string;
  /** Array of image URLs for transitions/slideshows */
  images?: string[];
};

export const categories: { title: EventCategory; color: string; icon: string }[] = [
  { title: "Tech", color: "bg-copper-300", icon: "/events/gear.webp" },
  { title: "Non-Tech", color: "bg-copper-400", icon: "/events/gear.webp" },
  { title: "Talks", color: "bg-copper-500", icon: "/events/gear.webp" },
  { title: "Seminars", color: "bg-clay", icon: "/events/gear.webp" },
];

// Today's date in India, as yyyy-mm-dd, so events turn "past" at local midnight.
const todayInIndia = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());

/** Upcoming until its last day has passed. Events without a date count as past. */
export function eventStatus(event: EventItem): EventStatus {
  const last = event.endDate ?? event.date;
  return last && last >= todayInIndia() ? "upcoming" : "past";
}
