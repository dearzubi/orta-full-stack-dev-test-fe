import { createFileRoute } from "@tanstack/react-router";
import { BulkCreateShiftPage } from "../../components/pages/shifts/index.jsx";
import { useProtectAdminRoutes } from "../../hooks/auth/use-protect-admin-routes.js";

export const Route = createFileRoute("/_shift/bulk-create")({
  component: RouteComponent,
});

function RouteComponent() {
  useProtectAdminRoutes();
  return <BulkCreateShiftPage />;
}
