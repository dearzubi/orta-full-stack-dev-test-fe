import { createFileRoute, Outlet } from "@tanstack/react-router";
import MainLayout from "../../components/layouts/MainLayout.jsx";

export const Route = createFileRoute("/_shift")({
  component: () => {
    return (
      <MainLayout>
        <Outlet />
      </MainLayout>
    );
  },
});
