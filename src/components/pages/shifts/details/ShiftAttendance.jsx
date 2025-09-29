import { Button, Card, CardBody } from "@heroui/react";
import { formatTo24HTime } from "../utils.js";
import { SHIFT_CONSTRAINTS } from "../constants.js";
import React from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useClockInShift } from "../../../../hooks/shift/use-clock-in-shift.js";
import { useClockOutShift } from "../../../../hooks/shift/use-clock-out-shift.js";

export const ShiftAttendance = ({ isCurrentUserShift, shift, shiftId }) => {
  const clockInMutation = useClockInShift();
  const clockOutMutation = useClockOutShift();

  const alreadyClockedIn = shift?.clockInTime;
  const alreadyClockedOut = shift?.clockInTime && shift?.clockOutTime;

  const getClockInAvailability = () => {
    if (!shift?.startTime || !shift?.date) return false;

    const canClockIn =
      isCurrentUserShift &&
      shift?.status === "Scheduled" &&
      !shift?.clockInTime;

    const shiftStart = dayjs(shift.date)
      .set("hour", parseInt(shift.startTime.split(":")[0], 10))
      .set("minute", parseInt(shift.startTime.split(":")[1], 10));

    const clockInAvailable = shiftStart.subtract(
      SHIFT_CONSTRAINTS.EARLY_CLOCK_IN_BUFFER,
      "minutes",
    );
    const now = dayjs();

    return (
      canClockIn &&
      (now.isAfter(clockInAvailable) || now.isSame(clockInAvailable))
    );
  };

  const getClockOutAvailability = () => {
    if (!shift?.finishTime || !shift?.date) return false;

    const canClockOut =
      isCurrentUserShift &&
      shift?.status === "In Progress" &&
      shift?.clockInTime &&
      !shift?.clockOutTime;

    const shiftEnd = dayjs(shift.date)
      .set("hour", parseInt(shift.finishTime.split(":")[0], 10))
      .set("minute", parseInt(shift.finishTime.split(":")[1], 10));

    const clockOutAvailable = shiftEnd.subtract(
      SHIFT_CONSTRAINTS.MINIMUM_CLOCK_OUT_BUFFER,
      "minutes",
    );
    const now = dayjs();

    return (
      canClockOut &&
      (now.isAfter(clockOutAvailable) || now.isSame(clockOutAvailable))
    );
  };

  const handleClockIn = async () => {
    try {
      await clockInMutation.mutateAsync(shiftId);
      toast.success("Successfully clocked in!");
    } catch (error) {
      console.error("Failed to clock in:", error);
      toast.error("Failed to clock in. Please try again.");
    }
  };

  const handleClockOut = async () => {
    try {
      await clockOutMutation.mutateAsync(shiftId);
      toast.success("Successfully clocked out!");
    } catch (error) {
      console.error("Failed to clock out:", error);
      toast.error("Failed to clock out. Please try again.");
    }
  };

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardBody className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Clock In/Out
          </h2>
          <p className="text-gray-600 text-sm">Manage your shift attendance</p>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className=" font-semibold text-gray-900">Clock In</h3>
              {shift.clockInTime && (
                <div className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {formatTo24HTime(shift.clockInTime)}
                </div>
              )}
            </div>

            <div className="text-center py-4">
              <Button
                color="primary"
                className="w-full bg-gray-900 text-white hover:bg-gray-800 hover:border-transparent focus:outline-none"
                isDisabled={!getClockInAvailability() || alreadyClockedIn}
                onPress={handleClockIn}
                isLoading={clockInMutation.isPending}
              >
                {alreadyClockedIn ? "Clocked In" : "Clock In"}
              </Button>
              {!alreadyClockedIn && !getClockInAvailability() && (
                <div className="text-sm text-gray-500 mt-1">
                  {`Clock-in available ${SHIFT_CONSTRAINTS.EARLY_CLOCK_IN_BUFFER} minutes before shift starts`}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className=" font-semibold text-gray-900">Clock Out</h3>
              {shift.clockOutTime && (
                <div className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {formatTo24HTime(shift.clockOutTime)}
                </div>
              )}
            </div>

            <div className="text-center py-4">
              <Button
                color="primary"
                className="w-full bg-gray-900 text-white hover:bg-gray-800 hover:border-transparent focus:outline-none"
                isDisabled={!getClockOutAvailability() || alreadyClockedOut}
                onPress={handleClockOut}
                isLoading={clockOutMutation.isPending}
              >
                {alreadyClockedOut ? "Clocked Out" : "Clock Out"}
              </Button>
              {!alreadyClockedOut && !getClockOutAvailability() && (
                <div className="text-sm text-gray-500 mt-1">
                  {`Clock-out available ${SHIFT_CONSTRAINTS.MINIMUM_CLOCK_OUT_BUFFER} minutes before shift ends`}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
