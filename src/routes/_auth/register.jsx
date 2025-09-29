import { createFileRoute } from "@tanstack/react-router";
import RegisterPage from "../../components/pages/register";

export const Route = createFileRoute("/_auth/register")({
  component: RegisterPage,
});
