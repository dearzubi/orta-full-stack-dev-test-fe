import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  NumberInput,
  Textarea,
} from "@heroui/react";
import { Icon } from "@iconify/react";

export const LocationDetails = ({ formData, onUpdate }) => {
  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader className="pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <Icon icon="heroicons:map-pin" className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Location Details
            </h2>
          </div>
          <p className="text-sm text-gray-500">
            Specify where this shift will take place
          </p>
        </div>
      </CardHeader>
      <CardBody className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Location Name"
            placeholder="e.g., Clippers Quay Office"
            value={formData.location.name}
            onValueChange={(value) => onUpdate("location.name", value)}
            isRequired
            variant="bordered"
            labelPlacement="outside"
          />

          <Input
            label="Post Code"
            placeholder="e.g., M50 3XP"
            value={formData.location.postCode}
            onValueChange={(value) => onUpdate("location.postCode", value)}
            isRequired
            variant="bordered"
            labelPlacement="outside"
          />
        </div>

        <Textarea
          label="Address"
          placeholder="e.g., Clippers Quay, Manchester M50 3XP"
          value={formData.location.address}
          onValueChange={(value) => onUpdate("location.address", value)}
          isRequired
          variant="bordered"
          labelPlacement="outside"
          minRows={2}
          maxRows={4}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberInput
            label="Latitude"
            placeholder="e.g., 53.4692"
            type="number"
            step="any"
            value={
              typeof formData.location.cordinates.latitude === "string"
                ? parseFloat(formData.location.cordinates.latitude)
                : formData.location.cordinates.latitude.toString()
            }
            onValueChange={(value) =>
              onUpdate("location.cordinates.latitude", value || 0)
            }
            isRequired
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon
                icon="heroicons:globe-alt"
                className="w-4 h-4 text-gray-400"
              />
            }
          />

          <NumberInput
            label="Longitude"
            placeholder="e.g., -2.2955"
            type="number"
            step="any"
            value={
              typeof formData.location.cordinates.longitude === "string"
                ? parseFloat(formData.location.cordinates.longitude)
                : formData.location.cordinates.longitude.toString()
            }
            onValueChange={(value) =>
              onUpdate("location.cordinates.longitude", value || 0)
            }
            isRequired
            variant="bordered"
            labelPlacement="outside"
            startContent={
              <Icon
                icon="heroicons:globe-alt"
                className="w-4 h-4 text-gray-400"
              />
            }
          />
        </div>
      </CardBody>
    </Card>
  );
};
