export const WeekViewShiftBlock = ({
  shift,
  top,
  height,
  startTime,
  endTime,
  duration,
  isShiftInPast,
  isShiftModifiable,
  isAdmin,
  onShiftClick,
}) => {
  return (
    <div
      key={shift.id}
      className="absolute left-0 right-0 mx-1 z-10"
      style={{
        top: `${top}px`,
        height: `${height}px`,
      }}
      draggable={isShiftModifiable}
      onDragStart={
        isShiftModifiable
          ? (e) => {
              const shiftData = {
                shiftId: shift.id,
                originalDate: shift.date,
                originalStartTime: shift.startTime,
                originalFinishTime: shift.finishTime,
                duration: duration,
                isCopy: e.ctrlKey || e.metaKey,
              };
              e.dataTransfer.setData(
                "application/json",
                JSON.stringify(shiftData),
              );
              e.dataTransfer.effectAllowed = shiftData.isCopy ? "copy" : "move";
              e.target.style.opacity = "0.6";
            }
          : undefined
      }
      onDragEnd={
        isShiftModifiable
          ? (e) => {
              e.target.style.opacity = "1";
            }
          : undefined
      }
    >
      <div
        className={`
                        h-full rounded-md border-l-4 p-1 transition-all duration-200
                        ${isShiftInPast ? "calendar-past-shift" : !isShiftModifiable ? "calendar-non-modifiable-shift" : isAdmin ? "cursor-pointer" : "cursor-not-allowed"}
                        ${
                          shift.status === "Scheduled"
                            ? `bg-blue-100 border-blue-500 ${isShiftModifiable ? "hover:bg-blue-200" : ""}`
                            : shift.status === "In Progress"
                              ? `bg-green-100 border-green-500 ${isShiftModifiable ? "hover:bg-green-200" : ""}`
                              : shift.status === "Completed"
                                ? `bg-gray-100 border-gray-500 ${isShiftModifiable ? "hover:bg-gray-200" : ""}`
                                : `bg-red-100 border-red-500 ${isShiftModifiable ? "hover:bg-red-200" : ""}`
                        }
                      `}
        onClick={(e) => {
          e.stopPropagation();
          onShiftClick(shift.id);
        }}
      >
        <div className="text-xs font-semibold text-gray-800 truncate">
          {shift.title}
        </div>
        <div className="text-xs text-gray-600 truncate">
          {startTime.format("HH:mm")} - {endTime.format("HH:mm")}
        </div>
        {height > 40 && (
          <div className="text-xs text-gray-500 truncate">
            {shift.location.name}
          </div>
        )}
      </div>
    </div>
  );
};
