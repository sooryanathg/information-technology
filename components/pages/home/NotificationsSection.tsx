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
    <section data-reveal aria-labelledby="notifications-heading" className="flex flex-col rounded-[19px] border border-[#d4cfc7] bg-[#fffaf3] p-4 shadow-[0_2px_5px_rgba(44,32,21,0.12)] sm:p-8">
      <h2 id="notifications-heading" className="font-heading text-[1.2rem] font-bold uppercase text-[#30251c] sm:text-[2rem]">Notification</h2>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-b border-[#e7d8c5] pb-3 sm:mt-5 sm:gap-x-6 sm:pb-4">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`text-[0.72rem] transition-colors sm:text-[0.9rem] ${selectedCategory === category ? "rounded-[8px] bg-[#65472d] px-3 py-1.5 text-white sm:px-4 sm:py-2" : "px-0 py-1.5 text-[#594430] hover:text-[#9a693d] sm:py-2"}`}
          >
            {category}
          </button>
        ))}
      </div>

      <ul className="mt-1 flex-1 divide-y divide-[#eee4d8] sm:mt-2">
        {visibleNotifications.map(({ title, date, Icon }) => (
          <li key={title} className="flex min-h-[44px] items-center gap-x-3 py-2 sm:min-h-[66px] sm:gap-x-4 sm:py-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] bg-[#f0dfc5] text-[#7c5633] sm:h-10 sm:w-10">
              <Icon aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.7} />
            </span>
            <span className="min-w-0 flex-1 text-[0.76rem] font-medium leading-snug text-[#33271d] sm:text-[0.95rem]">{title}</span>
            <time className="shrink-0 font-mono text-[0.66rem] text-[#4d3929] sm:text-[0.8rem]">{date}</time>
          </li>
        ))}
      </ul>

      <button type="button" className="mt-2 flex w-full items-center justify-center gap-1 border-t border-[#e7d8c5] pt-3 text-[0.76rem] font-medium sm:mt-3 sm:pt-4 text-[#65472d] hover:text-[#9a693d] sm:text-[0.9rem]">
        View All Notifications
        <ChevronRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
      </button>
    </section>
  );
}
