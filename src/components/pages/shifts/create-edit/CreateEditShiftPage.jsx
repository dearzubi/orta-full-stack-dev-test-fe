import React, { useState, useEffect } from "react";
import { Button, Spinner } from "@heroui/react";
import { useCreateShift } from "../../../../hooks/shift/use-create-shift.js";
import { useUpdateShift } from "../../../../hooks/shift/use-update-shift.js";
import { useGetShift } from "../../../../hooks/shift/use-get-shift.js";
import { BasicInformation } from "./BasicInformation.jsx";
import { LocationDetails } from "./LocationDetails.jsx";
import { ScheduleDetails } from "./ScheduleDetails.jsx";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ValidationError } from "../../../../utils/errors/index.js";
import { errorToast } from "../../../../utils/ui.js";
import { Icon } from "@iconify/react";

export const CreateEditShiftPage = () => {
  const { shiftId } = useParams({ strict: false });
  const mode = shiftId ? "edit" : "create";

  const navigate = useNavigate();
  const isEditMode = mode === "edit" && shiftId;

  const [formData, setFormData] = useState({
    title: "",
    role: "",
    typeOfShift: [],
    user: "",
    startTime: "",
    finishTime: "",
    date: "",
    location: {
      name: "",
      address: "",
      postCode: "",
      cordinates: {
        latitude: 0,
        longitude: 0,
      },
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: shiftData, isLoading: shiftLoading } = useGetShift(shiftId, {
    enabled: isEditMode,
  });
  const createShiftMutation = useCreateShift();
  const updateShiftMutation = useUpdateShift();

  useEffect(() => {
    if (isEditMode && shiftData) {
      setFormData({
        title: shiftData.title || "",
        role: shiftData.role || "",
        typeOfShift: Array.isArray(shiftData.typeOfShift)
          ? shiftData.typeOfShift
          : [shiftData.typeOfShift],
        user: shiftData.user?.id || "",
        startTime: shiftData.startTime || "",
        finishTime: shiftData.finishTime || "",
        date: shiftData.date ? dayjs(shiftData.date).toISOString() : "",
        location: {
          name: shiftData.location?.name || "",
          address: shiftData.location?.address || "",
          postCode: shiftData.location?.postCode || "",
          cordinates: {
            latitude: shiftData.location?.coordinates?.latitude || 0,
            longitude: shiftData.location?.coordinates?.longitude || 0,
          },
        },
      });
    }
  }, [isEditMode, shiftData]);

  const updateFormData = (field, value) => {
    setFormData((prev) => {
      if (field.includes(".")) {
        const keys = field.split(".");
        const newData = { ...prev };
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) {
          current[keys[i]] = { ...current[keys[i]] };
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        return newData;
      }
      return { ...prev, [field]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        location: {
          ...formData.location,
          cordinates: {
            latitude: parseFloat(formData.location.cordinates.latitude),
            longitude: parseFloat(formData.location.cordinates.longitude),
          },
        },
        date: formData.date,
      };

      if (isEditMode) {
        await updateShiftMutation.mutateAsync({
          shiftId,
          shiftData: submitData,
        });
        toast.success("Shift updated successfully!");
      } else {
        await createShiftMutation.mutateAsync(submitData);
        toast.success("Shift created successfully!");
      }

      await navigate({ to: "/" });
    } catch (error) {
      if (error instanceof ValidationError && error.issues.length > 0) {
        console.error("Error during shift create/update:", error.toJSON());
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

  const handleCancel = async () => {
    await navigate({ to: "/" });
  };

  if (isEditMode && shiftLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Spinner size="lg" label="Loading shift details..." />
      </div>
    );
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditMode ? "Edit Shift Details" : "Create New Shift"}
        </h1>
        <p className="text-gray-600 mt-1">
          {isEditMode
            ? "Update the shift information below."
            : "Fill in the details to create a new shift."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <BasicInformation formData={formData} onUpdate={updateFormData} />

        <LocationDetails formData={formData} onUpdate={updateFormData} />

        <ScheduleDetails formData={formData} onUpdate={updateFormData} />

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
            {isEditMode ? "Update Shift" : "Create Shift"}
          </Button>
        </div>
      </form>
    </div>
  );
};
