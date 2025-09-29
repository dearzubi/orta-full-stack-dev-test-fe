import {
  formatTo24HTime,
  formatToFullDate,
  getStatusColor,
  getTypeColor,
} from "../utils.js";
import { Card, CardBody, Chip } from "@heroui/react";
import React from "react";
import { Icon } from "@iconify/react";

export const ShiftDetails = ({ shift }) => {
  return (
    <Card className="shadow-sm border border-gray-200">
      <CardBody className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {shift.title}
            </h1>
            <p className="text-gray-600 mb-4 text-sm">
              {formatToFullDate(shift.date)}
            </p>
          </div>
          <Chip
            color={getStatusColor(shift.status)}
            variant="flat"
            className="font-medium"
          >
            {shift.status}
          </Chip>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Icon icon="heroicons:clock" className="w-5 h-5 text-gray-400" />
            <span className="text-gray-900 font-medium">
              {formatTo24HTime(shift.startTime)} -{" "}
              {formatTo24HTime(shift.finishTime)}
            </span>
          </div>

          <div className="flex items-start space-x-3">
            <Icon
              icon="heroicons:map-pin"
              className="w-5 h-5 text-gray-400 mt-0.5"
            />
            <div>
              <div className="font-medium text-gray-900">
                {shift.location.name}
              </div>
              <div className="text-sm text-gray-600">
                {shift.location.address}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Icon icon="heroicons:user" className="w-5 h-5 text-gray-400" />
            <span className="text-gray-900 font-medium">{shift.user.name}</span>
          </div>

          <div className="flex items-center space-x-3">
            <Icon
              icon="heroicons:briefcase"
              className="w-5 h-5 text-gray-400"
            />
            <span className="text-gray-900 font-medium">{shift.role}</span>
          </div>

          <div className="flex items-start space-x-3">
            <Icon
              icon="heroicons:tag"
              className="w-5 h-5 text-gray-400 mt-0.5"
            />
            <div className="flex flex-wrap gap-2">
              {shift.typeOfShift.map((type, index) => (
                <Chip
                  key={index}
                  color={getTypeColor(type)}
                  size="sm"
                  variant="flat"
                >
                  {type}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
