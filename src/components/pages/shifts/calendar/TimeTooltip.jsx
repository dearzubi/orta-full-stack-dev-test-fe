import dayjs from "dayjs";

export const TimeTooltip = ({
  position,
  visible,
  duration = 0,
  mousePosition = { x: 0, y: 0 },
  baseHour = 0,
}) => {
  if (!visible) return null;

  // Calculate target time based on position within the hour slot
  const minuteOffset = Math.floor(position * 60); // 0-59 minutes within the hour
  let startTime = dayjs(`2000-01-01 00:00`).hour(baseHour).minute(minuteOffset);

  let endTime = startTime.add(duration, "minutes");

  // Handle overflow
  if (endTime.isAfter(dayjs(`2000-01-01 23:59`))) {
    endTime = dayjs(`2000-01-01 23:59`);
    startTime = endTime.subtract(duration, "minutes");
  }

  // Handle underflow
  if (startTime.isBefore(dayjs(`2000-01-01 00:00`))) {
    startTime = dayjs(`2000-01-01 00:00`);
    endTime = startTime.add(duration, "minutes");
  }

  const formatTime = (time) => time.format("HH:mm");

  return (
    <div
      className="fixed z-50 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg pointer-events-none"
      style={{
        left: mousePosition.x + 10,
        top: mousePosition.y - 40,
        transform: "translateX(-50%)",
      }}
    >
      <div className="text-sm font-medium">
        {formatTime(startTime)} - {formatTime(endTime)}
      </div>
      <div className="text-xs text-gray-300 mt-1">
        Duration: {Math.floor(duration / 60)}h {duration % 60}m
      </div>

      <div className="absolute top-full left-1/2 transform -translate-x-1/2">
        <div className="border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
};
