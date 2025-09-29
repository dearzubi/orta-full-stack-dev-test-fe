import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  CheckboxGroup,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import React from "react";
import { DAYS_OF_WEEK } from "../constants.js";
import dayjs from "dayjs";

export const DaysSelection = ({ formData, onUpdate }) => {
  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader className="pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <Icon
              icon="heroicons:calendar-days"
              className="w-5 h-5 text-gray-600"
            />
            <h2 className="text-xl font-semibold text-gray-900">
              Days Selection
            </h2>
          </div>
          <p className="text-sm text-gray-500">
            Choose which days of the week to create shifts for
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <CheckboxGroup
          value={formData.selectedDays}
          onValueChange={(value) => onUpdate("selectedDays", value)}
          orientation="horizontal"
          className="gap-4"
        >
          {DAYS_OF_WEEK.map((day) => (
            <Checkbox key={day.key} value={day.key}>
              {day.label}
            </Checkbox>
          ))}
        </CheckboxGroup>

        {formData.selectedDays.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">
              Selected Days Preview:
            </p>
            <div className="space-y-1">
              {formData.selectedDays.map((dayKey) => {
                const dayInfo = DAYS_OF_WEEK.find((d) => d.key === dayKey);
                if (!dayInfo) return null;
                const weekStart = dayjs(formData.weekStartDate).startOf(
                  "isoWeek",
                );
                let shiftDate;
                if (dayInfo.value === 0) {
                  shiftDate = weekStart.add(6, "day");
                } else {
                  shiftDate = weekStart.add(dayInfo.value - 1, "day");
                }
                return (
                  <div key={dayKey} className="text-sm text-blue-700">
                    {dayInfo.label} - {shiftDate.format("MMM D, YYYY")}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
