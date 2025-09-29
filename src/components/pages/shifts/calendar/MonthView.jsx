import { CalendarCell } from "./CalendarCell.jsx";
import React from "react";
import { WEEKDAYS } from "../constants.js";

export const MonthView = ({
  view,
  calendarDays,
  onShiftClick,
  onShiftUpdate,
  onShiftCopy,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {calendarDays.map((dayData, index) => (
          <div
            key={dayData.date.format("YYYY-MM-DD")}
            className={`
                border-r border-b border-gray-200 last:border-r-0
                ${index >= calendarDays.length - 7 ? "border-b-0" : ""}
              `}
          >
            <CalendarCell
              date={dayData.date}
              shifts={dayData.shifts}
              isToday={dayData.isToday}
              isCurrentMonth={dayData.isCurrentMonth}
              isPast={dayData.isPast}
              view={view}
              timeSlot={null}
              onShiftClick={onShiftClick}
              onShiftUpdate={onShiftUpdate}
              onShiftCopy={onShiftCopy}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
