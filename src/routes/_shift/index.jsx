import { createFileRoute } from "@tanstack/react-router";
import { ShiftsPage } from "../../components/pages/shifts";
import { useProtectLoginRoutes } from "../../hooks/auth/use-protect-login-routes.js";

export const Route = createFileRoute("/_shift/")({
  component: RouteComponent,
});

function RouteComponent() {
  useProtectLoginRoutes();
  return <ShiftsPage />;
}
