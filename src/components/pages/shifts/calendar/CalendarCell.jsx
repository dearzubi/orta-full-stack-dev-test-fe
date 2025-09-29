import React, { useState, useRef } from "react";
import { TimeTooltip } from "./TimeTooltip.jsx";
import dayjs from "dayjs";
import { useUserStore } from "../../../../stores/user.store.js";
import { MonthViewShiftBlock } from "./MonthViewShiftBlock.jsx";

export const CalendarCell = ({
  date,
  shifts = [],
  isToday = false,
  isCurrentMonth = true,
  isPast = false,
  view = "month",
  timeSlot = null,
  onShiftClick,
  onShiftUpdate,
  onShiftCopy,
}) => {
  const user = useUserStore((state) => state.user);
  const isAdmin = user?.role === "admin";
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragOverPosition, setDragOverPosition] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [draggedShiftDuration, setDraggedShiftDuration] = useState(0);
  const cellRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();

    if (isPast || !isAdmin) {
      e.dataTransfer.dropEffect = "none";
      return;
    }

    e.dataTransfer.dropEffect = "move";

    setMousePosition({ x: e.clientX, y: e.clientY });

    if (view === "week" && cellRef.current) {
      const rect = cellRef.current.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      const cellHeight = rect.height;
      const position = Math.min(Math.max(relativeY / cellHeight, 0), 1);
      setDragOverPosition(position);

      try {
        const dragData = JSON.parse(
          e.dataTransfer.getData("application/json") || "{}",
        );
        if (dragData.duration) {
          setDraggedShiftDuration(dragData.duration);
        }
      } catch (error) {
        /* Ignore parsing errors */
      }
    } else {
      setDragOverPosition(null);
      setDraggedShiftDuration(0);
    }

    setIsDragOver(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();

    if (isPast || !isAdmin) {
      return;
    }

    setIsDragOver(true);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (cellRef.current) {
      const rect = cellRef.current.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;

      if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
        setIsDragOver(false);
        setDragOverPosition(null);
        setDraggedShiftDuration(0);
      }
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragOver(false);
    setDragOverPosition(null);
    setDraggedShiftDuration(0);

    try {
      const dragData = JSON.parse(e.dataTransfer.getData("application/json"));
      const {
        shiftId,
        originalDate,
        originalStartTime,
        originalFinishTime,
        duration,
        isCopy,
      } = dragData;

      if ((!isCopy && isPast) || !isAdmin) {
        return;
      }

      const originalShift =
        shifts.find((s) => s.id === shiftId) ||
        shifts.find(
          (s) =>
            s.date === originalDate &&
            s.startTime === originalStartTime &&
            s.finishTime === originalFinishTime,
        );

      if (originalShift && originalShift.status !== "Scheduled") {
        return;
      }

      const newDate = date.format("YYYY-MM-DD");
      let newStartTime = originalStartTime;
      let newFinishTime = originalFinishTime;

      if (view === "week" && dragOverPosition !== null && timeSlot !== null) {
        const baseHour = timeSlot;
        const minuteOffset = Math.floor(dragOverPosition * 60); // 0-59 minutes within the hour

        const newStartDateTime = dayjs(`2000-01-01 00:00`)
          .hour(baseHour)
          .minute(minuteOffset);

        const newEndDateTime = newStartDateTime.add(duration, "minutes");

        // Validate times don't exceed day boundaries
        if (newEndDateTime.isAfter(dayjs(`2000-01-01 23:59`))) {
          // Move start time back if end would exceed day
          const adjustedEnd = dayjs(`2000-01-01 23:59`);
          const adjustedStart = adjustedEnd.subtract(duration, "minutes");
          newStartTime = adjustedStart.format("HH:mm");
          newFinishTime = adjustedEnd.format("HH:mm");
        } else if (newStartDateTime.isBefore(dayjs(`2000-01-01 00:00`))) {
          // Move to start of day if start would be before midnight
          newStartTime = "00:00";
          newFinishTime = dayjs(`2000-01-01 00:00`)
            .add(duration, "minutes")
            .format("HH:mm");
        } else {
          newStartTime = newStartDateTime.format("HH:mm");
          newFinishTime = newEndDateTime.format("HH:mm");
        }
      }

      const updateData = {
        date: newDate,
        startTime: newStartTime,
        finishTime: newFinishTime,
      };

      if (isCopy) {
        if (onShiftCopy) {
          await onShiftCopy(shiftId, updateData);
        }
      } else {
        if (onShiftUpdate) {
          await onShiftUpdate(shiftId, updateData);
        }
      }
    } catch (error) {
      console.error("Error handling drop:", error);
    }
  };

  const sortedShifts = shifts.sort((a, b) => {
    return dayjs(`${a.date} ${a.startTime}`).diff(
      dayjs(`${b.date} ${b.startTime}`),
    );
  });

  if (view === "month") {
    return (
      <div
        ref={cellRef}
        className={`
          relative min-h-32 border border-gray-200 p-1 transition-all duration-200
          ${isCurrentMonth ? "bg-white" : "bg-gray-50"}
          ${isToday ? "bg-blue-50 border-blue-300" : ""}
          ${isPast ? "calendar-past-date" : ""}
          ${isDragOver && !isPast ? "calendar-cell-drag-over" : ""}
          ${!isPast ? "hover:bg-gray-50 cursor-pointer" : "cursor-not-allowed"}
        `}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div
          className={`
        text-sm font-medium mb-1 sticky top-0 z-10
        ${isToday ? "text-blue-700 font-bold" : isPast ? "text-gray-400" : isCurrentMonth ? "text-gray-900" : "text-gray-400"}
      `}
        >
          {date.format("D")}
        </div>

        <div className="space-y-1">
          {sortedShifts.map((shift) => (
            <MonthViewShiftBlock
              key={shift.id}
              shift={shift}
              onShiftClick={onShiftClick}
              isDragging={false}
              isDropTarget={false}
              isUserAdmin={isAdmin}
            />
          ))}
        </div>

        {shifts.length === 0 && isDragOver && !isPast && isAdmin && (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500 calendar-drop-zone">
            Drop shift here
          </div>
        )}

        {isPast && (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 bg-gray-200 bg-opacity-50">
            Past
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={cellRef}
      className={`
      relative h-16 border-b border-gray-100 transition-all duration-200
      ${isPast ? "calendar-past-date" : ""}
      ${isDragOver && !isPast && isAdmin ? "bg-blue-50" : !isPast && isAdmin ? "hover:bg-gray-50" : ""}
      ${!isPast && isAdmin ? "cursor-pointer" : "cursor-not-allowed"}
    `}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragOver && dragOverPosition !== null && (
        <div
          className="absolute left-0 right-0 h-0.5 bg-blue-500 opacity-75 z-20"
          style={{
            top: `${dragOverPosition * 100}%`,
          }}
        />
      )}

      {isDragOver && !isPast && isAdmin && (
        <div className="absolute inset-0 border-2 border-dashed border-blue-400 bg-blue-50 opacity-50 z-10" />
      )}

      {view === "week" && (
        <TimeTooltip
          position={dragOverPosition || 0}
          visible={
            isDragOver && dragOverPosition !== null && draggedShiftDuration > 0
          }
          duration={draggedShiftDuration}
          mousePosition={mousePosition}
          baseHour={timeSlot}
        />
      )}
    </div>
  );
};
