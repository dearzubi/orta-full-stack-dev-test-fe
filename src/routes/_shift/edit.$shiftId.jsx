import { createFileRoute } from "@tanstack/react-router";
import { CreateEditShiftPage } from "../../components/pages/shifts";
import { useProtectAdminRoutes } from "../../hooks/auth/use-protect-admin-routes.js";

export const Route = createFileRoute("/_shift/edit/$shiftId")({
  component: RouteComponent,
});

function RouteComponent() {
  useProtectAdminRoutes();
  return <CreateEditShiftPage />;
}
