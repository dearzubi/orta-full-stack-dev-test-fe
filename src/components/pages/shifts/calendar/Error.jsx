import { Button, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import React from "react";

export const Error = ({ error, refetch }) => {
  return (
    <Card className="border border-red-200">
      <CardBody className="text-center py-8">
        <Icon
          icon="heroicons:exclamation-triangle"
          className="w-12 h-12 text-red-500 mx-auto mb-4"
        />
        <h3 className="text-lg font-semibold text-red-700 mb-2">
          Error Loading Calendar
        </h3>
        <p className="text-red-600 mb-4">
          {error?.message || "Could not load shift calendar."}
        </p>
        <Button color="primary" onPress={() => refetch()}>
          Try Again
        </Button>
      </CardBody>
    </Card>
  );
};
