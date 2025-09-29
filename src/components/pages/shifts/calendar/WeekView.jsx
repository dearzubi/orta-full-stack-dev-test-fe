import { CalendarCell } from "./CalendarCell.jsx";
import dayjs from "dayjs";
import { WeekViewShiftBlock } from "./WeekViewShiftBlock.jsx";

// Time slots for week view (24 hours in 1-hour increments)
const TIME_SLOTS =
  /** @type {Array<{hour: number, label: string, fullLabel: string}>} */ (
    Array.from({ length: 24 }, (_, i) => {
      const hour = i;
      return {
        hour,
        label: dayjs().hour(hour).minute(0).format("h A"),
        fullLabel: dayjs().hour(hour).minute(0).format("HH:mm"),
      };
    })
  );

export const WeekView = ({
  calendarDays,
  view,
  onShiftClick,
  onShiftUpdate,
  onShiftCopy,
  isAdmin,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-200">
        <div className="p-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200">
          GMT+00
        </div>

        {calendarDays.map((dayData) => (
          <div
            key={dayData.date.format("YYYY-MM-DD")}
            className="p-3 text-center border-r border-gray-200 last:border-r-0"
          >
            <div className="text-sm font-semibold text-gray-700">
              {dayData.date.format("ddd").toUpperCase()}
            </div>
            <div
              className={`
                  text-2xl font-bold mt-1 w-10 h-10 rounded-full flex items-center justify-center mx-auto
                  ${
                    dayData.isToday ? "bg-blue-600 text-white" : "text-gray-900"
                  }
                `}
            >
              {dayData.date.format("D")}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-8" style={{ minHeight: "1536px" }}>
        <div className="border-r border-gray-200">
          {TIME_SLOTS.map((timeSlot) => (
            <div
              key={timeSlot.hour}
              className="h-16 border-b border-gray-100 px-2 py-1 text-xs text-gray-500 relative flex items-start"
            >
              <div className="absolute -top-2 right-2 bg-white px-1 text-gray-400">
                {timeSlot.label}
              </div>
            </div>
          ))}
        </div>

        {calendarDays.map((dayData) => (
          <div
            key={dayData.date.format("YYYY-MM-DD")}
            className="border-r border-gray-200 last:border-r-0 relative"
          >
            {TIME_SLOTS.map((timeSlot) => (
              <CalendarCell
                key={`${dayData.date.format("YYYY-MM-DD")}-${timeSlot.hour}`}
                date={dayData.date}
                shifts={[]} // No shifts in individual cells for week view
                isToday={dayData.isToday}
                isCurrentMonth={dayData.isCurrentMonth}
                isPast={dayData.isPast}
                view={view}
                timeSlot={timeSlot.hour}
                onShiftClick={onShiftClick}
                onShiftUpdate={onShiftUpdate}
                onShiftCopy={onShiftCopy}
              />
            ))}

            {dayData.shifts.map((shift) => {
              const startTime = dayjs(`2000-01-01 ${shift.startTime}`);
              const endTime = dayjs(`2000-01-01 ${shift.finishTime}`);
              const startHour = startTime.hour();
              const startMinute = startTime.minute();
              const duration = endTime.diff(startTime, "minutes");

              const isShiftInPast = dayjs(shift.date).isBefore(dayjs(), "day");
              const isShiftModifiable =
                shift.status === "Scheduled" && !isShiftInPast && isAdmin;

              const top = startHour * 64 + Math.floor((startMinute / 60) * 64); // 64px per hour
              const height = Math.max(Math.floor((duration / 60) * 64), 20); // Minimum 20px height

              return (
                <WeekViewShiftBlock
                  isShiftModifiable={isShiftModifiable}
                  isAdmin={isAdmin}
                  key={shift.id}
                  shift={shift}
                  top={top}
                  height={height}
                  startTime={startTime}
                  endTime={endTime}
                  duration={duration}
                  isShiftInPast={isShiftInPast}
                  onShiftClick={onShiftClick}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
