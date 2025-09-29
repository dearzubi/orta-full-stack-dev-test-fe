import React, { useMemo } from "react";
import dayjs from "dayjs";
import { useUserStore } from "../../../../stores/user.store.js";
import { MonthView } from "./MonthView.jsx";
import { WeekView } from "./WeekView.jsx";

export const CalendarGrid = ({
  currentDate,
  view = "month",
  shifts = [],
  onShiftClick,
  onShiftUpdate,
  onShiftCopy,
}) => {
  const user = useUserStore((state) => state.user);
  const isAdmin = user?.role === "admin";

  const { calendarDays, shiftsByDate } = useMemo(() => {
    const today = dayjs();
    const days = [];
    const shiftsMap = new Map();

    shifts.forEach((shift) => {
      const dateKey = dayjs(shift.date).format("YYYY-MM-DD");
      if (!shiftsMap.has(dateKey)) {
        shiftsMap.set(dateKey, []);
      }
      shiftsMap.get(dateKey).push(shift);
    });

    if (view === "month") {
      const startOfMonth = currentDate.startOf("month");
      const endOfMonth = currentDate.endOf("month");

      // Get the first day of the calendar (start of week containing first day of month)
      const startOfCalendar = startOfMonth.startOf("week");
      // Get the last day of the calendar (end of week containing last day of month)
      const endOfCalendar = endOfMonth.endOf("week");

      let currentDay = startOfCalendar;
      while (
        currentDay.isBefore(endOfCalendar) ||
        currentDay.isSame(endOfCalendar, "day")
      ) {
        const dateKey = currentDay.format("YYYY-MM-DD");
        days.push({
          date: currentDay,
          isCurrentMonth: currentDay.month() === currentDate.month(),
          isToday: currentDay.isSame(today, "day"),
          isPast: currentDay.isBefore(today, "day"),
          shifts: shiftsMap.get(dateKey) || [],
        });
        currentDay = currentDay.add(1, "day");
      }
    } else {
      const startOfWeek = currentDate.startOf("week");
      const endOfWeek = currentDate.endOf("week");

      let currentDay = startOfWeek;
      while (
        currentDay.isBefore(endOfWeek) ||
        currentDay.isSame(endOfWeek, "day")
      ) {
        const dateKey = currentDay.format("YYYY-MM-DD");
        days.push({
          date: currentDay,
          isCurrentMonth: true, // All days are relevant in week view
          isToday: currentDay.isSame(today, "day"),
          isPast: currentDay.isBefore(today, "day"),
          shifts: shiftsMap.get(dateKey) || [],
        });
        currentDay = currentDay.add(1, "day");
      }
    }

    return {
      calendarDays: days,
      shiftsByDate: shiftsMap,
    };
  }, [currentDate, view, shifts]);

  return (
    <div className="w-full">
      {view === "month" ? (
        <MonthView
          calendarDays={calendarDays}
          view={view}
          onShiftClick={onShiftClick}
          onShiftUpdate={onShiftUpdate}
          onShiftCopy={onShiftCopy}
        />
      ) : (
        <WeekView
          view={view}
          calendarDays={calendarDays}
          isAdmin={isAdmin}
          onShiftClick={onShiftClick}
          onShiftUpdate={onShiftUpdate}
          onShiftCopy={onShiftCopy}
        />
      )}

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-100 border-l-4 border-blue-500"></div>
          <span>Scheduled</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-100 border-l-4 border-green-500"></div>
          <span>In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-100 border-l-4 border-gray-500"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-100 border-l-4 border-red-500"></div>
          <span>Cancelled</span>
        </div>
        {isAdmin && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 opacity-60 border-l-4 border-gray-400"></div>
            <span>Past (Non-editable)</span>
          </div>
        )}
        <div className="ml-auto text-gray-500">
          {isAdmin
            ? "Only scheduled shifts can be moved • Past dates disabled • Ctrl+Drag to copy • Click to view details"
            : "Click to view details"}
        </div>
      </div>
    </div>
  );
};
