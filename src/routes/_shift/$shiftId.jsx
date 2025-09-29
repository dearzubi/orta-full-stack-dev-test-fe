import { createFileRoute } from "@tanstack/react-router";
import { ShiftDetailPage } from "../../components/pages/shifts";

export const Route = createFileRoute("/_shift/$shiftId")({
  component: ShiftDetailPage,
});
