"use client";

import { CalendarDays, ChevronRight, ClipboardCheck, FileText, GraduationCap, WalletCards } from "lucide-react";
import { useState } from "react";

const notifications = [
  { title: "Mid Semester Examination", category: "Exams", date: "May 10, 2025", Icon: FileText },
  { title: "Project Submission Deadline", category: "Fees", date: "May 12, 2025", Icon: ClipboardCheck },
  { title: "Guest Lecture on AI & ML", category: "Events", date: "May 15, 2025", Icon: GraduationCap },
  { title: "Fee Payment Reminder", category: "Fees", date: "May 18, 2025", Icon: WalletCards },
  { title: "Workshop On Web Development", category: "Events", date: "May 20, 2025", Icon: CalendarDays },
];
const categories = ["All", "Exams", "Fees", "Events"];

export default function NotificationsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const visibleNotifications = notifications.filter(
    ({ category }) => selectedCategory === "All" || category === selectedCategory,
  );

  return (
    <section aria-labelledby="notifications-heading" className="rounded-[19px] border border-[#d4cfc7] bg-[#fffaf3] p-4 shadow-[0_2px_5px_rgba(44,32,21,0.12)] sm:p-5">
      <h2 id="notifications-heading" className="font-heading text-[1.35rem] font-bold uppercase text-[#30251c] sm:text-[1.5rem]">Notification</h2>

      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-b border-[#e7d8c5] pb-3 sm:gap-x-5">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={` text-[0.65rem] transition-colors ${selectedCategory === category ? "rounded-[8px] bg-[#65472d] px-3 py-1.5 text-white" : "px-0 py-1.5 text-[#594430] hover:text-[#9a693d]"}`}
          >
            {category}
          </button>
        ))}
      </div>

      <ul className="mt-1 divide-y divide-[#eee4d8]">
        {visibleNotifications.map(({ title, date, Icon }) => (
          <li key={title} className="flex min-h-[46px] flex-wrap items-center gap-x-3 gap-y-1 py-2 sm:flex-nowrap">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] bg-[#f0dfc5] text-[#7c5633]">
              <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.7} />
            </span>
            <span className="min-w-0 flex-1 text-xs font-medium text-[#33271d] sm:text-[0.65rem]">{title}</span>
            <time className="ml-10 shrink-0 font-mono text-[0.62rem] text-[#4d3929] sm:ml-0">{date}</time>
          </li>
        ))}
      </ul>

      <button type="button" className="mt-2 flex w-full items-center justify-center gap-1 border-t border-[#e7d8c5] pt-3 text-[0.68rem] font-medium text-[#65472d] hover:text-[#9a693d]">
        View All Notifications
        <ChevronRight aria-hidden="true" className="h-3 w-3" strokeWidth={1.8} />
      </button>
    </section>
  );
}
