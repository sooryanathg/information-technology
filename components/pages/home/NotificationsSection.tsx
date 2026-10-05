"use client";

import {
  CalendarDays,
  ChevronRight,
  FileText,
  GraduationCap,
  WalletCards,
} from "lucide-react";
import { useEffect, useState } from "react";

type Notification = {
  title: string;
  category: string;
  date: string;
};

const categories = ["All", "Exams", "Fees", "Events"];

const categoryIcons: Record<string, React.ElementType> = {
  Exams: FileText,
  Fees: WalletCards,
  Events: GraduationCap,
};

export default function NotificationsSection() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);

  const [loading, setLoading] = useState(true);

  // Controls View All / Show Less
  const [showAll, setShowAll] = useState(false);

  // --------------------------------------------------
  // FETCH NOTIFICATIONS
  // --------------------------------------------------

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "/api/notifications"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch notifications"
          );
        }

        const data = await response.json();

        setNotifications(data);
      } catch (error) {
        console.error(
          "Error fetching notifications:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // --------------------------------------------------
  // FILTER BY CATEGORY
  // --------------------------------------------------

  const visibleNotifications = notifications.filter(
    ({ category }) =>
      selectedCategory === "All" ||
      category === selectedCategory
  );

  // --------------------------------------------------
  // SHOW 3 OR ALL
  // --------------------------------------------------

  const displayedNotifications = showAll
    ? visibleNotifications
    : visibleNotifications.slice(0, 3);

  // --------------------------------------------------
  // CATEGORY CHANGE
  // --------------------------------------------------

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    // Return to compact 3-notification view
    setShowAll(false);
  };

  return (
    <section
      data-reveal
      aria-labelledby="notifications-heading"
      className="flex flex-col rounded-[19px] border border-[#d4cfc7] bg-[#fffaf3] p-4 shadow-[0_2px_5px_rgba(44,32,21,0.12)] sm:p-8"
    >
      {/* ==================================================
          TITLE
      ================================================== */}

      <h2
        id="notifications-heading"
        className="font-heading text-[1.2rem] font-bold uppercase text-[#30251c] sm:text-[2rem]"
      >
        Notification
      </h2>

      {/* ==================================================
          CATEGORY FILTERS
      ================================================== */}

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-b border-[#e7d8c5] pb-3 sm:mt-5 sm:gap-x-6 sm:pb-4">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() =>
              handleCategoryChange(category)
            }
            className={`text-[0.72rem] transition-colors sm:text-[0.9rem] ${
              selectedCategory === category
                ? "rounded-[8px] bg-[#65472d] px-3 py-1.5 text-white sm:px-4 sm:py-2"
                : "px-0 py-1.5 text-[#594430] hover:text-[#9a693d] sm:py-2"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* ==================================================
          NOTIFICATION LIST
      ================================================== */}

      <ul className="mt-1 flex-1 divide-y divide-[#eee4d8] sm:mt-2">
        {loading ? (
          <li className="py-5 text-center text-xs text-[#594430]">
            Loading notifications...
          </li>
        ) : visibleNotifications.length === 0 ? (
          <li className="py-5 text-center text-xs text-[#594430]">
            No notifications available.
          </li>
        ) : (
          displayedNotifications.map(
            ({ title, category, date }) => {
              const Icon =
                categoryIcons[category] ||
                CalendarDays;

              return (
                <li
                  key={`${title}-${date}`}
                  className="flex min-h-[44px] items-center gap-x-3 py-2 sm:min-h-[66px] sm:gap-x-4 sm:py-3"
                >
                  {/* ICON */}

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] bg-[#f0dfc5] text-[#7c5633] sm:h-10 sm:w-10">
                    <Icon
                      aria-hidden="true"
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      strokeWidth={1.7}
                    />
                  </span>

                  {/* TITLE */}

                  <span className="min-w-0 flex-1 text-[0.76rem] font-medium leading-snug text-[#33271d] sm:text-[0.95rem]">
                    {title}
                  </span>

                  {/* DATE */}

                  <time className="shrink-0 font-mono text-[0.66rem] text-[#4d3929] sm:text-[0.8rem]">
                    {date}
                  </time>
                </li>
              );
            }
          )
        )}
      </ul>

      {/* ==================================================
          VIEW ALL / SHOW LESS
      ================================================== */}

      {!loading &&
        visibleNotifications.length > 3 && (
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="mt-2 flex w-full items-center justify-center gap-1 border-t border-[#e7d8c5] pt-3 text-[0.76rem] font-medium text-[#65472d] transition-colors hover:text-[#9a693d] sm:mt-3 sm:pt-4 sm:text-[0.9rem]"
          >
            {showAll
              ? "Show Less"
              : "View All Notifications"}

            <ChevronRight
              aria-hidden="true"
              className={`h-4 w-4 transition-transform ${
                showAll ? "-rotate-90" : ""
              }`}
              strokeWidth={1.8}
            />
          </button>
        )}
    </section>
  );
}