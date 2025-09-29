import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { shiftTypeOptions } from "../constants.js";
import { useGetAllWorkers } from "../../../../hooks/worker/use-get-all-workers.js";

export const BasicInformation = ({ formData, onUpdate }) => {
  const { data: workers, isLoading: workersLoading } = useGetAllWorkers();

  const handleShiftTypeChange = (keys) => {
    const selectedTypes = Array.from(keys);
    onUpdate("typeOfShift", selectedTypes);
  };

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader className="pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <Icon icon="lucide:building" className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Basic Information
            </h2>
          </div>
          <p className="text-sm text-gray-500">
            Enter the basic details for this shift
          </p>
        </div>
      </CardHeader>
      <CardBody className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Shift Title"
            placeholder="e.g., Morning Shift"
            value={formData.title}
            onValueChange={(value) => onUpdate("title", value)}
            isRequired
            variant="bordered"
            labelPlacement="outside"
          />

          <Input
            label="Shift Role"
            placeholder="e.g., Security Guard, Cleaner"
            value={formData.role}
            onValueChange={(value) => onUpdate("role", value)}
            isRequired
            variant="bordered"
            labelPlacement="outside"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Type of Shift"
            placeholder="Select shift types"
            selectedKeys={formData.typeOfShift}
            onSelectionChange={handleShiftTypeChange}
            selectionMode="multiple"
            isRequired
            variant="bordered"
            labelPlacement="outside"
          >
            {shiftTypeOptions.map((option) => (
              <SelectItem key={option.key}>{option.label}</SelectItem>
            ))}
          </Select>

          <Select
            label="Assigned Worker"
            placeholder={
              workersLoading ? "Loading workers..." : "Select a worker"
            }
            selectedKeys={formData.user ? [formData.user] : []}
            onSelectionChange={(keys) => {
              const selectedWorker = Array.from(keys)[0];
              onUpdate("user", selectedWorker || "");
            }}
            isDisabled={workersLoading}
            isRequired
            variant="bordered"
            labelPlacement="outside"
            startContent={
              workersLoading ? (
                <Spinner size="sm" />
              ) : (
                <Icon icon="heroicons:user" className="w-4 h-4 text-gray-400" />
              )
            }
          >
            {workers?.map((worker) => (
              <SelectItem key={worker.id} textValue={worker.name}>
                <div className="flex flex-col">
                  <span className="font-medium">{worker.name}</span>
                  <span className="text-xs text-gray-500">{worker.email}</span>
                </div>
              </SelectItem>
            )) || []}
          </Select>
        </div>

        {formData.typeOfShift.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-sm text-gray-600">Selected types:</span>
            {formData.typeOfShift.map((type) => (
              <span
                key={type}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {type}
              </span>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
};
