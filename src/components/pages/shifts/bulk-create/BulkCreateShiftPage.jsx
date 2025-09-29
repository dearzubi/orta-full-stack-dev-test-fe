import React, { useState } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "@tanstack/react-router";
import { useCreateBatchShifts } from "../../../../hooks/shift/use-create-batch-shifts.js";
import { toast } from "react-toastify";
import { ValidationError } from "../../../../utils/errors/index.js";
import { errorToast } from "../../../../utils/ui.js";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { WeekSelection } from "./WeekSelection.jsx";
import { LocationDetails } from "../create-edit/LocationDetails.jsx";
import { BasicInformation } from "../create-edit/BasicInformation.jsx";
import { DAYS_OF_WEEK } from "../constants.js";
import { DaysSelection } from "./DaysSelection.jsx";
import { TimeDetails } from "./TimeDetails.jsx";

dayjs.extend(isoWeek);

export const BulkCreateShiftPage = () => {
  const navigate = useNavigate();

  const createBatchShiftsMutation = useCreateBatchShifts();

  const [formData, setFormData] = useState({
    weekStartDate: dayjs().startOf("isoWeek").format("YYYY-MM-DD"),

    title: "",
    role: "",
    typeOfShift: [],
    user: "",
    location: {
      name: "",
      address: "",
      postCode: "",
      cordinates: {
        latitude: 0,
        longitude: 0,
      },
    },

    selectedDays: [],

    startTime: "",
    finishTime: "",
    numOfShiftsPerDay: 1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState(null);

  const updateFormData = (field, value) => {
    setFormData((prev) => {
      if (field.includes(".")) {
        const keys = field.split(".");
        const newData = { ...prev };
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];
          current[key] = { ...current[key] };
          current = current[key];
        }
        const lastKey = keys[keys.length - 1];
        current[lastKey] = value;
        return newData;
      }
      return { ...prev, [field]: value };
    });
  };

  const generateShifts = () => {
    const shifts = [];
    const weekStart = dayjs(formData.weekStartDate).startOf("isoWeek");

    formData.selectedDays.forEach((dayKey) => {
      const dayInfo = DAYS_OF_WEEK.find((d) => d.key === dayKey);
      if (!dayInfo) return;

      let shiftDate;
      if (dayInfo.value === 0) {
        // Sunday is 0, which should be day 7 of ISO week
        shiftDate = weekStart.add(6, "day");
      } else {
        // Monday is 1, Tuesday is 2, etc.
        shiftDate = weekStart.add(dayInfo.value - 1, "day");
      }

      shifts.push({
        title: formData.title,
        role: formData.role,
        typeOfShift: formData.typeOfShift,
        startTime: formData.startTime,
        finishTime: formData.finishTime,
        numOfShiftsPerDay: formData.numOfShiftsPerDay,
        date: shiftDate.toISOString(),
        user: formData.user,
        location: {
          ...formData.location,
          cordinates: {
            latitude: parseFloat(
              formData.location.cordinates.latitude.toString(),
            ),
            longitude: parseFloat(
              formData.location.cordinates.longitude.toString(),
            ),
          },
        },
      });
    });

    return shifts;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.role || !formData.user) {
      errorToast("Please fill in all required fields");
      return;
    }

    if (formData.typeOfShift.length === 0) {
      errorToast("Please select at least one shift type");
      return;
    }

    if (formData.selectedDays.length === 0) {
      errorToast("Please select at least one day");
      return;
    }

    if (!formData.startTime || !formData.finishTime) {
      errorToast("Please specify start and finish times");
      return;
    }

    if (!formData.location.name || !formData.location.address) {
      errorToast("Please fill in location details");
      return;
    }

    setIsSubmitting(true);

    try {
      const shifts = generateShifts();
      const response = await createBatchShiftsMutation.mutateAsync(shifts);

      setResults(response);

      if (response.errors.length === 0) {
        toast.success(
          `Successfully created ${response.created.length} shifts!`,
        );
      } else {
        toast.warning(
          `Created ${response.created.length} shifts with ${response.errors.length} errors`,
        );
      }
      await navigate({ to: "/" });
    } catch (error) {
      if (
        error instanceof ValidationError &&
        error.issues &&
        error.issues.length > 0
      ) {
        console.error("Error during batch shift creation:", error.toJSON());
        errorToast(error.issues[0].error);
      } else {
        const errorMsg =
          (error instanceof Error ? error.message : String(error)) ||
          "An unexpected error occurred. Please try again.";
        errorToast(errorMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate({ to: "/" });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Button
        variant="light"
        startContent={<Icon icon="heroicons:arrow-left" className="w-4 h-4" />}
        onPress={() => navigate({ to: "/" })}
        className="hover:border-transparent focus:outline-none"
      >
        Back to Shifts
      </Button>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bulk Create Shifts</h1>
        <p className="text-gray-600 mt-1">
          Create multiple shifts at once by selecting a week, days, and common
          details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <WeekSelection formData={formData} onUpdate={updateFormData} />
        <DaysSelection formData={formData} onUpdate={updateFormData} />

        <BasicInformation formData={formData} onUpdate={updateFormData} />

        <LocationDetails formData={formData} onUpdate={updateFormData} />

        <TimeDetails formData={formData} onUpdate={updateFormData} />

        <div className="flex justify-end space-x-4 pt-6">
          <Button
            type="button"
            variant="bordered"
            onPress={handleCancel}
            disabled={isSubmitting}
            className="hover:border-gray-600 focus:outline-none"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            className="bg-gray-900 text-white hover:bg-gray-800 hover:border-transparent focus:outline-none"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Create {formData.selectedDays.length} Shifts
          </Button>
        </div>
      </form>
    </div>
  );
};
