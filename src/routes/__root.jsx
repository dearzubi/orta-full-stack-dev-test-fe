import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import NotFoundPage from "../components/pages/not-found";

export const Route = createRootRouteWithContext()({
  component: Outlet,
  notFoundComponent: NotFoundPage,
});
