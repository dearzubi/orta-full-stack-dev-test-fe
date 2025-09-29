import { Button, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useUserStore } from "../../../../stores/user.store.js";
import { useGetShift } from "../../../../hooks/shift/use-get-shift.js";

import { useParams, useNavigate } from "@tanstack/react-router";
import { Error } from "./Error.jsx";
import { ShiftDetails } from "./ShiftDetails.jsx";
import { ShiftAttendance } from "./ShiftAttendance.jsx";
import { ShiftManagement } from "./ShiftManagement.jsx";

export const ShiftDetailPage = () => {
  const { shiftId } = useParams({ from: "/_shift/$shiftId" });
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const isAdmin = user?.role === "admin";

  const { data: shift, isLoading, isError, error } = useGetShift(shiftId);

  const isCurrentUserShift = shift?.user?.id === user?.id;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Spinner size="lg" label="Loading shift details..." />
      </div>
    );
  }

  if (isError || !shift) {
    return <Error error={error} />;
  }

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ShiftDetails shift={shift} />

        <div className="space-y-6">
          {isCurrentUserShift && (
            <ShiftAttendance
              shift={shift}
              shiftId={shiftId}
              isCurrentUserShift={isCurrentUserShift}
            />
          )}
          {isAdmin && <ShiftManagement shift={shift} shiftId={shiftId} />}
        </div>
      </div>
    </div>
  );
};
