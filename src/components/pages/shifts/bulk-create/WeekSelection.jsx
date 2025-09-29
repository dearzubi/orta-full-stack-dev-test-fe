import { Card, CardBody, CardHeader, DatePicker } from "@heroui/react";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { getLocalTimeZone, parseDate } from "@internationalized/date";

export const WeekSelection = ({ formData, onUpdate }) => {
  const parsedDate = useMemo(() => {
    if (formData.weekStartDate) {
      try {
        return parseDate(dayjs(formData.weekStartDate).format("YYYY-MM-DD"));
      } catch (error) {
        return null;
      }
    }
    return null;
  }, [formData.weekStartDate]);

  const handleDateChange = (date) => {
    if (date) {
      const selectedDate = dayjs(date.toDate(getLocalTimeZone()));
      const weekStart = selectedDate.startOf("isoWeek");
      onUpdate("weekStartDate", weekStart.format("YYYY-MM-DD"));
    } else {
      onUpdate("weekStartDate", "");
    }
  };

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader className="pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <Icon icon="heroicons:calendar" className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Week Selection
            </h2>
          </div>
          <p className="text-sm text-gray-500">
            Choose the week for which you want to create shifts
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <DatePicker
          label="Week Starting (Monday)"
          value={parsedDate}
          onChange={handleDateChange}
          variant="bordered"
          labelPlacement="outside"
          description={`Week: ${dayjs(formData.weekStartDate).format("MMM D")} - ${dayjs(
            formData.weekStartDate,
          )
            .add(6, "day")
            .format("MMM D, YYYY")}`}
          isDateUnavailable={(date) => {
            return dayjs(date.toDate(getLocalTimeZone())).day() !== 1; // Disable non-Monday dates (Monday is 1 in dayjs)
          }}
        />
      </CardBody>
    </Card>
  );
};
