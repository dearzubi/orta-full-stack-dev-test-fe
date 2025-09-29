import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { formatTo24HTime, formatToFullDate } from "../utils.js";
import { useCancelShift } from "../../../../hooks/shift/use-cancel-shift.js";
import { useDeleteShift } from "../../../../hooks/shift/use-delete-shift.js";
import { useNavigate } from "@tanstack/react-router";

export const ShiftManagement = ({ shift, shiftId }) => {
  const navigate = useNavigate();

  const cancelShiftMutation = useCancelShift();
  const deleteShiftMutation = useDeleteShift();

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCancelShift = async () => {
    try {
      await cancelShiftMutation.mutateAsync(shiftId);
      setShowCancelModal(false);
      await navigate({ to: "/" });
    } catch (error) {
      console.error("Failed to cancel shift:", error);
    }
  };

  const handleDeleteShift = async () => {
    try {
      await deleteShiftMutation.mutateAsync(shiftId);
      setShowDeleteModal(false);
      await navigate({ to: "/" });
    } catch (error) {
      console.error("Failed to delete shift:", error);
    }
  };

  return (
    <>
      <Card className="shadow-sm border border-gray-200">
        <CardBody className="p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Shift Management
            </h2>
            <p className="text-gray-600 text-sm">
              Administrative actions for this shift
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {shift.status === "Scheduled" && (
              <Button
                color="default"
                variant="bordered"
                size={"sm"}
                startContent={
                  <Icon icon="heroicons:pencil" className="w-4 h-4" />
                }
                onPress={() => navigate({ to: `/edit/${shiftId}` })}
                className="hover:border-gray-600 focus:outline-none"
              >
                Edit Shift
              </Button>
            )}

            <Button
              color="warning"
              variant="solid"
              size={"sm"}
              startContent={
                <Icon icon="heroicons:x-circle" className="w-4 h-4" />
              }
              className="hover:border-transparent focus:outline-none"
              onPress={() => setShowCancelModal(true)}
              isLoading={cancelShiftMutation.isPending}
              isDisabled={
                shift?.status === "Cancelled" || shift?.status === "Completed"
              }
            >
              Cancel Shift
            </Button>

            <Button
              color="danger"
              variant="solid"
              size={"sm"}
              startContent={<Icon icon="heroicons:trash" className="w-4 h-4" />}
              className="hover:border-transparent focus:outline-none"
              onPress={() => setShowDeleteModal(true)}
              isLoading={deleteShiftMutation.isPending}
            >
              Delete Shift
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={showCancelModal}
        onOpenChange={setShowCancelModal}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Icon
                    icon="heroicons:exclamation-triangle"
                    className="w-6 h-6 text-warning"
                  />
                  <span>Cancel Shift</span>
                </div>
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to cancel this shift? This action cannot
                  be undone.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg mt-2">
                  <div className="font-medium text-gray-900">
                    {shift?.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatToFullDate(shift?.date)} •{" "}
                    {formatTo24HTime(shift?.startTime)} -{" "}
                    {formatTo24HTime(shift?.finishTime)}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={onClose}
                  className="hover:border-transparent focus:outline-none"
                >
                  Keep Shift
                </Button>
                <Button
                  color="warning"
                  onPress={handleCancelShift}
                  isLoading={cancelShiftMutation.isPending}
                  className="hover:border-transparent focus:outline-none"
                >
                  Cancel Shift
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Icon
                    icon="heroicons:exclamation-triangle"
                    className="w-6 h-6 text-danger"
                  />
                  <span>Delete Shift</span>
                </div>
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to permanently delete this shift? This
                  action cannot be undone and will remove all associated data.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg mt-2">
                  <div className="font-medium text-gray-900">
                    {shift?.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatToFullDate(shift?.date)} •{" "}
                    {formatTo24HTime(shift?.startTime)} -{" "}
                    {formatTo24HTime(shift?.finishTime)}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={onClose}
                  className="hover:border-transparent focus:outline-none"
                >
                  Keep Shift
                </Button>
                <Button
                  color="danger"
                  onPress={handleDeleteShift}
                  isLoading={deleteShiftMutation.isPending}
                  className="hover:border-transparent focus:outline-none"
                >
                  Delete Shift
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
