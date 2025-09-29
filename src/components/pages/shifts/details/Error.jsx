import { Button, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "@tanstack/react-router";

export const Error = ({ error }) => {
  const navigate = useNavigate();

  return (
    <Card className="border border-red-200">
      <CardBody className="text-center py-8">
        <Icon
          icon="heroicons:exclamation-triangle"
          className="w-12 h-12 text-red-500 mx-auto mb-4"
        />
        <h3 className="text-lg font-semibold text-red-700 mb-2">
          Error Loading Shift
        </h3>
        <p className="text-red-600 mb-4">
          {error?.message || "Could not load shift details."}
        </p>
        <Button color="primary" onPress={() => navigate({ to: "/" })}>
          Back to Shifts
        </Button>
      </CardBody>
    </Card>
  );
};
