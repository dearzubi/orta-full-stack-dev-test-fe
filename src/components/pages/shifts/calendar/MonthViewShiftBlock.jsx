import React, { useState } from "react";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { formatTo24HTime } from "../utils.js";

export const MonthViewShiftBlock = ({
  shift,
  onShiftClick,
  isDragging = false,
  isDropTarget = false,
  isUserAdmin = false,
}) => {
  const isShiftInPast = dayjs(shift.date).isBefore(dayjs(), "day");
  const isShiftModifiable =
    shift.status === "Scheduled" && !isShiftInPast && isUserAdmin;
  const [dragStartData, setDragStartData] = useState(null);

  const handleDragStart = (e) => {
    const startTime = dayjs(`2000-01-01 ${shift.startTime}`);
    const endTime = dayjs(`2000-01-01 ${shift.finishTime}`);
    const duration = endTime.diff(startTime, "minutes");

    const shiftData = {
      shiftId: shift.id,
      originalDate: shift.date,
      originalStartTime: shift.startTime,
      originalFinishTime: shift.finishTime,
      duration: duration,
      isCopy: e.ctrlKey || e.metaKey,
    };

    setDragStartData(shiftData);
    e.dataTransfer.setData("application/json", JSON.stringify(shiftData));
    e.dataTransfer.effectAllowed = shiftData.isCopy ? "copy" : "move";

    e.target.style.opacity = "0.6";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
    setDragStartData(null);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    onShiftClick(shift.id);
  };

  return (
    <div
      draggable={isShiftModifiable}
      onDragStart={isShiftModifiable ? handleDragStart : undefined}
      onDragEnd={isShiftModifiable ? handleDragEnd : undefined}
      onClick={handleClick}
      className={`
        shift-block relative group rounded-md border
        ${isDragging ? "calendar-shift-dragging" : ""}
        ${isDropTarget ? "ring-2 ring-blue-500 ring-opacity-50" : ""}
        ${isShiftInPast ? "calendar-past-shift" : !isShiftModifiable ? "calendar-non-modifiable-shift" : isUserAdmin ? "cursor-pointer" : "cursor-not-allowed"}
        ${
          shift.status === "Scheduled"
            ? `bg-blue-50 border-blue-200 ${isShiftModifiable ? "hover:bg-blue-100" : ""}`
            : shift.status === "In Progress"
              ? `bg-green-50 border-green-200 ${isShiftModifiable ? "hover:bg-green-100" : ""}`
              : shift.status === "Completed"
                ? `bg-gray-50 border-gray-200 ${isShiftModifiable ? "hover:bg-gray-100" : ""}`
                : `bg-red-50 border-red-200 ${isShiftModifiable ? "hover:bg-red-100" : ""}`
        }
      `}
    >
      <div className="p-2 space-y-1">
        <div className="text-xs font-medium text-gray-900 leading-tight mb-1">
          {formatTo24HTime(shift.startTime)} -{" "}
          {formatTo24HTime(shift.finishTime)}
        </div>

        <div className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">
          {shift.title}
        </div>
      </div>

      {isShiftModifiable && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-l-md" />
      )}

      {dragStartData?.isCopy && (
        <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-1">
          <Icon icon="heroicons:plus" className="w-3 h-3" />
        </div>
      )}
    </div>
  );
};
