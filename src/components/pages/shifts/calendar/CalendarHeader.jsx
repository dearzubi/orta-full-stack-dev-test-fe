import React from "react";
import { Button, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";

const VIEW_OPTIONS = [
  { key: "month", label: "Month View" },
  { key: "week", label: "Week View" },
];

export const CalendarHeader = ({
  currentDate,
  view,
  onDateChange,
  onViewChange,
  onToday,
}) => {
  const handlePrevious = () => {
    const newDate =
      view === "month"
        ? currentDate.subtract(1, "month")
        : currentDate.subtract(1, "week");
    onDateChange(newDate);
  };

  const handleNext = () => {
    const newDate =
      view === "month"
        ? currentDate.add(1, "month")
        : currentDate.add(1, "week");
    onDateChange(newDate);
  };

  const getDisplayText = () => {
    if (view === "month") {
      return currentDate.format("MMMM YYYY");
    } else {
      const startOfWeek = currentDate.startOf("week");
      const endOfWeek = currentDate.endOf("week");

      if (startOfWeek.month() === endOfWeek.month()) {
        return `${startOfWeek.format("MMMM D")} - ${endOfWeek.format("D, YYYY")}`;
      } else {
        return `${startOfWeek.format("MMM D")} - ${endOfWeek.format("MMM D, YYYY")}`;
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            variant="bordered"
            size="sm"
            onPress={handlePrevious}
            className="hover:border-gray-600 focus:outline-none"
          >
            <Icon icon="heroicons:chevron-left" className="w-4 h-4" />
          </Button>

          <h2 className="text-2xl font-bold text-gray-900 min-w-[200px] text-center">
            {getDisplayText()}
          </h2>

          <Button
            isIconOnly
            variant="bordered"
            size="sm"
            onPress={handleNext}
            className="hover:border-gray-600 focus:outline-none"
          >
            <Icon icon="heroicons:chevron-right" className="w-4 h-4" />
          </Button>
        </div>

        <Button
          variant="bordered"
          size="sm"
          onPress={onToday}
          className="hover:border-gray-600 focus:outline-none"
        >
          Today
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Select
          label="View"
          selectedKeys={[view]}
          onSelectionChange={(keys) => onViewChange(Array.from(keys)[0])}
          size="sm"
          variant="bordered"
          className="w-48"
          labelPlacement="outside-left"
          popoverProps={{
            classNames: {
              content: "min-w-[140px]",
            },
          }}
        >
          {VIEW_OPTIONS.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
