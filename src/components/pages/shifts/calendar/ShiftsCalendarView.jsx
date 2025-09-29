import React, { useState, useMemo } from "react";
import { Card, CardBody, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useShifts } from "../../../../hooks/shift/use-shifts.js";
import { useUpdateShift } from "../../../../hooks/shift/use-update-shift.js";
import { useCreateShift } from "../../../../hooks/shift/use-create-shift.js";
import { useUserStore } from "../../../../stores/user.store.js";
import { CalendarHeader } from "./CalendarHeader.jsx";
import { CalendarGrid } from "./CalendarGrid.jsx";
import { ValidationError } from "../../../../utils/errors/index.js";
import { errorToast, successToast } from "../../../../utils/ui.js";
import { Error } from "./Error.jsx";

export const ShiftsCalendarView = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const isAdmin = user?.role === "admin";
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [view, setView] = useState("month");

  const {
    data: shiftsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useShifts({
    page: 1,
    limit: 1000, // Fetch a large number to cover the calendar range
  });

  const shifts = useMemo(() => shiftsData?.shifts || [], [shiftsData?.shifts]);

  const updateShiftMutation = useUpdateShift();
  const createShiftMutation = useCreateShift();

  const handleToday = () => setCurrentDate(dayjs());

  const handleShiftClick = (shiftId) => {
    navigate({ to: `/${shiftId}` });
  };

  const handleShiftUpdate = async (shiftId, updateData) => {
    try {
      if (!isAdmin) {
        errorToast("Only administrators can modify shifts");
        return;
      }

      const shiftToUpdate = shifts.find((s) => s.id === shiftId);

      if (!shiftToUpdate) {
        errorToast("Shift not found");
        return;
      }

      if (shiftToUpdate.status !== "Scheduled") {
        errorToast(`Cannot modify ${shiftToUpdate.status.toLowerCase()} shift`);
        return;
      }

      if (dayjs(shiftToUpdate.date).isBefore(dayjs(), "day")) {
        errorToast("Cannot modify past shifts");
        return;
      }

      await updateShiftMutation.mutateAsync({
        shiftId,
        shiftData: updateData,
      });
      successToast("Shift updated successfully!");
    } catch (error) {
      console.error("Failed to update shift:", error);
      if (
        error instanceof ValidationError &&
        error.issues &&
        error.issues.length > 0
      ) {
        errorToast(error.issues[0].error);
      } else {
        errorToast("Failed to update shift. Please try again.");
      }
    }
  };

  const handleShiftCopy = async (shiftId, updateData) => {
    try {
      if (!isAdmin) {
        errorToast("Only administrators can copy shifts");
        return;
      }

      const originalShift = shifts.find((s) => s.id === shiftId);

      if (!originalShift) {
        throw new Error("Original shift not found");
      }

      if (originalShift.status !== "Scheduled") {
        errorToast(`Cannot copy ${originalShift.status.toLowerCase()} shift`);
        return;
      }

      if (dayjs(originalShift.date).isBefore(dayjs(), "day")) {
        errorToast("Cannot copy past shifts");
        return;
      }

      const newShiftData = {
        title: originalShift.title,
        role: originalShift.role,
        typeOfShift: originalShift.typeOfShift,
        user: originalShift.user.id,
        location: {
          name: originalShift.location.name,
          address: originalShift.location.address,
          postCode: originalShift.location.postCode,
          cordinates: {
            latitude: originalShift.location.coordinates?.latitude || 0,
            longitude: originalShift.location.coordinates?.longitude || 0,
          },
        },
        ...updateData,
      };

      await createShiftMutation.mutateAsync(newShiftData);
      successToast("Shift copied successfully!");
    } catch (error) {
      console.error("Failed to copy shift:", error);
      if (
        error instanceof ValidationError &&
        error.issues &&
        error.issues.length > 0
      ) {
        errorToast(error.issues[0].error);
      } else {
        errorToast("Failed to copy shift. Please try again.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Spinner size="lg" label="Loading calendar..." />
      </div>
    );
  }

  if (isError) {
    return <Error error={error} onRetry={refetch} />;
  }

  return (
    <div className="w-full space-y-6">
      <CalendarHeader
        currentDate={currentDate}
        view={view}
        onDateChange={setCurrentDate}
        onViewChange={setView}
        onToday={handleToday}
      />

      <CalendarGrid
        currentDate={currentDate}
        view={view}
        shifts={shifts}
        onShiftClick={handleShiftClick}
        onShiftUpdate={handleShiftUpdate}
        onShiftCopy={handleShiftCopy}
      />

      {shifts.length === 0 && (
        <Card className="border-2 border-dashed border-gray-300">
          <CardBody className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <Icon
              icon="heroicons:calendar-days"
              className="w-16 h-16 text-gray-400 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No shifts scheduled
            </h3>
            <p className="text-gray-500 max-w-md">
              There are no shifts scheduled for{" "}
              {view === "month" ? currentDate.format("MMMM YYYY") : "this week"}
              .
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
