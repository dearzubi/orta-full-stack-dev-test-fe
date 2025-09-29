import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  TimeInput,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import {
  getLocalTimeZone,
  parseDate,
  parseTime,
} from "@internationalized/date";
import dayjs from "dayjs";

export const ScheduleDetails = ({ formData, onUpdate }) => {
  const duration = useMemo(() => {
    if (formData.startTime && formData.finishTime) {
      const start = dayjs(`2000-01-01 ${formData.startTime}`);
      const finish = dayjs(`2000-01-01 ${formData.finishTime}`);

      if (start.isValid() && finish.isValid() && finish.isAfter(start)) {
        const diffInMinutes = finish.diff(start, "minute");
        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;

        if (minutes === 0) {
          return `${hours}.0 hours`;
        } else {
          const decimalHours = (hours + minutes / 60).toFixed(1);
          return `${decimalHours} hours`;
        }
      }
    }
    return null;
  }, [formData.startTime, formData.finishTime]);

  const handleDateChange = (date) => {
    if (date) {
      onUpdate(
        "date",
        dayjs(date.toDate(getLocalTimeZone())).format("YYYY-MM-DD"),
      );
    } else {
      onUpdate("date", "");
    }
  };

  const handleTimeChange = (field, time) => {
    if (time) {
      const formattedTime = `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}`;
      onUpdate(field, formattedTime);
    } else {
      onUpdate(field, "");
    }
  };

  const parsedDate = useMemo(() => {
    if (formData.date) {
      try {
        return parseDate(dayjs(formData.date).format("YYYY-MM-DD"));
      } catch (error) {
        return null;
      }
    }
    return null;
  }, [formData.date]);

  const parsedStartTime = useMemo(() => {
    if (formData.startTime) {
      try {
        const [hours, minutes] = formData.startTime.split(":");
        return parseTime(
          `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`,
        );
      } catch (error) {
        return null;
      }
    }
    return null;
  }, [formData.startTime]);

  const parsedFinishTime = useMemo(() => {
    if (formData.finishTime) {
      try {
        const [hours, minutes] = formData.finishTime.split(":");
        return parseTime(
          `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`,
        );
      } catch (error) {
        return null;
      }
    }
    return null;
  }, [formData.finishTime]);

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader className="pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <Icon icon="heroicons:clock" className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Schedule Details
            </h2>
          </div>
          <p className="text-sm text-gray-500">
            Set the date and time for this shift
          </p>
        </div>
      </CardHeader>
      <CardBody className="space-y-4">
        <div className="w-full md:w-1/2">
          <DatePicker
            label="Date"
            value={parsedDate}
            onChange={handleDateChange}
            isRequired
            variant="bordered"
            labelPlacement="outside"
            showMonthAndYearPickers
            granularity="day"
            startContent={
              <Icon
                icon="heroicons:calendar-days"
                className="w-4 h-4 text-gray-400"
              />
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TimeInput
            label="Start Time"
            value={parsedStartTime}
            onChange={(time) => handleTimeChange("startTime", time)}
            isRequired
            variant="bordered"
            labelPlacement="outside"
            hourCycle={24}
            granularity="minute"
            startContent={
              <Icon icon="heroicons:play" className="w-4 h-4 text-gray-400" />
            }
          />

          <TimeInput
            label="Finish Time"
            value={parsedFinishTime}
            onChange={(time) => handleTimeChange("finishTime", time)}
            isRequired
            variant="bordered"
            labelPlacement="outside"
            hourCycle={24}
            granularity="minute"
            startContent={
              <Icon icon="heroicons:stop" className="w-4 h-4 text-gray-400" />
            }
          />
        </div>

        {duration && (
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <Icon icon="heroicons:clock" className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">
              <span className="font-medium">Duration:</span> {duration}
            </span>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
